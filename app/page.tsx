import Link from "next/link";

const services = [
  { name: "누수", description: "천장·벽·바닥 주변 누수 원인 확인과 수리 상담", tag: "가장 많이 찾는 서비스" },
  { name: "고압세척", description: "배수관·하수관 막힘과 찌꺼기 제거를 위한 고압세척", tag: "배관 막힘" },
  { name: "외벽누수", description: "외벽 균열, 창틀, 실리콘과 빗물 유입 여부 점검", tag: "건물 외부" },
  { name: "화장실누수", description: "변기·세면대·바닥·배관 주변의 누수 점검", tag: "욕실" },
  { name: "도어락", description: "도어락 고장 점검, 교체와 신규 설치", tag: "출입문" },
  { name: "언수도", description: "겨울철 수도 동결 위치 확인과 해빙 작업", tag: "동파·해빙" },
  { name: "에어컨설치", description: "벽걸이·스탠드 에어컨 설치와 배관 위치 확인", tag: "계절 서비스" },
  { name: "집청소", description: "주거 공간 청소와 정리, 작업 범위별 전문가 연결", tag: "생활 관리" },
  { name: "이사", description: "이사 규모와 이동 조건에 맞는 작업자 연결", tag: "이사" },
];

const trustPoints = [
  "지역과 서비스 기준으로 필요한 작업 정보를 빠르게 확인",
  "구·동 단위 페이지로 내 주변 서비스 탐색",
  "작업 전 현장 조건과 범위를 먼저 확인하는 구조",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6">
          <Link href="/" className="text-2xl font-black tracking-tight">
            수리공
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#services" className="transition hover:text-slate-950">서비스</a>
            <a href="#guide" className="transition hover:text-slate-950">이용 방법</a>
            <a href="#why" className="transition hover:text-slate-950">수리공 안내</a>
          </nav>

          <a
            href="tel:01028920819"
            className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            지금 바로 문의하세요 · 010-2892-0819
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-emerald-50 to-transparent" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.25fr_0.75fr] md:px-6 md:py-28">
          <div>
            <div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">
              우리 동네 생활 수리 플랫폼
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
              필요한 수리,
              <br />
              지역부터 정확하게
              <br />
              찾아보세요.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              누수, 배관 세척, 도어락, 에어컨, 청소, 이사까지.
              필요한 서비스와 지역을 선택하면 관련 작업 정보를 빠르게 확인할 수 있습니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-emerald-700"
              >
                서비스 선택하기
              </a>
              <a
                href="tel:01028920819"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-800 transition hover:bg-slate-50"
              >
                전화 문의 010-2892-0819
              </a>
            </div>
          </div>

          <div className="self-end rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-xl shadow-slate-200/60 md:p-8">
            <p className="text-sm font-bold text-emerald-300">빠르게 찾는 방법</p>
            <ol className="mt-6 space-y-5">
              {["필요한 서비스를 선택하세요", "작업이 필요한 구와 동을 고르세요", "지역별 작업 정보와 문의 내용을 확인하세요"].map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-black">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-6 text-slate-200">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-black tracking-widest text-emerald-700">SERVICES</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">어떤 작업이 필요하신가요?</h2>
          <p className="mt-4 leading-7 text-slate-600">서비스를 선택하면 작업 가능한 지역을 구 단위부터 차례대로 확인할 수 있습니다.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.name}
              href={`/service/${encodeURIComponent(service.name)}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold text-emerald-700">{service.tag}</p>
                  <h3 className="mt-2 text-xl font-black">{service.name}</h3>
                </div>
                <span className="text-2xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600">→</span>
              </div>
              <p className="mt-4 min-h-14 leading-7 text-slate-600">{service.description}</p>
              <p className="mt-6 text-sm font-bold text-slate-900">지역 선택하기</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="why" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-6">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black tracking-widest text-emerald-700">WHY SURIGONG</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">필요한 정보부터 먼저 확인합니다.</h2>
            </div>
            <div className="grid gap-4">
              {trustPoints.map((point, index) => (
                <div key={point} className="flex gap-4 rounded-2xl bg-slate-50 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 font-black text-emerald-800">{index + 1}</span>
                  <p className="pt-1 leading-7 text-slate-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="guide" className="mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-24">
        <p className="text-sm font-black tracking-widest text-emerald-700">HOW IT WORKS</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">수리공 이용 방법</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["01", "서비스 선택", "누수, 세척, 도어락 등 필요한 작업을 선택합니다."],
            ["02", "지역 선택", "작업이 필요한 구와 동을 차례대로 선택합니다."],
            ["03", "작업 정보 확인", "지역별 서비스 안내와 작업 범위를 확인합니다."],
          ].map(([step, title, description]) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-white p-7">
              <p className="text-sm font-black text-emerald-700">STEP {step}</p>
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-6 md:pb-24">
        <div className="rounded-3xl bg-slate-950 px-7 py-10 text-white md:px-12 md:py-14">
          <p className="text-sm font-bold text-emerald-300">SURIGONG</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">지금 바로 문의하세요</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">서비스 선택이 어렵거나 바로 상담이 필요하면 전화로 문의하세요.</p>
          <a href="tel:01028920819" className="mt-7 inline-block rounded-xl bg-white px-6 py-3 font-bold text-slate-950">010-2892-0819</a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
          <strong className="text-slate-800">수리공</strong>
          <span>문의 010-2892-0819 · © 2026 수리공. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
