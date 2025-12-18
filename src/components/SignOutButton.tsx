'use client';

// 1. 引入刚才写好的 client 工具
import { createClient } from '@/utils/supabase/client'; 
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  // 2. 初始化 supabase
  const supabase = createClient();

  const handleSignOut = async () => {
    // 3. 执行登出
    await supabase.auth.signOut();
    router.refresh(); 
    router.push('/login'); 
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
    >
      退出登录
    </button>
  );
}