import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google"; // 1. 引入新字体
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

// 2. 配置中文字体 (衬线体，显得优雅)
const notoSerif = Noto_Serif_SC({ 
  subsets: ["latin"], 
  weight: ["400", "700", "900"],
  variable: "--font-serif", // 设置 CSS 变量方便在 Tailwind 中使用
});

export const metadata: Metadata = {
  title: "浪浪 & 辰哥的充电站", // 更新浏览器标签页标题
  description: "Love in Michigan & Beijing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      {/* 3. 在 body 中加入字体变量 font-serif */}
      <body className={`${inter.className} ${notoSerif.variable} min-h-screen bg-slate-50 text-gray-900 pb-32 relative selection:bg-rose-200 selection:text-rose-900`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}