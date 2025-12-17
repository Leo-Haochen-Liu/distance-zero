// src/app/actions.ts
"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// 定义入参结构
interface LogMoodParams {
  userId: string;
  moodType: string;
  note?: string;
}

export async function logMood(params: LogMoodParams) {
  const { userId, moodType, note } = params;

  try {
    // 1. 写入 Supabase
    const { error } = await supabase
      .from("mood_logs")
      .insert({
        user_id: userId,
        mood_type: moodType,
        note: note || "",
      } as any); // 使用 'as any' 避免类型冲突

    if (error) {
      console.error("Supabase Insert Error:", error);
      return { success: false, error: error.message };
    }

    // 2. 刷新页面数据
    // 当数据写入后，告诉 Next.js 重新获取首页数据，这样最新的心情可能会体现在热力图上
    revalidatePath("/");
    
    return { success: true };

  } catch (err) {
    console.error("Server Action Error:", err);
    return { success: false, error: "Unknown error" };
  }
}