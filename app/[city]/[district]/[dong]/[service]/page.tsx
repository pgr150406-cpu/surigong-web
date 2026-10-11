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
    dong: string;
    service: string;
  }>;
};

function decode(value: string) {
  return decodeURIComponent(value);
}

function getFaq(serviceName: string, dongName: string) {
  if (serviceName === "누수") {
    return [
      {
        question: `${dongName} 누수는 어떻게 확인하나요?`,
        answer: "물이 보이는 위치와 실제 누수 원인이 다를 수 있어 배관, 벽, 바닥 등 현장 상태를 함께 확인하는 것이 중요합니다.",
      },
      {
        question: "누수 탐지만 먼저 진행할 수 있나요?",
        answer: "현장 상황과 작업 범위에 따라 탐지와 수리 범위를 나누어 상담할 수 있습니다.",
      },
      {
        question: "누수 비용은 무엇에 따라 달라지나요?",
        answer: "탐지 난이도, 배관 상태, 수리 범위, 필요한 장비와 자재 등에 따라 달라질 수 있습니다.",
      },
    ];
  }

  if (serviceName === "고압세척") {
    return [
      {
        question: `${dongName} 고압세척은 언제 필요한가요?`,
        answer: "배수가 느리거나 반복적으로 막히는 경우 배관 내부 이물질과 찌꺼기 상태를 확인한 뒤 고압세척을 검토할 수 있습니다.",
      },
      {
        question: "오래된 배관도 고압세척이 가능한가요?",
        answer: "배관 재질과 노후 상태에 따라 작업 방식이 달라질 수 있어 작업 전 상태 확인이 필요합니다.",
      },
      {
        question: "작업 비용은 어떻게 정해지나요?",
        answer: "배관 길이, 막힘 정도, 장비 접근성, 작업 범위에 따라 달라질 수 있습니다.",
      },
    ];
  }

  return [
    {
      question: `${dongName} ${serviceName} 작업은 어떻게 문의하나요?`,
      answer: "작업 위치와 현재 상황, 필요한 작업 내용을 전달하면 현장 조건을 확인하는 데 도움이 됩니다.",
    },
    {
      question: `${serviceName} 비용은 바로 알 수 있나요?`,
      answer: "현장 상태와 작업 범위, 필요한 장비와 자재에 따라 달라질 수 있어 조건 확인이 필요합니다.",
    },
    {
      question: `${dongName} 외 다른 지역도 확인할 수 있나요?`,
      answer: "수리공에 등록된 같은 구의 다른 지역과 서비스도 함께 확인할 수 있습니다.",
    },
  ];
}

export function generateStaticParams() {
  const normalPages = locations.flatMap((location) =>
    location.dongs.flatMap((dong) =>
      services.map((service) => ({
        city: location.city,
        district: location.district,
        dong,
        service,
      }))
    )
  );

  const representativePages = representativeDongs.flatMap((area) =>
    services.map((service) => ({
      city: area.city,
      district: area.district,
      dong: area.name,
      service,
    }))
  );

  return [...normalPages, ...representativePages];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, district, dong, service } = await params;
  const cityName = decode(city);
  const districtName = decode(district);
  const dongName = decode(dong);
  const serviceName = decode(service);
  const detail = serviceDetails[serviceName as keyof typeof serviceDetails];

  const canonicalUrl =
    `https://surigong-web.vercel.app/` +
    `${encodeURIComponent(cityName)}/` +
    `${encodeURIComponent(districtName)}/` +
    `${encodeURIComponent(dongName)}/` +
    `${encodeURIComponent(serviceName)}`;

  const description = detail
    ? `${cityName} ${districtName} ${dongName} ${serviceName} 작업 안내. ${detail.intro}`
    : `${cityName} ${districtName} ${dongName} ${serviceName} 작업 정보를 확인하세요.`;

  return {
    title: `${dongName} ${serviceName} 전문업체`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${dongName} ${serviceName} 전문업체 | 수리공`,
      description,
      url: canonicalUrl,
      siteName: "수리공",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function LocalServicePage({ params }: Props) {
  const { city, district, dong, service } = await params;
  const cityName = decode(city);
  const districtName = decode(district);
  const dongName = decode(dong);
  const serviceName = decode(service);

  const detail = serviceDetails[serviceName as keyof typeof serviceDetails];
  const serviceTitle = detail?.title ?? serviceName;
  const serviceIntro = detail?.intro ?? `${serviceName} 작업 정보를 확인합니다.`;
  const points = detail?.points ?? ["현장 상태 확인", "작업 범위 확인", "작업 정보 확인"];

  const currentLocation = locations.find(
    (location) => location.city === cityName && location.district === districtName
  );

  const representative = representativeDongs.find(
    (area) => area.city === cityName && area.district === districtName && area.name === dongName
  );

  const nearbyDongs = currentLocation?.dongs.filter((item) => item !== dongName).slice(0, 8) ?? [];
  const faqs = getFaq(serviceName, dongName);

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
          <Link href={`/area/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}/${encodeURIComponent(serviceName)}`} className="hover:text-slate-950">{districtName}</Link>
          <span>›</span>
          <span className="font-semibold text-slate-700">{dongName}</span>
        </div>
      </nav>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">
            {cityName} · {districtName} · {dongName}
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
            {dongName} {serviceName},<br className="hidden sm:block" /> 무엇을 먼저 확인해야 할까요?
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {serviceIntro} 작업 위치와 현재 증상을 구체적으로 확인하면 필요한 작업 범위를 판단하는 데 도움이 됩니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black tracking-widest text-emerald-700">CHECK POINTS</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">{dongName} {serviceTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">
              같은 {serviceName} 작업이라도 건물 구조, 작업 위치, 장비 접근성에 따라 필요한 방식이 달라질 수 있습니다.
            </p>
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

        {representative && (
          <div className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
            <p className="text-sm font-black text-emerald-800">대표 지역 안내</p>
            <h2 className="mt-2 text-2xl font-black">{dongName}의 세부 지역도 확인하세요.</h2>
            <p className="mt-3 leading-7 text-slate-600">{dongName}으로 검색하셨다면 아래 세부 행정동의 {serviceName} 정보도 함께 확인할 수 있습니다.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {representative.children.map((childDong) => (
                <Link
                  key={childDong}
                  href={`/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}/${encodeURIComponent(childDong)}/${encodeURIComponent(serviceName)}`}
                  className="rounded-full border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold transition hover:border-emerald-400"
                >
                  {childDong} {serviceName} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <p className="text-sm font-black tracking-widest text-emerald-700">BEFORE YOU ASK</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">문의 전에 준비하면 좋은 정보</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["문제가 보이는 위치", "천장, 벽, 바닥, 배관 등 문제가 나타나는 위치를 알려주세요."],
              ["언제부터 시작됐는지", "갑자기 발생했는지, 반복되는 문제인지 알려주면 도움이 됩니다."],
              ["현장 사진 또는 증상", "가능하면 현재 상태를 확인할 수 있는 사진과 증상을 준비해주세요."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-6">
                <h3 className="font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {nearbyDongs.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <p className="text-sm font-black tracking-widest text-emerald-700">NEARBY AREAS</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">{districtName} 다른 지역 {serviceName}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {nearbyDongs.map((nearbyDong) => (
              <Link
                key={nearbyDong}
                href={`/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}/${encodeURIComponent(nearbyDong)}/${encodeURIComponent(serviceName)}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
              >
                <p className="font-black">{nearbyDong} {serviceName}</p>
                <p className="mt-2 text-sm text-slate-500">지역 정보 보기 →</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <p className="text-sm font-black tracking-widest text-emerald-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">{dongName} {serviceName} 자주 묻는 질문</h2>
          <div className="mt-8 grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-black">Q. {faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
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
