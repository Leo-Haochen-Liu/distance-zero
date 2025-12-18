"use client";

import React, { useEffect, useState } from "react";
// 引入拆分好的组件
import StatusBar from "./StatusBar";
import InteractionStage from "./InteractionStage";
import LoveTimer from "./LoveTimer";
import MoodSelector from "./MoodSelector"; // 👈 1. 引入 MoodSelector
import { createClient } from "@/utils/supabase/client"; // 👈 2. 引入 Supabase 拿用户ID

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  // 获取当前登录用户，因为 MoodSelector 需要传 ID 进去
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* 模块1：顶部状态栏 (保持原样) */}
      <StatusBar />

      {/* 模块2：核心互动舞台 (保持原样) */}
      <InteractionStage />

      {/* 模块3：底部功能网格 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 恋爱计时器 (保持原样) */}
        <LoveTimer />

        {/* 👇 模块4：这里改了！删掉了原来的 button，换成了 MoodSelector */}
        <div className="h-full">
           {/* 只有获取到 user 后才显示，防止 ID 为空报错 */}
           {user && (
             <MoodSelector 
               currentUserId={user.id} 
               userEmail={user.email} 
             />
           )}
        </div>

      </section>
    </div>
  );
}