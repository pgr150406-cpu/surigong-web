import "server-only";
import type { WorkPost } from "./post-draft";
const repo = "pgr150406-cpu/surigong-web";
const directory = "data/work-posts";
async function github(endpoint: string, init?: RequestInit) {
  const token = process.env.SURIGONG_GITHUB_TOKEN;
  const response = await fetch(
    `https://api.github.com/repos/${repo}/${endpoint}`,
    {
      ...init,
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
        ...init?.headers,
      },
    },
  );
  if (response.status === 404 && !init?.method) return null;
  if (!response.ok)
    throw new Error(
      response.status === 409 || response.status === 422
        ? "다른 변경과 겹쳤습니다. 잠시 후 다시 게시해주세요."
        : "저장소 연결에 실패했습니다. 서버 설정과 GitHub 권한을 확인해주세요.",
    );
  return response.json();
}
export async function readPost(id: string): Promise<WorkPost | null> {
  if (!/^[a-f0-9-]{36}$/.test(id)) return null;
  const file = await github(`contents/${directory}/${id}.json?ref=main`);
  if (!file) return null;
  return JSON.parse(Buffer.from(file.content, "base64").toString("utf8"));
}
export async function readPosts(): Promise<{ posts: WorkPost[] }> {
  const files = await github(`contents/${directory}?ref=main`);
  if (!files) return { posts: [] };
  if (!Array.isArray(files))
    throw new Error("게시물 목록 형식이 올바르지 않습니다.");
  const posts: WorkPost[] = [];
  const entries = files.filter((f: { name: string }) =>
    /^[a-f0-9-]{36}\.json$/.test(f.name),
  );
  // API 부하를 제한하기 위해 다섯 개씩 읽습니다.
  for (let i = 0; i < entries.length; i += 5) {
    const batch = await Promise.all(
      entries
        .slice(i, i + 5)
        .map((f: { name: string }) => readPost(f.name.slice(0, -5))),
    );
    posts.push(...batch.filter((p): p is WorkPost => p !== null));
  }
  return {
    posts: posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  };
}
export async function publishPost(post: Omit<WorkPost, "publishedAt">) {
  if (!process.env.SURIGONG_GITHUB_TOKEN)
    throw new Error("SURIGONG_GITHUB_TOKEN 서버 설정이 필요합니다.");
  const existing = await readPost(post.id);
  if (existing) return existing;
  const saved = { ...post, publishedAt: new Date().toISOString() };
  const content = JSON.stringify(saved);
  if (Buffer.byteLength(content) > 700000)
    throw new Error("사진 용량을 줄여주세요.");
  await github(`contents/${directory}/${post.id}.json`, {
    method: "PUT",
    body: JSON.stringify({
      message: `Publish work case: ${post.title}`,
      branch: "main",
      content: Buffer.from(content).toString("base64"),
    }),
  });
  return saved;
}
