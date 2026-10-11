import Link from "next/link";
import { readPosts } from "@/lib/work-posts";
export default async function LocalCases({
  city,
  district,
  dong,
  service,
}: {
  city: string;
  district: string;
  dong?: string;
  service: string;
}) {
  let posts;
  try {
    posts = (await readPosts()).posts;
  } catch {
    return (
      <p className="mt-5 text-slate-600">
        작업사례를 불러오지 못했습니다.{" "}
        <Link href="/cases" className="underline">
          작업사례 목록 보기
        </Link>
      </p>
    );
  }
  const matching = posts.filter(
    (p) =>
      p.city === city &&
      p.district === district &&
      (!dong || p.dong === dong) &&
      p.service === service,
  );
  return matching.length ? (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {matching.slice(0, 6).map((p) => (
        <Link
          key={p.id}
          href={`/cases/${p.id}`}
          className="rounded-xl border bg-white p-5"
        >
          <h3 className="font-bold">{p.title}</h3>
          <p className="mt-2 text-sm text-slate-500">작업일 {p.date}</p>
        </Link>
      ))}
    </div>
  ) : (
    <p className="mt-5 text-slate-600">
      이 지역의 {service} 작업사례는 아직 등록되지 않았습니다.
    </p>
  );
}
