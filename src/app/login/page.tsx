'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // 引用刚才写的客户端连接器
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage('❌ 注册失败: ' + error.message);
    } else {
      setMessage('✅ 注册成功！已自动登录，正在跳转...');
      setTimeout(() => {
        router.push('/'); 
        router.refresh();
      }, 1500);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage('❌ 登录失败: ' + error.message);
    } else {
      setMessage('🎉 欢迎回来！正在跳转...');
      router.push('/');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🔐</div>
          <h1 className="text-xl font-black text-gray-800">充电站通行证</h1>
          <p className="text-xs text-gray-400 mt-1">专属二人的秘密空间</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="账号 (随便填个好记的邮箱)"
            className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="密码 (悄悄话)"
            className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {message && (
            <div className="text-center text-sm font-bold p-2 bg-gray-50 rounded-lg">
              {message}
            </div>
          )}
          
          <div className="flex gap-3 mt-2">
             <button 
                onClick={handleLogin}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-blue-200 shadow-lg disabled:opacity-50"
             >
               登录
             </button>
             <button 
                onClick={handleRegister}
                disabled={loading}
                className="flex-1 bg-white text-blue-600 border border-blue-200 p-3 rounded-xl font-bold hover:bg-blue-50 transition disabled:opacity-50"
             >
               新用户注册
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}