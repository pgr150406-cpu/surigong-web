/* eslint-disable @next/next/no-img-element -- Uploaded JPEGs are already resized. */
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { readPost } from "@/lib/work-posts";
type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = await readPost(id);
  return p
    ? {
        title: p.title,
        description: p.problem.slice(0, 150),
        alternates: { canonical: `/cases/${p.id}` },
        openGraph: {
          title: p.title,
          description: p.problem.slice(0, 150),
          url: `/cases/${p.id}`,
          type: "article",
        },
      }
    : { title: "작업사례를 찾을 수 없습니다", robots: { index: false } };
}
async function Case({ params }: Props) {
  const { id } = await params;
  const p = await readPost(id);
  if (!p) notFound();
  return (
    <article className="mt-8 rounded-2xl border bg-white p-6 sm:p-10">
      <p className="text-sm text-emerald-700">
        {p.city} {p.district} {p.dong} · {p.service}
      </p>
      <h1 className="mt-4 text-3xl font-black">{p.title}</h1>
      <p className="mt-3 text-sm text-slate-500">작업일 {p.date}</p>
      <div className="mt-8 whitespace-pre-wrap leading-8">{p.body}</div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {p.photos.map((photo, i) => (
          <figure key={i}>
            <img
              src={photo.data}
              alt={photo.caption || `${p.dong} ${p.service} ${photo.stage}`}
              className="w-full rounded-xl"
            />
            <figcaption className="mt-3 text-sm text-slate-600">
              {photo.stage} · {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <a
        href="tel:01028920819"
        className="mt-8 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
      >
        작업 문의 010-2892-0819
      </a>
    </article>
  );
}
export default function Page(props: Props) {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 text-slate-950">
      <div className="mx-auto max-w-3xl">
        <Link href="/cases" className="font-bold text-emerald-700">
          ← 작업사례 목록
        </Link>
        <Suspense
          fallback={<p className="mt-8">작업사례를 불러오고 있습니다.</p>}
        >
          <Case {...props} />
        </Suspense>
      </div>
    </main>
  );
}
