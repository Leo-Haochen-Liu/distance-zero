"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Plus } from "lucide-react";

// 定义任务结构
interface Task {
  id: string;
  content: string;
  completed: boolean;
  assignedTo: 'chenge' | 'dabao' | 'both';
}

export default function TaskBoard() {
  // 模拟初始数据 (后续我们会接到数据库)
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', content: '早起喝一杯水', completed: false, assignedTo: 'both' },
    { id: '2', content: '分享今天的午餐照片', completed: false, assignedTo: 'both' },
    { id: '3', content: '睡前说晚安', completed: false, assignedTo: 'both' },
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-lg text-gray-800">今日挑战</h3>
        <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
          <Plus size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout // 启用布局动画，当列表变化时平滑移动
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => toggleTask(task.id)}
            className={`
              relative flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300
              ${task.completed ? 'bg-brand-blue/5 border-transparent' : 'bg-white border border-gray-100 hover:border-brand-blue/30'}
            `}
          >
            {/* 选中状态的动画图标 */}
            <div className="relative flex-shrink-0">
              <AnimatePresence mode="wait">
                {task.completed ? (
                  <motion.div
                    key="checked"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <CheckCircle2 className="text-brand-blue w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="unchecked"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Circle className="text-gray-300 w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-grow">
              <span className={`text-sm font-bold transition-colors ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {task.content}
              </span>
            </div>

            {/* 完成时的粒子特效占位 (后续添加) */}
            {task.completed && (
              <motion.div 
                layoutId={`glow-${task.id}`}
                className="absolute inset-0 rounded-xl bg-brand-blue/5 pointer-events-none" 
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}