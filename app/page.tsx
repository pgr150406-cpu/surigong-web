import Link from "next/link";

const services = [
  { name: "누수", description: "천장·벽·바닥·배관 주변의 이상 징후와 누수 원인 확인", tag: "누수·배관" },
  { name: "고압세척", description: "느린 배수, 반복 막힘, 하수관 찌꺼기와 이물질 제거", tag: "배관 세척" },
  { name: "외벽누수", description: "외벽 균열, 창틀, 실리콘, 빗물 유입 여부 점검", tag: "외벽·방수" },
  { name: "화장실누수", description: "변기·세면대·바닥·배관 주변의 누수와 배수 문제 확인", tag: "욕실" },
  { name: "도어락", description: "도어락 고장, 교체, 신규 설치와 현장 조건 확인", tag: "출입문" },
  { name: "언수도", description: "겨울철 수도 동결 위치 확인과 해빙 작업", tag: "동파·해빙" },
  { name: "에어컨설치", description: "설치 위치, 실외기, 배관 조건을 확인한 에어컨 설치", tag: "냉방" },
  { name: "집청소", description: "주거 공간 청소와 정리, 작업 범위에 맞는 전문가 연결", tag: "생활 관리" },
  { name: "이사", description: "이사 물량, 이동 거리, 현장 조건에 맞는 작업자 연결", tag: "이사" },
];

const principles = [
  {
    number: "01",
    title: "증상보다 원인과 조건을 먼저 봅니다",
    text: "물이 보이는 곳과 실제 원인이 다를 수 있고, 같은 증상도 건물과 배관 조건에 따라 작업 방식이 달라집니다.",
  },
  {
    number: "02",
    title: "작업 범위를 먼저 확인합니다",
    text: "주소, 건물 형태, 증상, 필요한 작업 범위를 먼저 확인하면 불필요한 방문과 작업을 줄일 수 있습니다.",
  },
  {
    number: "03",
    title: "지역에 맞는 작업 정보를 연결합니다",
    text: "구와 동 단위로 필요한 서비스를 확인하고, 지역별 작업 정보를 바로 찾아볼 수 있도록 구성했습니다.",
  },
  {
    number: "04",
    title: "급한 경우 바로 전화로 상담할 수 있습니다",
    text: "서비스 선택이 어렵거나 빠른 확인이 필요하면 010-2892-0819로 바로 문의하세요.",
  },
];

const symptoms = [
  "천장이나 벽에 물 자국이 생겼어요",
  "배수가 느리거나 자꾸 막혀요",
  "도어락이 작동하지 않아요",
  "수도관이 얼어서 물이 나오지 않아요",
  "에어컨 설치 위치를 상담하고 싶어요",
  "집 정리·청소나 이사가 필요해요",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6">
          <Link href="/" className="text-2xl font-black tracking-tight">수리공</Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#services" className="transition hover:text-slate-950">서비스</a>
            <a href="#principles" className="transition hover:text-slate-950">수리공 방식</a>
            <a href="#contact" className="transition hover:text-slate-950">문의</a>
          </nav>

          <a
            href="tel:01028920819"
            className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            지금 바로 문의하세요
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:py-28">
          <div>
            <p className="text-sm font-black tracking-[0.18em] text-emerald-300">SURIGONG · LOCAL HOME SERVICE</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
              보이는 문제보다,
              <br />
              해결해야 할 조건부터
              <br />
              확인합니다.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              누수, 배관 세척, 도어락, 언수도, 에어컨, 청소, 이사까지.
              필요한 작업과 지역을 확인하고 맞는 정보를 빠르게 찾아보세요.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#services" className="rounded-xl bg-emerald-500 px-6 py-3.5 font-black text-white transition hover:bg-emerald-400">
                서비스 찾기
              </a>
              <a href="tel:01028920819" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-black text-white transition hover:bg-white/15">
                010-2892-0819
              </a>
            </div>
          </div>

          <div className="self-end rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur md:p-8">
            <p className="text-sm font-black text-emerald-300">빠른 상담이 필요한 경우</p>
            <div className="mt-6 grid gap-3">
              {symptoms.slice(0, 4).map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-slate-400">현장 사진이나 증상을 미리 알려주시면 상담이 더 빠릅니다.</p>
          </div>
        </div>
      </section>

      <section id="principles" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black tracking-[0.18em] text-emerald-700">WHY SURIGONG</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-4xl">
                급할수록,
                <br />
                먼저 확인할 게 있습니다.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-slate-600">작업부터 고르는 대신 현재 증상과 현장 조건을 먼저 정리하면 더 정확하게 필요한 서비스를 찾을 수 있습니다.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {principles.map((item) => (
                <div key={item.number} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-black text-emerald-700">{item.number}</p>
                  <h3 className="mt-4 text-xl font-black leading-7">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-black tracking-[0.18em] text-emerald-700">SERVICES</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">어떤 문제가 생기셨나요?</h2>
          <p className="mt-4 leading-7 text-slate-600">증상에 가까운 서비스를 선택한 뒤 작업이 필요한 지역을 선택하세요.</p>
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
                  <p className="text-xs font-black tracking-wide text-emerald-700">{service.tag}</p>
                  <h3 className="mt-2 text-2xl font-black">{service.name}</h3>
                </div>
                <span className="text-2xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600">→</span>
              </div>
              <p className="mt-4 min-h-14 leading-7 text-slate-600">{service.description}</p>
              <p className="mt-6 text-sm font-black text-slate-900">지역별 정보 보기</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-24">
          <p className="text-sm font-black tracking-[0.18em] text-emerald-700">CHECK FIRST</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">이런 상황이면 먼저 문의해보세요.</h2>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {symptoms.map((item, index) => (
              <div key={item} className="bg-white p-6">
                <p className="text-sm font-black text-emerald-700">0{index + 1}</p>
                <p className="mt-3 font-bold leading-7 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-24">
        <p className="text-sm font-black tracking-[0.18em] text-emerald-700">PROCESS</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">찾는 순서는 단순합니다.</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["01", "서비스 선택", "현재 증상과 가장 가까운 서비스를 선택합니다."],
            ["02", "지역 선택", "작업이 필요한 구와 동을 차례대로 선택합니다."],
            ["03", "상담·확인", "지역별 안내를 확인하거나 바로 전화로 문의합니다."],
          ].map(([step, title, description]) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-white p-7">
              <p className="text-sm font-black text-emerald-700">STEP {step}</p>
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 pb-20 md:px-6 md:pb-24">
        <div className="grid gap-6 rounded-3xl bg-emerald-600 px-7 py-10 text-white md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-14">
          <div>
            <p className="text-sm font-black tracking-[0.18em] text-emerald-100">CONTACT</p>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">현장 상황을 알려주시면 상담이 빨라집니다.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-emerald-50">주소, 증상, 건물 형태와 현장 사진이 있으면 함께 준비해주세요.</p>
          </div>
          <a href="tel:01028920819" className="inline-flex rounded-xl bg-white px-6 py-4 text-lg font-black text-emerald-700 shadow-sm">
            010-2892-0819
          </a>
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
