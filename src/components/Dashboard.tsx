"use client";

import React from "react";
import { Calendar } from "lucide-react";
// 引入拆分好的组件
import StatusBar from "./StatusBar";
import InteractionStage from "./InteractionStage";
import LoveTimer from "./LoveTimer";

export default function Dashboard() {
  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* 模块1：顶部状态栏 */}
      <StatusBar />

      {/* 模块2：核心互动舞台 */}
      <InteractionStage />

      {/* 模块3：底部功能网格 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 恋爱计时器 */}
        <LoveTimer />

        {/* 每日打卡按钮 (暂时比较简单，先留在这里，以后复杂了再拆) */}
        <button className="w-full h-full bg-white border-2 border-gray-200 border-b-[6px] active:border-b-2 active:border-t-4 active:bg-gray-50 rounded-3xl p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 transition-all text-ink hover:bg-gray-50 group">
          <div className="w-16 h-16 rounded-2xl bg-action-green border-b-4 border-action-green-shade flex items-center justify-center text-white shadow-sm group-active:border-b-0 group-active:translate-y-1 transition-all">
            <Calendar strokeWidth={3} size={32} />
          </div>
          <div className="text-left md:text-center flex-1">
            <h3 className="font-extrabold text-xl text-ink">每日打卡</h3>
            <p className="text-sm text-gray-400 font-bold mt-1">点击领取 +50 能量</p>
          </div>
        </button>

      </section>
    </div>
  );
}