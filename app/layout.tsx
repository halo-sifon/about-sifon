import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "about-sifon",
  description: "sifon的个人记录",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
