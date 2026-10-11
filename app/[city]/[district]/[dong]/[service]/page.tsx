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

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { city, district, service } = await params;

  const cityName = decode(city);
  const districtName = decode(district);
  const serviceName = decode(service);

  const detail =
    serviceDetails[serviceName as keyof typeof serviceDetails];

  const canonicalUrl =
    `https://surigong-web.vercel.app/area/` +
    `${encodeURIComponent(cityName)}/` +
    `${encodeURIComponent(districtName)}/` +
    `${encodeURIComponent(serviceName)}`;

  const description = detail
    ? `${cityName} ${districtName} ${serviceName} 전문 작업 안내. ${detail.intro} ${districtName}의 대표 지역과 동별 ${serviceName} 정보를 확인하세요.`
    : `${cityName} ${districtName} ${serviceName} 작업 지역과 동별 서비스를 확인하세요.`;

  return {
    title: `${districtName} ${serviceName} 전문업체`,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

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
    (item) =>
      item.city === cityName &&
      item.district === districtName
  );

  const representativeAreas = representativeDongs.filter(
    (item) =>
      item.city === cityName &&
      item.district === districtName
  );

  const detail =
    serviceDetails[serviceName as keyof typeof serviceDetails];

  const serviceTitle = detail?.title ?? serviceName;

  const serviceIntro =
    detail?.intro ??
    `${serviceName} 작업이 필요한 경우 현장 조건에 맞는 작업자를 연결합니다.`;

  const points = detail?.points ?? [
    "현장 상태 확인",
    "작업 범위 확인",
    "전문 작업자 연결",
  ];

  if (!location) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-3xl font-bold">
          지역 정보를 찾을 수 없습니다.
        </h1>

        <Link
          href="/"
          className="mt-6 inline-block underline"
        >
          홈으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            수리공
          </Link>

          <Link
            href={`/service/${encodeURIComponent(serviceName)}`}
            className="text-sm text-gray-600 hover:text-black"
          >
            다른 지역 보기
          </Link>
        </div>
      </header>

      <nav className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            홈
          </Link>

          <span className="mx-2">›</span>

          <Link
            href={`/service/${encodeURIComponent(serviceName)}`}
            className="hover:text-black"
          >
            {serviceName}
          </Link>

          <span className="mx-2">›</span>

          <span>
            {cityName} {districtName}
          </span>
        </div>
      </nav>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold text-gray-500">
            {cityName} · {districtName}
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            {districtName} {serviceName} 전문 작업자 찾기
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            {cityName} {districtName}에서 {serviceName} 작업이
            필요하신가요? {serviceIntro}
          </p>
        </div>
      </section>

      {representativeAreas.length > 0 && (
        <section>
          <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="text-sm font-semibold text-gray-500">
              POPULAR AREAS
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {districtName} 대표 지역 {serviceName}
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-gray-600">
              많이 사용하는 지역명을 기준으로 {serviceName} 정보를
              확인할 수 있습니다.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {representativeAreas.map((area) => (
                <Link
                  key={area.name}
                  href={`/${encodeURIComponent(
                    cityName
                  )}/${encodeURIComponent(
                    districtName
                  )}/${encodeURIComponent(
                    area.name
                  )}/${encodeURIComponent(serviceName)}`}
                  className="rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-xl font-bold">
                    {area.name} {serviceName}
                  </h3>

                  <p className="mt-3 text-sm text-gray-500">
                    {area.children.join(", ")}
                  </p>

                  <p className="mt-5 text-sm font-semibold">
                    지역 정보 보기 →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold text-gray-500">
            ALL AREAS
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {districtName} 동별 {serviceName}
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-gray-600">
            작업이 필요한 세부 행정동을 선택하면 해당 지역의
            {serviceName} 정보를 확인할 수 있습니다.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {location.dongs.map((dong) => (
              <Link
                key={dong}
                href={`/${encodeURIComponent(
                  cityName
                )}/${encodeURIComponent(
                  districtName
                )}/${encodeURIComponent(
                  dong
                )}/${encodeURIComponent(serviceName)}`}
                className="rounded-2xl bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-bold">
                  {dong} {serviceName}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  서비스 보기 →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            {districtName} {serviceName} 주요 작업
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {points.map((point, index) => (
              <div
                key={point}
                className="rounded-2xl border p-6"
              >
                <p className="text-sm font-bold text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-3 text-lg font-bold">
                  {point}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            {districtName} {serviceName} 이용 안내
          </h2>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-white p-6">
              <h3 className="text-lg font-bold">
                작업 문의 시 어떤 정보가 필요한가요?
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                작업 주소, 현재 발생한 문제, 건물 형태와 필요한 작업
                내용을 전달하면 작업 조건을 확인하는 데 도움이 됩니다.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6">
              <h3 className="text-lg font-bold">
                {districtName} 모든 동에서 확인할 수 있나요?
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                위의 대표 지역과 세부 행정동을 선택해 지역별
                {serviceName} 페이지를 확인할 수 있습니다.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6">
              <h3 className="text-lg font-bold">
                작업 비용은 어떻게 결정되나요?
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                작업 범위, 현장 상태, 장비와 자재 사용 여부 등에 따라
                달라질 수 있으므로 현장 조건 확인이 필요합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500">
          © 2026 수리공. All rights reserved.
        </div>
      </footer>
    </main>
  );
}