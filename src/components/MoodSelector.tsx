"use client"; // 👈 这一行必须在最上面，因为我们要用 useState

import { useState } from "react";
import { logMood } from "@/app/actions"; // 引入我们在 actions.ts 里写的后端函数

// 👇 1. 定义组件接收的参数 (解决了 page.tsx 的报错)
interface MoodSelectorProps {
  currentUserId: string;
}

export default function MoodSelector({ currentUserId }: MoodSelectorProps) {
  // 定义一些状态：当前选中的心情，以及是否正在提交中
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 心情选项配置
  const moods = [
    { id: "happy", emoji: "😄", label: "开心" },
    { id: "sad", emoji: "😭", label: "难过" },
    { id: "angry", emoji: "😡", label: "生气" },
    { id: "love", emoji: "🥰", label: "想贴贴" },
    { id: "tired", emoji: "😴", label: "好累" },
  ];

  // 点击处理函数
  const handleSelect = async (moodId: string) => {
    // 如果正在提交中，阻止再次点击（防止重复写入）
    if (isSubmitting) return;
    
    // 视觉上立即响应
    setSelectedMood(moodId);
    setIsSubmitting(true);

    try {
      console.log("正在提交心情:", moodId, "用户ID:", currentUserId);

      // 👇 2. 调用后端动作 (Server Action)
      const result = await logMood({
        userId: currentUserId,
        moodType: moodId,
        note: "来自首页点击" // 这里可以写死，或者以后做成输入框
      });

      if (result.success) {
        console.log("✅ 心情同步成功！");
      } else {
        console.error("❌ 同步失败:", result.error);
        alert("保存失败，请检查控制台");
      }
    } catch (e) {
      console.error("❌ 系统错误:", e);
    } finally {
      // 无论成功失败，500毫秒后恢复按钮可点击状态
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 按钮容器 */}
      <div className="flex justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleSelect(mood.id)}
            disabled={isSubmitting}
            className={`
              flex flex-col items-center gap-1 transition-all duration-200
              ${selectedMood === mood.id ? "scale-110 -translate-y-1" : "hover:scale-105"}
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <span className="text-3xl filter drop-shadow-sm">{mood.emoji}</span>
            <span 
              className={`text-xs font-medium ${
                selectedMood === mood.id ? "text-brand-blue" : "text-gray-400"
              }`}
            >
              {mood.label}
            </span>
          </button>
        ))}
      </div>

      {/* 底部状态提示 */}
      <div className="h-4 text-center">
        {isSubmitting && (
          <p className="text-xs text-gray-400 animate-pulse">正在同步到云端...</p>
        )}
      </div>
    </div>
  );
}