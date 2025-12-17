// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav"; // 👈 1. 引入组件

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "浪浪&辰哥的充电站", // 👈 2. 这里的浏览器标签名也可以改一下
  description: "专门为异地恋情侣打造",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {children}
        <BottomNav /> {/* 👈 3. 放在这里，所有页面底部都会出现导航栏 */}
      </body>
    </html>
  );
}