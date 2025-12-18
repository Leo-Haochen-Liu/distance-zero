import InteractionStage from "@/components/InteractionStage";
import LoveTimer from "@/components/LoveTimer";
import MoodSelector from "@/components/MoodSelector";
import LiveClock from "@/components/LiveClock";
import { createClient } from '@/utils/supabase/server'; 
import Link from "next/link";
import { Zap, BatteryCharging, Sparkles } from "lucide-react"; // 引入图标

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col p-4 gap-5 pb-24 max-w-md mx-auto md:max-w-4xl">
      
      {/* ==================== 1. 新设计的 Header ==================== */}
      <header className="flex flex-col gap-2 pt-2 mb-2">
        {/* 顶部小标：英文装饰，提升精致感 */}
        <div className="flex justify-between items-center">
             <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase flex items-center gap-1">
                <Sparkles size={12} className="text-yellow-500" />
                Distance Zero Project
             </span>
             
             {/* 连接状态 - 胶囊样式 */}
             {user ? (
               <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm border border-green-100 px-2.5 py-1 rounded-full shadow-sm">
                 <div className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                 </div>
                 <span className="text-[10px] font-medium text-green-700">已连接</span>
               </div>
             ) : (
               <Link href="/login" className="flex items-center gap-1 text-[10px] bg-gray-900 text-white px-3 py-1 rounded-full shadow-md font-bold hover:bg-gray-800 transition-colors">
                 Login
               </Link>
             )}
        </div>

        {/* 主标题区 */}
        <div className="relative">
          <h1 className="font-serif text-3xl md:text-4xl font-black text-gray-800 tracking-tight leading-tight">
            {/* 渐变文字效果：从密歇根蓝 -> 混合紫 -> 北京粉 */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">
              浪浪 & 辰哥
            </span>
            <span className="text-gray-800">的</span>
            <br />
            <span className="flex items-center gap-2">
              充电站
              {/* 装饰图标：充电闪电 */}
              <div className="bg-yellow-100 p-1 rounded-full rotate-12 border-2 border-white shadow-sm">
                 <Zap size={20} className="text-yellow-500 fill-yellow-500" />
              </div>
            </span>
          </h1>
          
          {/* 背景装饰光斑 (Fancy Work) */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-200/30 rounded-full blur-2xl -z-10 pointer-events-none"></div>
          <div className="absolute top-2 left-32 w-24 h-24 bg-rose-200/30 rounded-full blur-2xl -z-10 pointer-events-none"></div>
        </div>
      </header>

      {/* ==================== 2. 双时钟卡片 ==================== */}
      <section className="grid grid-cols-2 gap-3">
        <LiveClock timezone="America/Detroit" label="Michigan" color="blue" />
        <LiveClock timezone="Asia/Shanghai" label="Beijing" color="rose" />
      </section>

      {/* ==================== 3. 核心互动区 ==================== */}
      <section className="w-full relative z-10">
        <InteractionStage /> 
      </section>

      {/* ==================== 4. 功能区：计时器 + 打卡 ==================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 计时器卡片 */}
        <div className="bg-gradient-to-br from-rose-50/80 to-pink-50/80 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-rose-100/50 min-h-[160px] relative overflow-hidden group">
           {/* 加一点hover时的微光效果 */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700"></div>
          <LoveTimer /> 
        </div>

        {/* 每日打卡卡片 */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-white/50 flex flex-col gap-3 min-h-[160px]">
          <div className="flex items-center justify-between mb-1">
             <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1.5 rounded-full">
                  <BatteryCharging size={16} className="text-blue-600" />
                </div>
                <h2 className="font-bold text-gray-700 text-sm">每日心情充电</h2>
             </div>
             <span className="text-[10px] text-rose-600 bg-rose-100/50 px-2 py-1 rounded-full font-bold border border-rose-100">
               +10 EXP
             </span>
          </div>
          
          {user ? (
             <MoodSelector currentUserId={user.id} userEmail={user.email} />
          ) : (
             <div className="flex flex-col items-center justify-center flex-1 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 text-gray-400 gap-2 p-4">
                <span className="text-xl opacity-50">🔒</span>
                <Link href="/login" className="text-xs text-blue-600 font-bold hover:underline">
                  登录记录心情
                </Link>
             </div>
          )}
        </div>
      </section>
    </main>
  );
}