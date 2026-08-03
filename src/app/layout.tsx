import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://hello-yacun-world.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "야쿤이별",
  description:
    "야쿤이를 기억하는 작은 별자리. 멀리 떠난 친구를 조용히 떠올리는 공간입니다.",
  openGraph: {
    title: "야쿤이별",
    description: "야쿤이를 기억하는 작은 별자리",
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "야쿤이별",
    images: [
      {
        url: `${siteUrl}/images/og.jpg`,
        width: 1200,
        height: 798,
        alt: "야쿤이별",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "야쿤이별",
    description: "야쿤이를 기억하는 작은 별자리",
    images: [`${siteUrl}/images/og.jpg`],
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
