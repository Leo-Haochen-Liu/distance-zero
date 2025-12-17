"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Calendar as CalendarIcon } from "lucide-react";
import Avatar from "./Avatar";
import { calculateBirthdayInfo } from "../utils/birthday";

// --- 个人信息卡片组件 ---
const ProfileCard = ({ type }: { type: 'chenge' | 'dabao' }) => {
  const config = type === 'chenge' 
    ? { type: 'solar' as const, date: '2000-04-02', name: '辰哥', birthStr: '2000.04.02 (阳)' }
    : { type: 'lunar' as const, date: '2001-01-21', name: '大宝', birthStr: '2001.正月.廿一 (农)' };

  const info = calculateBirthdayInfo(config);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="absolute bottom-full mb-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 z-50 w-48 text-left"
    >
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
        <span className="font-black text-lg text-ink">{config.name}</span>
        <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-bold text-gray-500">
           {info.chineseZodiac} · {info.constellation}
        </div>
      </div>

      <div className="space-y-2 text-xs font-bold text-gray-500">
        <div className="flex items-center gap-2">
          <CalendarIcon size={12} className="text-brand-blue" />
          <span>生日: {config.birthStr}</span>
        </div>
        <div className="flex items-center gap-2">
          <Gift size={12} className="text-brand-pink" />
          <span className="text-rose-500">
            距离 {info.age} 岁生日还有 <span className="font-black text-base">{info.daysLeft}</span> 天
          </span>
        </div>
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-sm"></div>
    </motion.div>
  );
};

export default function InteractionStage() {
  const [activeProfile, setActiveProfile] = useState<'chenge' | 'dabao' | null>(null);

  const handleInteraction = (type: 'chenge' | 'dabao', isHover: boolean) => {
    if (isHover) {
      setActiveProfile(type);
    } else {
      setActiveProfile(prev => prev === type ? null : type);
    }
  };

  // ✅ 修复点：加上 "as const"
  // 这告诉 TS：type 永远是 "spring"，不会是别的字符串，红线就消失了
  const tapAnimation = {
    scale: 0.85,
    transition: { type: "spring" as const, stiffness: 400, damping: 10 } 
  };

  return (
    <section className="relative h-72 w-full bg-brand-blue rounded-3xl border-b-[8px] border-brand-blue-shade flex items-center justify-center overflow-visible shadow-lg z-10">
      
      <motion.div 
        animate={{ x: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-12 w-24 h-12 bg-white/20 rounded-full blur-xl z-0" 
      />
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-brand-blue-shade/20 to-transparent z-0 pointer-events-none rounded-b-2xl" />

      <div className="flex items-end gap-12 md:gap-20 translate-y-6 relative z-20">
        
        {/* 🐶 左边：辰哥 */}
        <motion.div
           className={`relative flex flex-col items-center group cursor-pointer ${activeProfile === 'chenge' ? 'z-50' : 'z-20'}`}
           initial={{ y: 100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           
           onHoverStart={() => setActiveProfile('chenge')}
           onHoverEnd={() => setActiveProfile(null)}
           onClick={() => handleInteraction('chenge', false)}
           
           whileHover={{ scale: 1.05, rotate: -2 }}
           whileTap={tapAnimation}
        >
          <AnimatePresence>
            {activeProfile === 'chenge' && <ProfileCard type="chenge" />}
            {activeProfile !== 'chenge' && (
               <motion.div 
                 initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                 className="absolute bottom-full mb-4 bg-white px-4 py-2 rounded-2xl rounded-bl-none border-b-4 border-gray-200 shadow-sm select-none whitespace-nowrap"
               >
                 <span className="text-xs font-black text-ink">汪! 想你了 🦴</span>
               </motion.div>
            )}
          </AnimatePresence>
          
          <div className="filter drop-shadow-xl relative z-10">
             <Avatar type="chenge" size={120} />
          </div>
        </motion.div>

        {/* 🐱 右边：大宝 */}
        <motion.div
           className={`relative flex flex-col items-center group cursor-pointer ${activeProfile === 'dabao' ? 'z-50' : 'z-20'}`}
           initial={{ y: 100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.1 }}
           
           onHoverStart={() => setActiveProfile('dabao')}
           onHoverEnd={() => setActiveProfile(null)}
           onClick={() => handleInteraction('dabao', false)}

           whileHover={{ scale: 1.05, rotate: 2 }}
           whileTap={tapAnimation}
        >
          <AnimatePresence>
             {activeProfile === 'dabao' && <ProfileCard type="dabao" />}
             {activeProfile !== 'dabao' && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                  className="absolute bottom-full mb-4 bg-white px-4 py-2 rounded-2xl rounded-br-none border-b-4 border-gray-200 shadow-sm select-none whitespace-nowrap"
                >
                  <span className="text-xs font-black text-ink">带好吃的没? 🐟</span>
                </motion.div>
             )}
          </AnimatePresence>

          <div className="filter drop-shadow-xl relative z-10">
             <Avatar type="dabao" size={120} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}