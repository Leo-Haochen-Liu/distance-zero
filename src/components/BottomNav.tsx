"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Pill, Gift, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "首页", path: "/", icon: Home },
    { name: "胶囊", path: "/capsules", icon: Pill },
    { name: "愿望", path: "/wishlist", icon: Gift },
    { name: "我的", path: "/profile", icon: User },
  ];

  return (
    // 外层容器定位
    // fixed bottom-6: 悬浮在底部上方一点点
    // left-1/2 -translate-x-1/2: 绝对居中
    // w-[90%] md:w-[500px]: 手机上占90%宽，PC上最大500px，保持优雅
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[400px] z-50">
      
      {/* 内层样式：
         1. backdrop-blur-xl: 强力毛玻璃
         2. bg-white/80: 半透明白底
         3. shadow-2xl: 深阴影
         4. shadow-black/10: 专门加了一层浅黑色光晕，增加立体感
         5. border-white/50: 增加边缘质感
      */}
      <div className="bg-white/85 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full px-4 py-2 flex items-center justify-between">
        
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="relative flex-1 flex flex-col items-center justify-center py-2 group cursor-pointer"
            >
              {/* 激活背景：淡蓝淡粉渐变 */}
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-rose-50 rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <div className={`relative p-2 rounded-full transition-all duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                <Icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-colors duration-300 ${
                    isActive 
                      ? "text-gray-800" 
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                
                {/* 底部小圆点指示器 */}
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}