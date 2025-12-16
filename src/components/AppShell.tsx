"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Mail, 
  ListTodo, 
  Menu, 
  X, 
  Heart 
} from 'lucide-react';

// --- Types ---
type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

// --- Props ---
interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  pointsBalance: number;
}

// --- Animation Config ---
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
} as const;

const AppShell: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  pointsBalance 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 导航配置 (中文化) ---
  const navItems: NavItem[] = [
    { id: 'dashboard', label: '主页', icon: <LayoutDashboard size={20} /> },
    { id: 'capsules', label: '时光胶囊', icon: <Mail size={20} /> },
    { id: 'bucket-list', label: '愿望清单', icon: <ListTodo size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* --- Desktop Sidebar (左侧侧边栏) --- */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6 shadow-sm z-20">
        <div className="flex items-center gap-2 mb-10 text-[#ECC5C0]">
          <Heart fill="#ECC5C0" size={28} />
          {/* 这里是项目名称，如果想改中文在这里改 */}
          <span className="text-xl font-bold text-slate-800 tracking-tight">浪浪&辰哥的充电站</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                activeTab === item.id 
                  ? 'bg-[#ECC5C0]/20 text-slate-900 shadow-sm ring-1 ring-[#ECC5C0]' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <span className={activeTab === item.id ? 'text-[#e09f98]' : ''}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Balance Footer (底部积分) */}
        <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                <span>恋爱积分</span>
                <span className="bg-[#ECC5C0]/30 px-2 py-1 rounded-md text-slate-800">
                    {pointsBalance} 分
                </span>
            </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Mobile Header (手机端顶部) */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-30">
          <div className="flex items-center gap-2">
             <Heart fill="#ECC5C0" size={24} className="text-[#ECC5C0]" />
             <span className="font-bold text-lg">浪浪&辰哥的充电站</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold bg-[#ECC5C0]/30 px-2 py-1 rounded text-slate-700">
                {pointsBalance} 分
            </span>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Nav Overlay (手机端菜单) */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white border-b border-slate-200 absolute top-16 left-0 w-full z-20 shadow-lg"
                >
                    <nav className="flex flex-col p-4 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onTabChange(item.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                                    activeTab === item.id 
                                    ? 'bg-[#ECC5C0]/20 text-slate-900' 
                                    : 'text-slate-500'
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="h-full max-w-5xl mx-auto"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>

      </main>
    </div>
  );
};

export default AppShell;