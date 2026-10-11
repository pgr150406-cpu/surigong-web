import type { Metadata } from "next";
import Link from "next/link";

import { locations, services } from "@/data/locations";
import { representativeDongs } from "@/data/representativeDongs";
import { serviceDetails } from "@/data/services";

export const instant = false;

type Props = {
  params: Promise<{
    city: string;
    district: string;
    service: string;
  }>;
};

export function generateStaticParams() {
  return locations.flatMap((location) =>
    services.map((service) => ({
      city: location.city,
      district: location.district,
      service,
    }))
  );
}

function decode(value: string) {
  return decodeURIComponent(value);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, district, service } = await params;
  const cityName = decode(city);
  const districtName = decode(district);
  const serviceName = decode(service);
  const detail = serviceDetails[serviceName as keyof typeof serviceDetails];

  const canonicalUrl =
    `https://surigong-web.vercel.app/area/` +
    `${encodeURIComponent(cityName)}/` +
    `${encodeURIComponent(districtName)}/` +
    `${encodeURIComponent(serviceName)}`;

  const description = detail
    ? `${cityName} ${districtName} ${serviceName} 작업 안내. ${detail.intro} 대표 지역과 동별 정보를 확인하세요.`
    : `${cityName} ${districtName} ${serviceName} 작업 지역과 동별 정보를 확인하세요.`;

  return {
    title: `${districtName} ${serviceName} 전문업체`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${districtName} ${serviceName} 전문업체 | 수리공`,
      description,
      url: canonicalUrl,
      siteName: "수리공",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictServicePage({ params }: Props) {
  const { city, district, service } = await params;
  const cityName = decode(city);
  const districtName = decode(district);
  const serviceName = decode(service);

  const location = locations.find(
    (item) => item.city === cityName && item.district === districtName
  );

  const representativeAreas = representativeDongs.filter(
    (item) => item.city === cityName && item.district === districtName
  );

  const detail = serviceDetails[serviceName as keyof typeof serviceDetails];
  const serviceTitle = detail?.title ?? serviceName;
  const serviceIntro = detail?.intro ?? `${serviceName} 작업 정보를 확인합니다.`;
  const points = detail?.points ?? ["현장 상태 확인", "작업 범위 확인", "작업 정보 확인"];

  if (!location) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-3xl font-black">지역 정보를 찾을 수 없습니다.</h1>
        <Link href="/" className="mt-6 inline-block font-bold underline">홈으로 돌아가기</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6">
          <Link href="/" className="text-2xl font-black tracking-tight">수리공</Link>
          <Link
            href={`/service/${encodeURIComponent(serviceName)}`}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            다른 지역 보기
          </Link>
        </div>
      </header>

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-5 py-3 text-sm text-slate-500 md:px-6">
          <Link href="/" className="hover:text-slate-950">홈</Link>
          <span>›</span>
          <Link href={`/service/${encodeURIComponent(serviceName)}`} className="hover:text-slate-950">{serviceName}</Link>
          <span>›</span>
          <span className="font-semibold text-slate-700">{cityName} {districtName}</span>
        </div>
      </nav>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">
            {cityName} · {districtName}
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            {districtName} {serviceName} 지역 안내
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {serviceIntro} 아래에서 많이 사용하는 지역명이나 세부 행정동을 선택해 더 구체적인 정보를 확인할 수 있습니다.
          </p>
        </div>
      </section>

      {representativeAreas.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <p className="text-sm font-black tracking-widest text-emerald-700">POPULAR AREAS</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">{districtName}에서 많이 찾는 지역</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">실제 검색에서 자주 쓰는 대표 동명을 기준으로 {serviceName} 정보를 확인할 수 있습니다.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {representativeAreas.map((area) => (
              <Link
                key={area.name}
                href={`/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}/${encodeURIComponent(area.name)}/${encodeURIComponent(serviceName)}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black">{area.name} {serviceName}</h3>
                  <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600">→</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">세부 지역: {area.children.join(", ")}</p>
                <p className="mt-5 text-sm font-bold">대표 지역 보기</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <p className="text-sm font-black tracking-widest text-emerald-700">ALL AREAS</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">{districtName} 세부 행정동</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">작업이 필요한 동을 선택하면 해당 지역의 {serviceName} 페이지로 이동합니다.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {location.dongs.map((dong) => (
              <Link
                key={dong}
                href={`/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}/${encodeURIComponent(dong)}/${encodeURIComponent(serviceName)}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-md"
              >
                <h3 className="font-black">{dong} {serviceName}</h3>
                <p className="mt-2 text-sm text-slate-500">지역 정보 보기 →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black tracking-widest text-emerald-700">SERVICE GUIDE</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">{districtName} {serviceTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">문의 전 아래 항목을 확인하면 필요한 작업 범위를 설명하기 수월합니다.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {points.map((point, index) => (
              <div key={point} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-sm font-black text-emerald-800">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-black leading-6">{point}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <h2 className="text-3xl font-black tracking-tight">문의 전에 확인하면 좋은 내용</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["정확한 작업 위치", "구와 동, 건물 형태를 함께 알려주면 지역 확인이 쉽습니다."],
              ["현재 문제와 증상", "언제부터 어떤 문제가 발생했는지 구체적으로 정리해주세요."],
              ["작업 범위", "점검만 필요한지, 수리나 교체까지 필요한지 알고 있는 범위에서 알려주세요."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-6">
                <h3 className="font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
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
