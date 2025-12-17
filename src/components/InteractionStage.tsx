"use client";

import React from "react";
import { motion } from "framer-motion";
import Avatar from "./Avatar";

export default function InteractionStage() {
  return (
    <section className="relative h-72 w-full bg-brand-blue rounded-3xl border-b-[8px] border-brand-blue-shade flex items-center justify-center overflow-hidden shadow-lg">
      
      {/* 背景装饰 */}
      <motion.div 
        animate={{ x: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-12 w-24 h-12 bg-white/20 rounded-full blur-xl z-0" 
      />
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-brand-blue-shade/20 to-transparent z-0" />

      {/* 角色容器 */}
      <div className="flex items-end gap-12 md:gap-20 translate-y-6 relative z-20">
        
        {/* 🐶 左边：辰哥 */}
        <motion.div
           key="chenge-avatar"
           initial={{ y: 100, opacity: 0, scale: 0.5 }}
           animate={{ y: 0, opacity: 1, scale: 1 }}
           transition={{ type: "spring", stiffness: 300, damping: 15 }}
           whileHover={{ scale: 1.1, rotate: -5 }} 
           whileTap={{ scale: 0.8 }}              
           className="relative z-20 flex flex-col items-center cursor-pointer group select-none"
        >
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
            className="mb-4 bg-white px-4 py-2 rounded-2xl rounded-bl-none border-b-4 border-gray-200 shadow-sm"
          >
             <span className="text-xs font-black text-ink">汪! 想你了 🦴</span>
          </motion.div>
          
          <div className="filter drop-shadow-xl pointer-events-none">
             <Avatar type="chenge" size={120} />
          </div>
        </motion.div>

        {/* 🐱 右边：大宝 */}
        <motion.div
           key="dabao-avatar"
           initial={{ y: 100, opacity: 0, scale: 0.5 }}
           animate={{ y: 0, opacity: 1, scale: 1 }}
           transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
           whileHover={{ scale: 1.1, rotate: 5 }}  
           whileTap={{ scale: 0.8 }}               
           className="relative z-20 flex flex-col items-center cursor-pointer group select-none"
        >
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: "spring" }}
            className="mb-4 bg-white px-4 py-2 rounded-2xl rounded-br-none border-b-4 border-gray-200 shadow-sm"
          >
             <span className="text-xs font-black text-ink">带好吃的没? 🐟</span>
          </motion.div>

          <div className="filter drop-shadow-xl pointer-events-none">
             <Avatar type="dabao" size={120} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}