import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yakunbyeol.vercel.app"),
  title: "야쿤이별",
  description: "야쿤이를 기억하는 작은 별자리. 멀리 떠난 친구를 조용히 떠올리는 공간입니다.",
  openGraph: {
    title: "야쿤이별",
    description: "야쿤이를 기억하는 작은 별자리",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/images/hero-family.jpg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3ebe1",
  width: "device-width",
  initialScale: 1,
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
