"use client";

import React, { useState } from "react";
import { MessageCircle, Send } from "lucide-react"; 
import { createClient } from "@/utils/supabase/client";

const MOODS = [
  { label: "开心", emoji: "😆", color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
  { label: "难过", emoji: "😭", color: "bg-blue-100 text-blue-600 border-blue-200" },
  { label: "生气", emoji: "😡", color: "bg-red-100 text-red-600 border-red-200" },
  { label: "想贴贴", emoji: "🥰", color: "bg-pink-100 text-pink-600 border-pink-200" },
  { label: "好累", emoji: "😴", color: "bg-gray-100 text-gray-600 border-gray-200" },
];

export default function MoodSelector({ currentUserId, userEmail }: { currentUserId: string, userEmail?: string }) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const handleSubmit = async () => {
    if (!selectedMood) return;
    setIsSubmitting(true);

    const finalNote = note.trim() || `我现在${selectedMood}...`;

    const { error } = await supabase.from("mood_logs").insert([
      {
        user_id: currentUserId, 
        mood_type: selectedMood,
        note: finalNote, 
      },
    ]);

    if (error) {
      console.error("Error:", error);
      alert("发送失败了 🥲");
    } else {
      setSelectedMood(null);
      setNote("");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-pink-50 p-1.5 rounded-full">
            <MessageCircle size={16} className="text-pink-500" />
          </div>
          <h2 className="font-bold text-gray-700 text-sm">
             给 Ta 留个言
          </h2>
        </div>
      </div>

      <div className="flex justify-between gap-2 mb-4">
        {MOODS.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelectedMood(mood.label)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl border transition-all duration-200 ${
              selectedMood === mood.label
                ? `${mood.color} ring-2 ring-offset-1 ring-pink-100 scale-110` 
                : "bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100" 
            }`}
          >
            <span className="text-xl mb-1">{mood.emoji}</span>
            <span className="text-[10px] font-bold">{mood.label}</span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={`想说什么？(例如: 想吃火锅!)`}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all placeholder:text-gray-400"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-xl transition-colors shadow-lg shadow-pink-200 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}