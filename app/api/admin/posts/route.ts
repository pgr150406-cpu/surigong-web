import { timingSafeEqual, createHash } from "node:crypto";
import { validatePost } from "@/lib/post-draft";
import { publishPost } from "@/lib/work-posts";
export async function POST(request: Request) {
  const password = process.env.SURIGONG_ADMIN_PASSWORD;
  if (!password || password.length < 16)
    return Response.json(
      { error: "16자 이상의 관리자 비밀번호를 서버에 설정해주세요." },
      { status: 503 },
    );
  const supplied =
    request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  const digest = (s: string) => createHash("sha256").update(s).digest();
  if (!timingSafeEqual(digest(supplied), digest(password)))
    return Response.json(
      { error: "관리자 비밀번호가 일치하지 않습니다." },
      { status: 401 },
    );
  if (!request.headers.get("origin") || (() => {
    try { const origin = new URL(request.headers.get("origin")!); return !["http:", "https:"].includes(origin.protocol) || origin.host !== request.headers.get("host"); }
    catch { return true; }
  })())
    return Response.json(
      { error: "요청 출처가 올바르지 않습니다." },
      { status: 403 },
    );
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 1100000)
    return Response.json({ error: "사진 크기를 줄여주세요." }, { status: 413 });
  let post;
  try {
    post = validatePost(JSON.parse(raw));
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "입력 오류" },
      { status: 400 },
    );
  }
  try {
    const saved = await publishPost(post);
    return Response.json({ url: `/cases/${saved.id}` });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "게시 실패" },
      { status: 503 },
    );
  }
}
