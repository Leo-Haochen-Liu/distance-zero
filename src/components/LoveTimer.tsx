"use client";

import React, { useState, useEffect } from "react";
import { HeartHandshake, Smile, Clock } from "lucide-react";

export default function LoveTimer() {
  const [daysTogether, setDaysTogether] = useState(0);
  const [anniversaryInfo, setAnniversaryInfo] = useState({ count: 0, daysLeft: 0 });
  const [durationText, setDurationText] = useState({ years: 0, days: 0 });

  useEffect(() => {
    // --- 1. 获取当前北京时间 ---
    // 无论用户在哪个时区，都强制转换为北京时间 (UTC+8)
    const getBeijingDate = () => {
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000; // 获得本地时间和UTC的毫秒偏移
      const utc = localTime + localOffset;
      const offset = 8; // 北京是 UTC+8
      const beijing = utc + (3600000 * offset);
      return new Date(beijing);
    };

    const now = getBeijingDate();
    // 设定开始时间：2020-12-19 (北京时间)
    // 为了计算准确，我们将开始时间视为当天的 00:00:00
    const startDate = new Date("2020-12-19T00:00:00"); 
    
    // --- 2. 计算在一起的总天数 ---
    // 修正：重置 now 的时分秒，确保只比较日期差异，避免不满24小时不算一天的情况
    const nowForDayCalc = new Date(now);
    nowForDayCalc.setHours(0, 0, 0, 0);
    
    const diffTime = nowForDayCalc.getTime() - startDate.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 向下取整，满一天算一天
    setDaysTogether(totalDays);

    // --- 3. 计算 "X年X天" ---
    // 使用纯日期逻辑计算，避免闰年误差
    let years = now.getFullYear() - startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();

    // 如果当前日期还没到当年的纪念日，说明还没满这一年，年份-1
    if (currentMonth < startMonth || (currentMonth === startMonth && currentDay < startDay)) {
      years--;
    }

    // 计算零头天数：用今天 减去 (开始年份 + 满的年数) 的那天
    const lastAnniversaryDate = new Date(startDate);
    lastAnniversaryDate.setFullYear(startDate.getFullYear() + years);
    
    const diffTimeSinceAnniversary = nowForDayCalc.getTime() - lastAnniversaryDate.getTime();
    const extraDays = Math.floor(diffTimeSinceAnniversary / (1000 * 60 * 60 * 24));
    
    setDurationText({ years, days: extraDays });

    // --- 4. 动态计算下个周年是第几年 & 倒计时 ---
    const currentYear = now.getFullYear();
    // 今年的纪念日
    let thisYearAnniversary = new Date(startDate);
    thisYearAnniversary.setFullYear(currentYear);

    let targetAnniversaryDate;
    let nextAnniversaryCount;

    // 如果今天还没过今年的纪念日 (或者就是今天)
    if (nowForDayCalc.getTime() < thisYearAnniversary.getTime()) {
      targetAnniversaryDate = thisYearAnniversary;
      nextAnniversaryCount = currentYear - startDate.getFullYear();
    } else {
      // 如果已经过了，目标就是明年
      targetAnniversaryDate = new Date(startDate);
      targetAnniversaryDate.setFullYear(currentYear + 1);
      nextAnniversaryCount = (currentYear + 1) - startDate.getFullYear();
    }

    const diffAnniversary = Math.ceil((targetAnniversaryDate.getTime() - nowForDayCalc.getTime()) / (1000 * 60 * 60 * 24));
    
    setAnniversaryInfo({
      count: nextAnniversaryCount,
      daysLeft: diffAnniversary
    });

  }, []);

  return (
    <div className="bg-brand-pink rounded-3xl p-6 text-white border-b-[6px] border-brand-pink-shade relative overflow-hidden group hover:brightness-105 transition-all cursor-default h-full">
      <HeartHandshake className="absolute -right-6 -bottom-6 w-40 h-40 text-white/20 rotate-12 group-hover:rotate-[20deg] transition-transform duration-500 ease-spring" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <h2 className="font-bold text-rose-950/70 text-sm tracking-wide mb-1">我们在一起已经</h2>
          
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black tracking-tighter drop-shadow-sm text-rose-950">
              {daysTogether}
            </span>
            <span className="text-2xl font-bold text-rose-900">天</span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-rose-900/80 font-bold text-sm bg-white/30 w-fit px-3 py-1 rounded-lg">
             <Clock size={14} />
             <span>也就是 {durationText.years} 年 {durationText.days} 天</span>
          </div>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 bg-rose-950/10 px-3 py-1.5 rounded-xl backdrop-blur-sm w-fit border border-rose-950/5">
          <Smile size={16} className="text-rose-900" />
          {/* ✅ 动态显示：距离X周年还有X天 */}
          <span className="text-xs font-bold text-rose-900">
             距离 {anniversaryInfo.count} 周年纪念日: {anniversaryInfo.daysLeft} 天
          </span>
        </div>
      </div>
    </div>
  );
}