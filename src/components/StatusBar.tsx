"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Avatar from "./Avatar";

export default function StatusBar() {
  return (
    <section className="flex items-center justify-between gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
      {/* 左侧：辰哥的状态 */}
      <div className="flex items-center gap-3 bg-white border-2 border-gray-100 rounded-2xl p-2 pr-4 shrink-0">
         <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center p-1">
           <Avatar type="chenge" size={32} />
         </div>
         <div className="flex flex-col">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">LEVEL</span>
           <span className="font-black text-ink text-sm">Lv. 3</span>
         </div>
      </div>

      {/* 中间：能量值按钮 */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-action-yellow text-white px-5 py-3 rounded-2xl border-b-4 border-action-yellow-shade shadow-sm active:border-b-0 active:translate-y-1 transition-all shrink-0 cursor-pointer z-10"
      >
        <Zap fill="currentColor" strokeWidth={3} className="w-5 h-5" />
        <span className="font-black text-lg">1,204</span>
      </motion.button>

      {/* 右侧：大宝的状态 */}
      <div className="flex items-center gap-3 bg-white border-2 border-gray-100 rounded-2xl p-2 pr-4 shrink-0">
         <div className="flex flex-col items-end">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">LEVEL</span>
           <span className="font-black text-ink text-sm">Lv. 5</span>
         </div>
         <div className="w-10 h-10 bg-brand-pink/10 rounded-xl flex items-center justify-center p-1">
           <Avatar type="dabao" size={32} />
         </div>
      </div>
    </section>
  );
}