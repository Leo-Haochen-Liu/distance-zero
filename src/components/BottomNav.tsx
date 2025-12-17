// src/components/BottomNav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "首页", href: "/", icon: "🏠" },
    { label: "胶囊", href: "/capsules", icon: "💊" }, // 下一步我们要做的功能
    { label: "愿望", href: "/wishlist", icon: "🎁" },
    { label: "我的", href: "/profile", icon: "👤" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 pb-8 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-brand-blue" : "text-gray-400"
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}