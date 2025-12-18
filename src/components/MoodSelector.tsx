'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

// 👑 这里定义唯一的两个主人！
// 把这里的邮箱改成你们注册时填写真实的邮箱
const VIP_LIST = {
  'liuhc2000@gmail.com': { name: '辰哥', gender: 'male' }, // 改成你的注册邮箱
  '2297868156@qq.com': { name: '大宝', gender: 'female' }  // 改成她的注册邮箱
};

// 接收父组件传来的 id 和 email
export default function MoodSelector({ currentUserId, userEmail }: { currentUserId: string, userEmail?: string }) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // 1. 🕵️‍♂️ 身份核查
  // 如果邮箱没在 VIP_LIST 里，就认定为陌生人
  // 注意：userEmail 可能为空，所以要判空
  const currentUser = userEmail && VIP_LIST[userEmail as keyof typeof VIP_LIST];

  // 如果不是主人，显示这个界面
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-gray-400 bg-gray-50 rounded-2xl border border-gray-100">
        <span className="text-2xl">🚫</span>
        <p className="text-sm font-bold mt-2">访客模式</p>
        <p className="text-xs">只有辰哥和大宝才能打卡哦</p>
        <p className="text-xs text-gray-300 mt-1">你的账号: {userEmail}</p>
      </div>
    );
  }

  // 2. 打卡逻辑
  const handleSelect = async (mood: string) => {
    setLoading(true);
    
    // A. 记录心情
    const { error } = await supabase
      .from('mood_logs')
      .insert({
        mood_type: mood,
        user_id: currentUserId,
        note: `来自${currentUser.name}的打卡` // 自动记录是谁
      });

    if (error) {
      console.error("❌ 同步失败:", error);
      alert("保存失败: " + error.message);
    } else {
      // B. 加分逻辑 (数据库会自动触发，或者我们可以手动做简单的反馈)
      alert(`✅ ${currentUser.name} 打卡成功！甜蜜值 +50`);
      
      // 刷新页面显示最新数据
      window.location.reload(); 
    }
    
    setLoading(false);
  };

  const moods = [
    { icon: '😄', label: '开心', color: 'bg-yellow-100 text-yellow-600' },
    { icon: '😭', label: '难过', color: 'bg-blue-100 text-blue-600' },
    { icon: '😡', label: '生气', color: 'bg-red-100 text-red-600' },
    { icon: '🥰', label: '想贴贴', color: 'bg-pink-100 text-pink-600' },
    { icon: '😴', label: '好累', color: 'bg-gray-100 text-gray-600' },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* 顶部显示欢迎语 */}
      <div className="text-xs text-gray-500 text-center mb-1">
        Hi, <span className="font-bold text-blue-600 text-sm">{currentUser.name}</span> 
        {currentUser.gender === 'male' ? '👦' : '👧'} 今天心情怎么样？
      </div>

      <div className="grid grid-cols-5 gap-2">
        {moods.map((m) => (
          <button
            key={m.label}
            onClick={() => handleSelect(m.label)}
            disabled={loading}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition hover:scale-110 active:scale-95 ${m.color} ${loading ? 'opacity-50' : ''}`}
          >
            <span className="text-2xl">{m.icon}</span>
            <span className="text-[10px] font-bold">{m.label}</span>
          </button>
        ))}
      </div>
      
      {loading && <p className="text-center text-xs text-gray-400">正在同步到云端...</p>}
    </div>
  );
}