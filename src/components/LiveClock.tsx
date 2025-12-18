"use client";

import React, { useEffect, useState } from "react";
import { 
  Loader2, 
  Sun, 
  Moon, 
  Cloud, 
  CloudRain, 
  Snowflake, 
  CloudLightning,
  CalendarDays
} from "lucide-react";

interface LiveClockProps {
  timezone: string;
  label: string;
  color: "blue" | "rose";
}

// 定义天气数据的接口
interface WeatherData {
  temperature: number;
  weathercode: number;
  is_day: number; // 1 = day, 0 = night
}

// 简单的天气代码映射图标函数
const getWeatherIcon = (code: number, isDay: boolean) => {
  // WMO Weather interpretation codes (http://www.wmo.int/pages/prog/www/IMOP/publications/CIMO-Guide/Updates/ON_M_06_1.html)
  // 0: Clear sky
  if (code === 0 || code === 1) return isDay ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-300" />;
  // 2, 3: Partly cloudy, overcast
  if (code === 2 || code === 3) return <Cloud className="w-5 h-5 text-gray-400" />;
  // 45, 48: Fog (use Cloud for simplicity)
  if (code === 45 || code === 48) return <Cloud className="w-5 h-5 text-gray-300 opacity-80" />;
  // 51-67: Drizzle, Rain
  if (code >= 51 && code <= 67) return <CloudRain className="w-5 h-5 text-blue-400" />;
  // 71-77: Snow
  if (code >= 71 && code <= 77) return <Snowflake className="w-5 h-5 text-cyan-300" />;
  // 95, 96, 99: Thunderstorm
  if (code >= 95) return <CloudLightning className="w-5 h-5 text-purple-500" />;
  
  return <Sun className="w-5 h-5 text-amber-500" />; // Default
};

export default function LiveClock({ timezone, label, color }: LiveClockProps) {
  const [time, setTime] = useState<Date | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. 启动时钟计时器
  useEffect(() => {
    setTime(new Date()); // 初始化
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. 获取天气 (使用 Open-Meteo 免费 API)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 根据标签判断坐标 (简单硬编码)
        let lat, long;
        if (label.includes("Michigan") || timezone.includes("Detroit")) {
          lat = 42.2808; long = -83.7430; // Ann Arbor
        } else {
          lat = 39.9042; long = 116.4074; // Beijing
        }

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`
        );
        const data = await res.json();
        
        if (data.current_weather) {
          setWeather({
            temperature: data.current_weather.temperature,
            weathercode: data.current_weather.weathercode,
            is_day: data.current_weather.is_day,
          });
        }
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // 每30分钟刷新一次天气
    const weatherTimer = setInterval(fetchWeather, 30 * 60 * 1000); 
    return () => clearInterval(weatherTimer);
  }, [label, timezone]);

  // 格式化器
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: timezone,
    month: "long",
    day: "numeric",
    weekday: "short", // 周几
  });
  
  const yearFormatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: timezone,
    year: "numeric",
  });

  // 颜色配置
  const colorStyles = {
    blue: "bg-blue-50/50 border-blue-100 text-blue-900",
    rose: "bg-rose-50/50 border-rose-100 text-rose-900",
  };
  
  const labelStyles = {
    blue: "bg-blue-100 text-blue-700",
    rose: "bg-rose-100 text-rose-700"
  };

  if (!time) return <div className="h-32 bg-gray-50/50 rounded-3xl animate-pulse" />;

  return (
    <div className={`
      relative overflow-hidden rounded-3xl p-4 border shadow-sm backdrop-blur-md transition-all duration-300
      flex flex-col justify-between h-[150px]
      ${colorStyles[color]}
    `}>
      {/* 顶部：地点标签 + 天气 */}
      <div className="flex justify-between items-start">
        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${labelStyles[color]}`}>
          {label}
        </div>
        
        {/* 天气显示 */}
        <div className="flex items-center gap-1.5 bg-white/40 px-2 py-1 rounded-full backdrop-blur-sm">
          {loading ? (
             <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
          ) : weather ? (
            <>
              {getWeatherIcon(weather.weathercode, weather.is_day === 1)}
              <span className="text-xs font-bold font-mono">
                {weather.temperature}°
              </span>
            </>
          ) : (
            <span className="text-[10px] text-gray-400">-</span>
          )}
        </div>
      </div>

      {/* 中部：大时间 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
        <div className="text-4xl font-black tracking-tight tabular-nums opacity-90">
          {timeFormatter.format(time)}
        </div>
      </div>

      {/* 底部：完整日期 */}
      <div className="flex items-center gap-1.5 text-xs font-medium opacity-70 mt-auto pl-1">
        <CalendarDays size={14} />
        <span>
            {yearFormatter.format(time)}
            {dateFormatter.format(time)}
        </span>
      </div>
    </div>
  );
}