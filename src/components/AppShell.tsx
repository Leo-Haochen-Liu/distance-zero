"use client";

import React from 'react';
import { ListTodo, Heart, Home, Settings } from 'lucide-react'; // 引入图标
import Avatar from './Avatar'; // 引入你的头像组件

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: LayoutProps) {
  // 定义导航菜单项
  const navItems = [
    { id: 'dashboard', label: '首页', icon: <Home size={20} /> },
    { id: 'bucket-list', label: '愿望清单', icon: <ListTodo size={20} /> },
    { id: 'settings', label: '设置', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* --- 左侧侧边栏 (Sidebar) --- */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6 shadow-sm z-20">
        
        {/* 1. Logo / 标题区域 */}
        <div className="flex items-center gap-2 mb-10 text-[#ECC5C0]">
          <Heart fill="#ECC5C0" size={28} />
          <span className="text-xl font-bold text-slate-800 tracking-tight">浪浪&辰哥的充电站</span>
        </div>

        {/* 2. 导航菜单 */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-bold hover:bg-slate-50 hover:text-brand-pink transition-all group"
            >
              <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* 3. 底部用户信息卡片 (这里就是你要改的头像) */}
        <div className="mt-auto p-3 rounded-2xl border-2 border-gray-100 bg-white hover:border-brand-pink/30 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center border-2 border-brand-pink/20 overflow-hidden p-1">
               {/* ✅ 这里的 type 必须对应 Avatar.tsx 里定义的 'dabao' 或 'chenge' */}
               <Avatar type="dabao" size={28} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase">Current User</span>
              <span className="text-sm font-black text-ink group-hover:text-brand-pink transition-colors">浪浪</span>
            </div>
          </div>
        </div>

      </aside>

      {/* --- 右侧主要内容区 (Main Content) --- */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-6 md:p-10 max-w-5xl mx-auto pb-32">
          {children}
        </div>
      </main>
      
    </div>
  );
}