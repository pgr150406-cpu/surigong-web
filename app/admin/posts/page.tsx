"use client";
/* eslint-disable @next/next/no-img-element -- Uploaded JPEGs are already resized. */
import { useState } from "react";
import Link from "next/link";
import { createDraft, type WorkInput, type Photo } from "@/lib/post-draft";
const empty: WorkInput = {
  city: "인천",
  district: "계양구",
  dong: "",
  service: "누수",
  date: "",
  problem: "",
  work: "",
  result: "",
};
const labels: Record<keyof WorkInput, string> = {
  city: "시·도",
  district: "시·구·군",
  dong: "동·읍·면",
  service: "작업 종류",
  date: "작업일",
  problem: "현장에서 발생한 문제",
  work: "실제로 진행한 작업",
  result: "작업 후 확인한 결과",
};
async function compress(file: File): Promise<string> {
  if (!file.type.startsWith("image/"))
    throw new Error("이미지 파일을 선택해주세요.");
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("사진 변환 실패");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.75, 0.55, 0.35, 0.2]) {
      const data = canvas.toDataURL("image/jpeg", quality);
      if (data.length <= 100000) return data;
    }
    throw new Error("사진 용량이 큽니다. 작은 사진을 선택해주세요.");
  } finally {
    bitmap.close();
  }
}
export default function Editor() {
  const [input, setInput] = useState(empty);
  const [draft, setDraft] = useState<ReturnType<typeof createDraft> | null>(
    null,
  );
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [approved, setApproved] = useState(false);
  function generate() {
    if (Object.values(input).some((v) => !v.trim())) {
      setMessage("현장 정보를 모두 입력해주세요.");
      return;
    }
    setDraft(createDraft(input));
    setId(crypto.randomUUID());
    setApproved(false);
    setUrl("");
    setMessage(
      "입력한 내용으로 기본 초안을 만들었습니다. 제목과 본문을 수정할 수 있어요.",
    );
  }
  async function upload(files: FileList | null) {
    if (!files) return;
    if (files.length + photos.length > 6) {
      setMessage("사진은 최대 6장입니다.");
      return;
    }
    setBusy(true);
    try {
      const added = await Promise.all(
        Array.from(files).map(async (file) => ({
          data: await compress(file),
          caption: "",
          stage: "작업 전" as const,
        })),
      );
      setPhotos((p) => [...p, ...added]);
      setApproved(false);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "사진 처리 실패");
    } finally {
      setBusy(false);
    }
  }
  async function publish() {
    if (!draft || !approved || !password || busy || url) return;
    setBusy(true);
    setMessage("게시물을 등록하고 있습니다.");
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ ...input, ...draft, photos, id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUrl(data.url);
      setPassword("");
      setMessage(
        "사이트에 게시했습니다. 네이버용 글은 아래 복사 버튼으로 가져가세요.",
      );
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "게시 실패");
    } finally {
      setBusy(false);
    }
  }
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMessage("복사했습니다. 네이버 글쓰기 화면에 붙여넣어주세요.");
    } catch {
      setMessage("복사가 차단되었습니다. 글을 직접 선택해서 복사해주세요.");
    }
  }
  function download() {
    const blob = new Blob(
      [JSON.stringify({ input, draft, photos, id }, null, 2)],
      { type: "application/json" },
    );
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "수리공-작업사례-초안.json";
    a.click();
    URL.revokeObjectURL(href);
  }
  async function restore(file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      if (file.size > 1100000) throw new Error("초안 파일이 너무 큽니다.");
      const data = JSON.parse(await file.text());
      for (const key of Object.keys(empty))
        if (typeof data.input?.[key] !== "string")
          throw new Error("초안 파일 형식이 올바르지 않습니다.");
      if (
        data.draft &&
        Object.keys(createDraft(empty)).some(
          (key) => typeof data.draft[key] !== "string",
        )
      )
        throw new Error("글 형식을 확인해주세요.");
      if (
        !Array.isArray(data.photos) ||
        data.photos.length > 6 ||
        data.photos.some(
          (p: Photo) =>
            !/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(p.data) ||
            p.data.length > 100000 ||
            typeof p.caption !== "string" ||
            !["작업 전", "작업 중", "작업 후"].includes(p.stage),
        )
      )
        throw new Error("사진 형식을 확인해주세요.");
      setInput(data.input);
      setDraft(data.draft);
      setPhotos(data.photos);
      setId(
        typeof data.id === "string" && /^[a-f0-9-]{36}$/.test(data.id)
          ? data.id
          : crypto.randomUUID(),
      );
      setApproved(false);
      setUrl("");
      setMessage("초안을 불러왔습니다.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "불러오기 실패");
    } finally {
      setBusy(false);
    }
  }
  const fieldClass =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-950";
  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-950">
      <div className="mx-auto max-w-5xl py-8">
        <Link href="/" className="font-bold text-emerald-700">
          ← 수리공 홈
        </Link>
        <h1 className="mt-6 text-3xl font-black">
          현장 하나로, 두 가지 게시물
        </h1>
        <p className="mt-3 text-slate-600">
          실제 현장 정보를 입력해 사이트 작업사례와 네이버 블로그용 기본 초안을
          만드세요. AI 이용료 없이 입력한 내용을 형식에 맞춰 정리합니다.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button type="button" onClick={download} className="underline">
            초안 파일 저장
          </button>
          <label className="cursor-pointer underline">
            초안 불러오기
            <input
              aria-label="초안 불러오기"
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => restore(e.target.files?.[0])}
            />
          </label>
          <Link href="/cases" className="underline">
            게시된 작업사례
          </Link>
        </div>
        <section className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-bold">1. 현장 정보</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {(Object.keys(empty) as (keyof WorkInput)[]).map((key) => (
              <label
                key={key}
                className={
                  ["problem", "work", "result"].includes(key)
                    ? "sm:col-span-2"
                    : ""
                }
              >
                {labels[key]}
                {["problem", "work", "result"].includes(key) ? (
                  <textarea
                    maxLength={4000}
                    rows={3}
                    className={fieldClass}
                    value={input[key]}
                    onChange={(e) => {
                      setInput({ ...input, [key]: e.target.value });
                      setDraft(null);
                      setApproved(false);
                      setUrl("");
                    }}
                  />
                ) : (
                  <input
                    type={key === "date" ? "date" : "text"}
                    maxLength={150}
                    className={fieldClass}
                    value={input[key]}
                    onChange={(e) => {
                      setInput({ ...input, [key]: e.target.value });
                      setDraft(null);
                      setApproved(false);
                      setUrl("");
                    }}
                  />
                )}
              </label>
            ))}
          </div>
          <button
            disabled={busy}
            onClick={generate}
            className="mt-5 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white disabled:opacity-50"
          >
            두 가지 글 자동 작성
          </button>
        </section>
        <section className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-bold">2. 작업 사진 · 최대 6장</h2>
          <p className="mt-2 text-sm text-slate-600">
            사진은 자동으로 축소됩니다. 공개할 사진만 선택하고, 작업 단계와
            설명을 지정해주세요. 초안은 파일로 저장해야 다른 컴퓨터에서 이어서
            사용할 수 있습니다.
          </p>
          <input
            aria-label="현장 사진 추가"
            className="mt-4"
            type="file"
            accept="image/*"
            multiple
            disabled={busy || !!url}
            onChange={(e) => {
              upload(e.target.files);
              e.target.value = "";
            }}
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {photos.map((p, i) => (
              <div key={i} className="rounded-xl border p-3">
                <img
                  src={p.data}
                  alt={p.caption || p.stage}
                  className="h-40 w-full rounded-lg object-cover"
                />
                <select
                  aria-label={`사진 ${i + 1} 작업 단계`}
                  disabled={!!url}
                  value={p.stage}
                  className={fieldClass}
                  onChange={(e) => {
                    setPhotos(
                      photos.map((p, j) =>
                        j === i
                          ? { ...p, stage: e.target.value as Photo["stage"] }
                          : p,
                      ),
                    );
                    setApproved(false);
                  }}
                >
                  {["작업 전", "작업 중", "작업 후"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <input
                  aria-label={`사진 ${i + 1} 설명`}
                  disabled={!!url}
                  placeholder="사진 설명"
                  maxLength={200}
                  value={p.caption}
                  className={fieldClass}
                  onChange={(e) => {
                    setPhotos(
                      photos.map((p, j) =>
                        j === i ? { ...p, caption: e.target.value } : p,
                      ),
                    );
                    setApproved(false);
                  }}
                />
                <button
                  disabled={!!url}
                  className="mt-3 text-sm text-red-700"
                  onClick={() => {
                    setPhotos(photos.filter((_, j) => i !== j));
                    setApproved(false);
                  }}
                >
                  사진 제거
                </button>
              </div>
            ))}
          </div>
        </section>
        {draft && (
          <>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {(["site", "blog"] as const).map((channel) => {
                const title = channel === "site" ? "title" : "blogTitle";
                const body = channel === "site" ? "body" : "blogBody";
                return (
                  <section
                    key={channel}
                    className="rounded-2xl border bg-white p-6"
                  >
                    <h2 className="text-xl font-bold">
                      {channel === "site"
                        ? "3. 사이트 작업사례"
                        : "4. 네이버 블로그용"}
                    </h2>
                    <label className="mt-4 block">
                      제목
                      <input
                        disabled={!!url}
                        className={fieldClass}
                        maxLength={150}
                        value={draft[title]}
                        onChange={(e) => {
                          setDraft({ ...draft, [title]: e.target.value });
                          setApproved(false);
                        }}
                      />
                    </label>
                    <label className="mt-4 block">
                      본문
                      <textarea
                        disabled={!!url}
                        className={fieldClass}
                        rows={16}
                        maxLength={12000}
                        value={draft[body]}
                        onChange={(e) => {
                          setDraft({ ...draft, [body]: e.target.value });
                          setApproved(false);
                        }}
                      />
                    </label>
                    {channel === "blog" && (
                      <>
                        <button
                          onClick={() =>
                            copy(
                              draft.blogTitle +
                                "\n\n" +
                                draft.blogBody +
                                "\n\n" +
                                photos
                                  .map(
                                    (p, i) =>
                                      `[사진 ${i + 1}: ${p.stage}] ${p.caption}`,
                                  )
                                  .join("\n"),
                            )
                          }
                          className="mt-4 rounded-xl bg-slate-950 px-5 py-3 text-white"
                        >
                          네이버용 글 복사
                        </button>
                        <a
                          href="https://blog.naver.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-3 underline"
                        >
                          네이버 열기
                        </a>
                        <p className="mt-3 text-sm text-slate-600">
                          사진은 원본 파일을 네이버 편집기에 직접 첨부하세요. 이
                          프로그램은 네이버 자동 발행·예약 발행을 수행하지
                          않습니다.
                        </p>
                      </>
                    )}
                  </section>
                );
              })}
            </div>
            <section className="mt-6 rounded-2xl border bg-white p-6">
              <h2 className="text-xl font-bold">5. 확인 후 사이트 게시</h2>
              <p className="mt-2 text-sm text-slate-600">
                게시하면 글과 사진이 사이트와 공개 GitHub 저장소에 저장됩니다.
                고객의 상세 주소·연락처나 공개 동의 없는 사진은 넣지 마세요.
              </p>
              <label className="mt-4 block">
                <input
                  type="checkbox"
                  checked={approved}
                  onChange={(e) => setApproved(e.target.checked)}
                />{" "}
                실제 작업 내용과 사진 공개 가능 여부를 확인했습니다.
              </label>
              <label className="mt-4 block">
                관리자 비밀번호
                <input
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldClass}
                />
              </label>
              <button
                onClick={publish}
                disabled={!approved || !password || busy || !!url}
                className="mt-4 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white disabled:opacity-40"
              >
                {busy ? "처리 중…" : url ? "게시 완료" : "사이트에 게시하기"}
              </button>
              {url && (
                <Link href={url} className="ml-4 underline">
                  게시물 보기
                </Link>
              )}
            </section>
          </>
        )}
        <p
          role="status"
          className="mt-5 whitespace-pre-wrap font-medium text-emerald-800"
        >
          {message}
        </p>
      </div>
    </main>
  );
}
