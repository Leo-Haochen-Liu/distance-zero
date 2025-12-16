"use client";

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';

// --- 临时测试用的子组件 ---
const DashboardView = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">我们在一起了</h2>
    <p className="text-slate-600">这里将显示在一起的计时器...</p>
  </div>
);

const CapsulesView = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">时间胶囊</h2>
    <p className="text-slate-600">这里将显示胶囊列表...</p>
  </div>
);

const BucketListView = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold text-slate-800 mb-4">心愿单</h2>
    <p className="text-slate-600">这里将显示愿望清单...</p>
  </div>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const mockPoints = 1250; // 模拟积分

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'capsules': return <CapsulesView />;
      case 'bucket-list': return <BucketListView />;
      default: return <DashboardView />;
    }
  };

  return (
    <AppShell 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      pointsBalance={mockPoints}
    >
      {renderContent()}
    </AppShell>
  );
}