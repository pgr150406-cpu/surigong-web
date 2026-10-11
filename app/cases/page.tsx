import Link from "next/link";
import { Suspense } from "react";
import { readPosts } from "@/lib/work-posts";
export const metadata = {
  title: "실제 현장 작업사례",
  description: "수리공의 지역별 실제 작업 과정과 결과를 확인하세요.",
  alternates: { canonical: "/cases" },
};
async function Cases() {
  const { posts } = await readPosts();
  return posts.length ? (
    <div className="mt-8 grid gap-5 sm:grid-cols-2">
      {posts.map((p) => (
        <Link
          key={p.id}
          href={`/cases/${p.id}`}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-emerald-700">
            {p.city} {p.district} {p.dong} · {p.service}
          </p>
          <h2 className="mt-3 text-xl font-bold">{p.title}</h2>
          <p className="mt-3 text-slate-600">{p.problem.slice(0, 100)}</p>
          <p className="mt-4 text-sm text-slate-500">작업일 {p.date}</p>
        </Link>
      ))}
    </div>
  ) : (
    <p className="mt-8 text-slate-600">아직 등록된 작업사례가 없습니다.</p>
  );
}
export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="font-bold text-emerald-700">
          ← 수리공 홈
        </Link>
        <h1 className="mt-8 text-3xl font-black">현장 작업사례</h1>
        <p className="mt-3 text-slate-600">
          실제 현장에서 진행한 작업과 확인 결과를 소개합니다.
        </p>
        <Suspense
          fallback={<p className="mt-8">작업사례를 불러오고 있습니다.</p>}
        >
          <Cases />
        </Suspense>
      </div>
    </main>
  );
}
