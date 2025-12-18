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
    // 【区域 1：总宽度控制】
    <div className={`
      fixed bottom-6 left-1/2 -translate-x-1/2 z-50
      
      /* 👇 修改这个数字：控制导航栏的总长短 */
      w-[90%] md:w-[300px] 
    `}>
      
      {/* 【区域 2：内边距控制】 */}
      <div className={`
        bg-white/85 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full 
        flex items-center justify-between
        
        /* 👇 修改这个数字：控制白色边框的厚度 (留白) */
        /* 比如改成 p-[4px] 会变细，p-[10px] 会变粗 */
        p-[6px]
      `}>
        
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                relative flex items-center justify-center cursor-pointer group
                
                /* 【区域 3：按钮大小控制】 */
                /* 👇 修改这俩数字：控制每个图标按钮的占地面积 */
                /* 建议保持正方形，数值越大，按钮越胖 */
                w-[60px] h-[60px]
              `}
            >
              {/* 激活背景 */}
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-rose-50 rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <div className={`relative transition-all duration-300 ${isActive ? '-translate-y-0.5' : ''}`}>
                <Icon
                  /* 【区域 4：图标本身大小】 */
                  /* 👇 如果觉得图标太大或太小，改这个数字 */
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-colors duration-300 ${
                    isActive 
                      ? "text-gray-800" 
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                
                {/* 底部小圆点 */}
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full"
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