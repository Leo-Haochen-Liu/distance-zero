"use client";

import React, { useState, useEffect } from "react";
import { Heart, Clock, CalendarHeart } from "lucide-react";

export default function LoveTimer() {
  // ----------------------------------------------------------------
  // 🔧 配置区：请确保这里的时间和你之前的一致
  // ----------------------------------------------------------------
  const START_DATE_STR = "2020-12-19T00:00:00"; 
  // ----------------------------------------------------------------

  const [timeData, setTimeData] = useState({
    totalDays: 0,
    years: 0,
    extraDays: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    anniversaryCount: 0,
    daysToAnniversary: 0,
  });

  // 补零函数 (5 -> 05)
  const pad = (n: number) => n.toString().padStart(2, "0");

  useEffect(() => {
    // 定义计算函数
    const calculateTime = () => {
      // --- 1. 基础时间处理 (保留你的北京时间逻辑) ---
      const getBeijingDate = () => {
        const d = new Date();
        const localTime = d.getTime();
        const localOffset = d.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        const offset = 8; // 北京 UTC+8
        return new Date(utc + (3600000 * offset));
      };

      const now = getBeijingDate();
      const startDate = new Date(START_DATE_STR);

      // --- 2. 计算总天数 ---
      // 重置时分秒，确保只比较日期
      const nowForDayCalc = new Date(now);
      nowForDayCalc.setHours(0, 0, 0, 0);
      const startForDayCalc = new Date(startDate); // 确保 start 也清零
      startForDayCalc.setHours(0,0,0,0);

      const diffTime = nowForDayCalc.getTime() - startForDayCalc.getTime();
      const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // --- 3. 计算 "X年X天" ---
      let years = now.getFullYear() - startDate.getFullYear();
      const startMonth = startDate.getMonth();
      const startDay = startDate.getDate();
      const currentMonth = now.getMonth();
      const currentDay = now.getDate();

      // 如果还没到今年的纪念日，年数减1
      if (currentMonth < startMonth || (currentMonth === startMonth && currentDay < startDay)) {
        years--;
      }

      // 计算零头天数
      const lastAnniversaryDate = new Date(startDate);
      lastAnniversaryDate.setFullYear(startDate.getFullYear() + years);
      // 这里必须重新重置 lastAnniversaryDate 的时分秒，否则计算会有小数误差
      lastAnniversaryDate.setHours(0,0,0,0);
      
      const diffTimeSinceAnniversary = nowForDayCalc.getTime() - lastAnniversaryDate.getTime();
      const extraDays = Math.floor(diffTimeSinceAnniversary / (1000 * 60 * 60 * 24));

      // --- 4. 纪念日倒计时 ---
      const currentYear = now.getFullYear();
      let thisYearAnniversary = new Date(startDate);
      thisYearAnniversary.setFullYear(currentYear);
      thisYearAnniversary.setHours(0,0,0,0);

      let targetAnniversaryDate;
      let nextAnniversaryCount;

      if (nowForDayCalc.getTime() < thisYearAnniversary.getTime()) {
        targetAnniversaryDate = thisYearAnniversary;
        nextAnniversaryCount = currentYear - startDate.getFullYear();
      } else {
        targetAnniversaryDate = new Date(startDate);
        targetAnniversaryDate.setFullYear(currentYear + 1);
        targetAnniversaryDate.setHours(0,0,0,0);
        nextAnniversaryCount = (currentYear + 1) - startDate.getFullYear();
      }

      const diffAnniversary = Math.ceil((targetAnniversaryDate.getTime() - nowForDayCalc.getTime()) / (1000 * 60 * 60 * 24));

      // --- 5. 实时时分秒 (这是新增的) ---
      // 直接用 now (它已经是北京时间了) 获取当前的时分秒
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTimeData({
        totalDays,
        years,
        extraDays,
        hours,
        minutes,
        seconds,
        anniversaryCount: nextAnniversaryCount,
        daysToAnniversary: diffAnniversary
      });
    };

    // 立即执行一次
    calculateTime();

    // 开启定时器，每秒刷新
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between text-rose-900">
      {/* 顶部：标题 + 总天数 */}
      <div>
        <div className="flex items-center gap-1.5 opacity-70 mb-1">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="text-xs font-bold tracking-wider uppercase">Love Timeline</span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black tracking-tight text-rose-600 drop-shadow-sm">
            {timeData.totalDays}
          </span>
          <span className="text-lg font-bold opacity-80">天</span>
        </div>
      </div>

      {/* 中部：具体年数 + 实时时钟 */}
      <div className="flex flex-col gap-2 mt-2">
        {/* 年数胶囊 */}
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-rose-100 w-fit">
           <CalendarHeart className="w-3.5 h-3.5 text-rose-500" />
           <span className="text-xs font-bold">
             {timeData.years} 年 {timeData.extraDays} 天
           </span>
        </div>

        {/* 实时时间胶囊 (带秒) */}
        <div className="inline-flex items-center gap-2 bg-rose-100/50 px-3 py-1.5 rounded-xl border border-rose-100 w-fit">
           <Clock className="w-3.5 h-3.5 text-rose-500" />
           <span className="text-xs font-mono font-bold tabular-nums">
             {pad(timeData.hours)} : {pad(timeData.minutes)} : {pad(timeData.seconds)}
           </span>
        </div>
      </div>

      {/* 底部：纪念日提醒 */}
      <div className="mt-3 pt-3 border-t border-rose-100/50 flex items-center justify-between">
         <span className="text-[10px] font-bold text-rose-400 bg-white px-2 py-0.5 rounded-full shadow-sm">
           {timeData.anniversaryCount} 周年纪念日
         </span>
         <span className="text-xs font-black text-rose-500">
           还有 {timeData.daysToAnniversary} 天
         </span>
      </div>
    </div>
  );
}