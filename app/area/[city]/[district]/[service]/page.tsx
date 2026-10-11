import type { Metadata } from "next";
import Link from "next/link";

import { locations, services } from "@/data/locations";
import { representativeDongs } from "@/data/representativeDongs";
import { serviceDetails } from "@/data/services";

export const instant = false;

const siteUrl = "https://xn--ob0b34v1qg.kr";

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
    `${siteUrl}/area/` +
    `${encodeURIComponent(cityName)}/` +
    `${encodeURIComponent(districtName)}/` +
    `${encodeURIComponent(serviceName)}`;

  const description = detail
    ? `${cityName} ${districtName} ${serviceName} 안내. ${detail.intro} 대표 동과 세부 행정동별 ${serviceName} 정보를 확인하고 010-2892-0819로 문의하세요.`
    : `${cityName} ${districtName} ${serviceName} 지역 안내. 대표 동과 세부 행정동별 정보를 확인하세요.`;

  return {
    title: `${districtName} ${serviceName} | 지역별 작업 안내`,
    description,
    keywords: [
      `${districtName} ${serviceName}`,
      `${cityName} ${districtName} ${serviceName}`,
      `${districtName} ${serviceName} 업체`,
      `${districtName} ${serviceName} 문의`,
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${districtName} ${serviceName} | 수리공`,
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
          <a href="tel:01028920819" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">010-2892-0819</a>
        </div>
      </header>

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-5 py-3 text-sm text-slate-500 md:px-6">
          <Link href="/">홈</Link><span>›</span>
          <Link href={`/service/${encodeURIComponent(serviceName)}`}>{serviceName}</Link><span>›</span>
          <span className="font-semibold text-slate-700">{cityName} {districtName}</span>
        </div>
      </nav>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">
            {cityName} · {districtName} · {serviceName}
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
            {districtName} {serviceName}, 지역별로 확인하세요
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {serviceIntro} {districtName} 안에서도 건물 구조와 작업 위치가 달라질 수 있어 동 단위로 확인하면 상담이 더 정확해집니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="tel:01028920819" className="rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white">전화 문의 010-2892-0819</a>
            <Link href={`/service/${encodeURIComponent(serviceName)}`} className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-800">다른 지역 보기</Link>
          </div>
        </div>
      </section>

      {representativeAreas.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <p className="text-sm font-black tracking-widest text-emerald-700">POPULAR AREAS</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">{districtName} 대표 지역 {serviceName}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">검색에서 자주 쓰는 대표 동명과 세부 행정동을 연결해 원하는 지역 페이지를 빠르게 찾을 수 있습니다.</p>
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
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <p className="text-sm font-black tracking-widest text-emerald-700">ALL AREAS</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">{districtName} 동별 {serviceName}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">작업이 필요한 동을 선택하면 해당 지역의 {serviceName} 안내, 확인 포인트, 문의 전 준비사항을 확인할 수 있습니다.</p>
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
            <h2 className="mt-3 text-3xl font-black tracking-tight">{districtName} {serviceTitle} 확인 포인트</h2>
            <p className="mt-4 leading-7 text-slate-600">같은 {serviceName}이라도 현장 조건에 따라 작업 방식과 범위가 달라질 수 있습니다.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {points.map((point, index) => (
              <div key={point} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-sm font-black text-emerald-800">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-black leading-6">{point}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-6">
          <p className="text-sm font-bold text-emerald-300">CONTACT</p>
          <h2 className="mt-3 text-3xl font-black">{districtName} {serviceName} 문의</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">지역, 건물 형태, 현재 증상을 알려주시면 상담에 도움이 됩니다.</p>
          <a href="tel:01028920819" className="mt-7 inline-block rounded-xl bg-white px-6 py-3 font-bold text-slate-950">010-2892-0819</a>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-6">
          <strong className="text-white">수리공</strong>
          <span>문의 010-2892-0819 · © 2026 수리공</span>
        </div>
      </footer>
    </main>
  );
}
