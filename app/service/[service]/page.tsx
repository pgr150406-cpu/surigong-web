import Link from "next/link";

import { locations } from "@/data/locations";
import { serviceDetails } from "@/data/services";

export const instant = false;

type Props = {
  params: Promise<{
    service: string;
  }>;
};

function decode(value: string) {
  return decodeURIComponent(value);
}

export default async function ServiceRegionPage({ params }: Props) {
  const { service } = await params;
  const serviceName = decode(service);
  const detail = serviceDetails[serviceName as keyof typeof serviceDetails];
  const serviceTitle = detail?.title ?? serviceName;
  const serviceIntro = detail?.intro ?? `${serviceName} 작업이 필요한 지역을 선택해주세요.`;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6">
          <Link href="/" className="text-2xl font-black tracking-tight">수리공</Link>
          <Link href="/" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50">홈으로</Link>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">지역 선택</div>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">{serviceTitle}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{serviceIntro}</p>
          <p className="mt-3 text-sm font-semibold text-slate-500">작업이 필요한 구를 먼저 선택하세요.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-black tracking-widest text-emerald-700">SERVICE AREA</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">어느 지역에서 필요하신가요?</h2>
          </div>
          <p className="hidden text-sm text-slate-500 md:block">현재 인천 지역부터 제공하고 있습니다.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={`${location.city}-${location.district}`}
              href={`/area/${encodeURIComponent(location.city)}/${encodeURIComponent(location.district)}/${encodeURIComponent(serviceName)}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
            >
              <p className="text-sm font-bold text-emerald-700">{location.city}</p>
              <div className="mt-2 flex items-start justify-between gap-4">
                <h2 className="text-2xl font-black">{location.district} {serviceName}</h2>
                <span className="text-2xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600">→</span>
              </div>
              <p className="mt-4 leading-7 text-slate-600">{location.district}의 대표 지역과 세부 동별 {serviceName} 정보를 확인할 수 있습니다.</p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="font-bold text-slate-900">지역 보기</span>
                <span className="text-slate-400">{location.dongs.length}개 행정동</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <p className="text-sm font-black tracking-widest text-emerald-700">HOW IT WORKS</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">{serviceName} 정보를 찾는 순서</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["01", "구 선택", "작업이 필요한 구를 먼저 선택합니다."],
              ["02", "동 선택", "대표 지역 또는 세부 행정동을 선택합니다."],
              ["03", "작업 정보 확인", `지역별 ${serviceName} 안내와 확인할 내용을 살펴봅니다.`],
            ].map(([step, title, description]) => (
              <div key={step} className="rounded-2xl bg-slate-50 p-7">
                <p className="text-sm font-black text-emerald-700">STEP {step}</p>
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
          <strong className="text-slate-800">수리공</strong>
          <span>© 2026 수리공. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
