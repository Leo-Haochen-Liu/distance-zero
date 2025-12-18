"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Calendar as CalendarIcon, MessageCircleHeart } from "lucide-react";
import Avatar from "./Avatar"; 
import { calculateBirthdayInfo } from "../utils/birthday"; 

// --- 个人信息卡片组件 (保持不变) ---
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
      // ⚠️ z-index 设为 50，确保浮在最上层
      className="absolute bottom-full mb-6 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-xl border border-white/60 ring-1 ring-gray-100 z-50 w-52 text-left"
    >
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
        <span className="font-black text-xl text-gray-800">{config.name}</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${type === 'chenge' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
           {info.chineseZodiac} · {info.constellation}
        </div>
      </div>

      <div className="space-y-2.5 text-xs font-bold text-gray-500">
        <div className="flex items-center gap-2">
          <CalendarIcon size={14} className={type === 'chenge' ? "text-blue-400" : "text-rose-400"} />
          <span className="tracking-wide">{config.birthStr}</span>
        </div>
        <div className="flex items-center gap-2">
          <Gift size={14} className={type === 'chenge' ? "text-blue-400" : "text-rose-400"} />
          <span className="text-gray-600">
            距离 {info.age} 岁生日还有 <span className={`font-black text-base mx-1 ${type === 'chenge' ? "text-blue-600" : "text-rose-600"}`}>{info.daysLeft}</span> 天
          </span>
        </div>
      </div>
      
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-gray-100"></div>
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

  const tapAnimation = {
    scale: 0.9,
    transition: { type: "spring" as const, stiffness: 400, damping: 10 } 
  };

  return (
    // 🔴 修复关键点 1: 最外层去掉了 "overflow-hidden"
    // 这样子元素的弹出框就可以超出这个白色的框框显示了
    <div className="w-full min-h-[320px] bg-white rounded-3xl shadow-sm border border-gray-100 relative group select-none">
      
      {/* 🔴 修复关键点 2: 创建一个独立的背景层，把 "overflow-hidden" 加在这里 */}
      {/* 这样背景光斑会被切掉，不会溢出，但不会影响上面那一层的头像和弹窗 */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          {/* 背景装饰 (极淡的红蓝融合) */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50/40 via-transparent to-rose-50/40"></div>
          
          {/* 背景光斑 */}
          <div className="absolute top-[-20%] left-[10%] w-72 h-72 bg-blue-100/30 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute bottom-[-20%] right-[10%] w-72 h-72 bg-rose-100/30 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      {/* 3. 左上角标题 (放在背景层之上) */}
      <div className="absolute top-6 left-6 flex items-center gap-2 opacity-40 z-10">
        <Sparkles size={16} className="text-amber-400" />
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Current Mood</span>
      </div>

      {/* 🔴 修复关键点 3: 内容层加上 flex 和 height-full 确保居中 */}
      <div className="relative z-20 w-full h-[320px] flex items-end justify-center pb-12 gap-12 md:gap-24">
        
        {/* 🐶 左边：辰哥 */}
        <motion.div
           className={`relative flex flex-col items-center group/boy cursor-pointer ${activeProfile === 'chenge' ? 'z-50' : 'z-20'}`}
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.6 }}
           
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
                 initial={{ scale: 0.8, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }}
                 className="absolute bottom-[110%] mb-2 bg-white px-4 py-2 rounded-2xl rounded-bl-sm border border-blue-100 shadow-sm whitespace-nowrap"
               >
                 <span className="text-xs font-bold text-blue-900">大宝，想你了！</span>
               </motion.div>
            )}
          </AnimatePresence>
          
          <div className="relative filter drop-shadow-lg transition-transform duration-300">
             <div className="absolute inset-0 bg-blue-100 rounded-full scale-90 blur-xl opacity-0 group-hover/boy:opacity-40 transition-opacity"></div>
             <Avatar type="chenge" size={130} />
          </div>
        </motion.div>

        {/* ❤️ 中间爱心 */}
        <div className="hidden md:flex flex-col items-center gap-2 text-gray-300 pb-10 opacity-30">
           <MessageCircleHeart size={24} />
           <div className="w-1 h-8 border-l border-dashed border-gray-300"></div>
        </div>

        {/* 🐱 右边：大宝 */}
        <motion.div
           className={`relative flex flex-col items-center group/girl cursor-pointer ${activeProfile === 'dabao' ? 'z-50' : 'z-20'}`}
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.1, duration: 0.6 }}
           
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
                  initial={{ scale: 0.8, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-[110%] mb-2 bg-white px-4 py-2 rounded-2xl rounded-br-sm border border-rose-100 shadow-sm whitespace-nowrap"
                >
                  <span className="text-xs font-bold text-rose-900">我也想你辣</span>
                </motion.div>
             )}
          </AnimatePresence>

          <div className="relative filter drop-shadow-lg transition-transform duration-300">
             <div className="absolute inset-0 bg-rose-100 rounded-full scale-90 blur-xl opacity-0 group-hover/girl:opacity-40 transition-opacity"></div>
             <Avatar type="dabao" size={130} />
          </div>
        </motion.div>

      </div>
    </div>
  );
}