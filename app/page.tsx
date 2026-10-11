import Link from "next/link";

const services = [
  {
    name: "누수",
    description: "배관 및 건물 내부 누수 원인 확인과 수리",
  },
  {
    name: "고압세척",
    description: "배수관과 하수관 막힘 및 고압 세척",
  },
  {
    name: "외벽누수",
    description: "외벽 균열과 방수 상태 및 빗물 유입 점검",
  },
  {
    name: "화장실누수",
    description: "변기, 세면대, 배관 및 화장실 누수 점검",
  },
  {
    name: "도어락",
    description: "도어락 설치, 교체 및 고장 점검",
  },
  {
    name: "언수도",
    description: "겨울철 수도 동결 및 수도관 해빙 작업",
  },
  {
    name: "에어컨설치",
    description: "벽걸이 및 스탠드 에어컨 설치",
  },
  {
    name: "집청소",
    description: "주거 공간 청소와 정리 작업",
  },
  {
    name: "이사",
    description: "이사 규모와 조건에 맞는 작업자 연결",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            수리공
          </Link>

          <nav className="flex gap-6 text-sm">
            <a href="#services" className="hover:underline">
              서비스
            </a>

            <a href="#guide" className="hover:underline">
              이용안내
            </a>

            <a href="#contact" className="hover:underline">
              문의하기
            </a>
          </nav>
        </div>
      </header>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-sm font-semibold text-gray-500">
            우리 동네 생활 수리 플랫폼
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            필요한 수리,
            <br />
            지역 전문 작업자를
            <br />
            빠르게 찾아보세요.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
            누수, 배관 세척, 도어락, 에어컨, 청소, 이사까지.
            필요한 서비스와 지역을 선택하면 조건에 맞는 작업자를
            찾아볼 수 있습니다.
          </p>

          <a
            href="#services"
            className="mt-8 inline-block rounded-xl bg-black px-7 py-4 font-semibold text-white"
          >
            서비스 선택하기
          </a>
        </div>
      </section>

      <section id="services">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div>
            <p className="text-sm font-semibold text-gray-500">
              SERVICES
            </p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              어떤 작업이 필요하신가요?
            </h2>

            <p className="mt-4 text-gray-600">
              서비스를 선택한 다음 작업이 필요한 지역을 선택하세요.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.name}
                href={`/service/${encodeURIComponent(service.name)}`}
                className="group rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold">
                    {service.name}
                  </h3>

                  <span className="text-xl transition group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <p className="mt-6 text-sm font-semibold">
                  지역 선택하기
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="guide" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold text-gray-500">
            HOW IT WORKS
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            수리공 이용 방법
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-7">
              <p className="text-sm font-bold text-gray-400">
                STEP 01
              </p>

              <h3 className="mt-3 text-xl font-bold">
                서비스 선택
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                누수, 세척, 도어락 등 필요한 작업을 선택합니다.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7">
              <p className="text-sm font-bold text-gray-400">
                STEP 02
              </p>

              <h3 className="mt-3 text-xl font-bold">
                지역 선택
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                작업이 필요한 시·구·동 지역을 선택합니다.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7">
              <p className="text-sm font-bold text-gray-400">
                STEP 03
              </p>

              <h3 className="mt-3 text-xl font-bold">
                작업자 연결
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                현장 조건에 맞는 전문 작업자를 연결합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl bg-black px-8 py-12 text-white md:px-12">
            <p className="text-sm font-semibold text-gray-400">
              SURIGONG
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              어떤 수리가 필요하신가요?
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-300">
              필요한 작업과 지역을 선택하고 전문 작업자를 찾아보세요.
            </p>

            <a
              href="#services"
              className="mt-7 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black"
            >
              서비스 찾아보기
            </a>
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