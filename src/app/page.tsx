import InteractionStage from "@/components/InteractionStage";
import LoveTimer from "@/components/LoveTimer";
import MoodSelector from "@/components/MoodSelector";

export default function Home() {
  // 依然保留这个测试 ID，保证功能可用
  const TEST_USER_ID = "11111111-1111-1111-1111-111111111111";

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col p-4 gap-4 pb-24">
      {/* 1. 顶部：之前的标题和改名区域 */}
      <div className="flex justify-between items-center px-2 py-2">
         <h1 className="text-xl font-black text-gray-800">
           浪浪&辰哥的充电站 <span className="text-brand-blue"></span>
         </h1>
         <div className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
            Level. 3
         </div>
      </div>

      {/* 2. 互动舞台区 (视频里上面的头像和对话) */}
      <section className="w-full">
        {/* 这里调用你 components 里的 InteractionStage 组件 */}
        <InteractionStage /> 
      </section>

      {/* 3. 核心功能区：计时器 + 打卡 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 左边：恋爱计时器 (LoveTimer) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[180px] flex flex-col justify-center relative overflow-hidden">
          {/* 这里调用你 components 里的 LoveTimer 组件 */}
          <LoveTimer /> 
        </div>

        {/* 右边：每日打卡 (MoodSelector) */}
        {/* 我们把你刚才修好的数据库功能，塞进这个漂亮的格子里 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
          <div className="flex items-center justify-between mb-2">
             <h2 className="font-bold text-gray-700">每日打卡</h2>
             <span className="text-xs text-brand-blue bg-blue-50 px-2 py-0.5 rounded-full">
               +50 甜蜜值
             </span>
          </div>
          
          {/* 👇 刚才做好的能连数据库的组件放在这！ */}
          <MoodSelector currentUserId={TEST_USER_ID} />
        </div>

      </section>

      {/* 4. 底部预留：更多功能 */}
      <section className="mt-2">
        <div className="w-full p-4 bg-white/50 rounded-2xl border border-dashed border-gray-200 text-center">
           <p className="text-xs text-gray-400">
             👇 既然修好了，是不是该做那个“时间胶囊”了？
           </p>
        </div>
      </section>
    </main>
  );
}