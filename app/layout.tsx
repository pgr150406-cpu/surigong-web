import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://surigong-web.vercel.app"),

  title: {
    default: "수리공 | 우리 동네 전문 작업자 연결",
    template: "%s | 수리공",
  },

  description:
    "누수, 고압세척, 외벽누수, 화장실누수, 도어락, 언수도, 에어컨 설치, 청소, 이사 등 지역 전문 작업자를 연결하는 수리공입니다.",

  keywords: [
    "수리공",
    "누수",
    "누수업체",
    "고압세척",
    "배관",
    "도어락",
    "에어컨설치",
    "집청소",
    "이사",
    "인천수리",
  ],

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    other: {
      "naver-site-verification":
        "c4e8b4cfb824cb66215d6239329036e860028af1",
    },
  },

  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "수리공",
    title: "수리공 | 우리 동네 전문 작업자 연결",
    description:
      "필요한 서비스와 지역을 선택하고 전문 작업자를 찾아보세요.",
    url: "https://surigong-web.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}