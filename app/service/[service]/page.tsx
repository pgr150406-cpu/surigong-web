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

  const detail =
    serviceDetails[serviceName as keyof typeof serviceDetails];

  const serviceTitle = detail?.title ?? serviceName;

  const serviceIntro =
    detail?.intro ??
    `${serviceName} 작업이 필요한 지역을 선택해주세요.`;

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            수리공
          </Link>

          <Link href="/" className="text-sm text-gray-600">
            홈으로
          </Link>
        </div>
      </header>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold text-gray-500">
            SERVICE AREA
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            {serviceTitle}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {serviceIntro}
          </p>

          <p className="mt-3 text-gray-600">
            먼저 작업이 필요한 구를 선택하세요.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={`${location.city}-${location.district}`}
                href={`/area/${encodeURIComponent(
                  location.city
                )}/${encodeURIComponent(
                  location.district
                )}/${encodeURIComponent(serviceName)}`}
                className="group rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-semibold text-gray-500">
                  {location.city}
                </p>

                <div className="mt-2 flex items-start justify-between">
                  <h2 className="text-2xl font-bold">
                    {location.district} {serviceName}
                  </h2>

                  <span className="text-xl transition group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <p className="mt-4 leading-7 text-gray-600">
                  {location.district}의 동별 {serviceName} 서비스를 확인하세요.
                </p>

                <p className="mt-6 text-sm font-semibold">
                  지역 선택하기
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            {serviceName} 서비스 이용 방법
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-7">
              <p className="text-sm font-bold text-gray-400">
                STEP 01
              </p>

              <h3 className="mt-3 text-xl font-bold">
                구 선택
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                작업이 필요한 구를 먼저 선택합니다.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7">
              <p className="text-sm font-bold text-gray-400">
                STEP 02
              </p>

              <h3 className="mt-3 text-xl font-bold">
                동 선택
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                해당 구 안에서 작업이 필요한 동을 선택합니다.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7">
              <p className="text-sm font-bold text-gray-400">
                STEP 03
              </p>

              <h3 className="mt-3 text-xl font-bold">
                작업 정보 확인
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                지역별 {serviceName} 작업 정보를 확인합니다.
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