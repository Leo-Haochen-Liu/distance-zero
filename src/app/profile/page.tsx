import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import { createClient } from '@/utils/supabase/server';

export default async function ProfilePage() {
  const supabase = await createClient();

  // 1. 获取当前用户
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // 2. 获取详细档案 (包含积分)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  // 3. 获取最近的积分账单 (PRD 需求)
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  // ---------------------------------------------------------
  // 🔧 配置区：请在这里填入你们的真实邮箱
  // ---------------------------------------------------------
  const MY_EMAIL = 'liuhc2000@gmail.com'; // 你的邮箱
  const GF_EMAIL = 'dabao@example.com';   // 大宝的邮箱 (请替换)

  const isMe = user.email === MY_EMAIL;
  const isDabao = user.email === GF_EMAIL;

  let displayName = '神秘人';
  let welcomeText = '欢迎来到 Distance-Zero';
  let avatar = '👤';

  if (isMe) {
    displayName = '辰哥';
    welcomeText = '👨‍💻 辛苦了，今天的代码写得怎么样？';
    avatar = '🦖'; // 可以换成你的头像图片链接
  } else if (isDabao) {
    displayName = '大宝儿';
    welcomeText = '🐷 欢迎小宝贝，想你啦！';
    avatar = '🐰';
  }
  // ---------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* 1. 头部身份卡片 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-6xl mb-4">{avatar}</div>
          <h1 className="text-2xl font-bold text-gray-800">{displayName}</h1>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          <p className="text-blue-600 font-medium mt-4 bg-blue-50 py-2 px-4 rounded-full inline-block text-sm">
            {welcomeText}
          </p>
        </div>

        {/* 2. 恋爱银行卡 (PRD 核心功能) */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">💰</div>
          <p className="text-pink-100 text-sm font-medium tracking-wider">LOVE BANK BALANCE</p>
          <div className="mt-2 flex items-baseline">
            <span className="text-5xl font-bold">{profile?.points_balance || 0}</span>
            <span className="ml-2 text-xl opacity-90">积分</span>
          </div>
          <div className="mt-6 flex gap-3">
             <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg text-sm font-medium transition">
               兑换礼物
             </button>
             <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg text-sm font-medium transition">
               查看规则
             </button>
          </div>
        </div>

        {/* 3. 最近账单 (Transaction Log) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700">最近账单</h3>
            <span className="text-xs text-gray-400">最后5笔</span>
          </div>
          <div className="divide-y divide-gray-50">
            {transactions && transactions.length > 0 ? (
              transactions.map((t) => (
                <div key={t.id} className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(t.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`font-bold ${t.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-400 text-sm">
                还没有积分记录，快去打卡吧！
              </div>
            )}
          </div>
        </div>

        {/* 4. 退出按钮 */}
        <div className="text-center pt-4">
          <SignOutButton />
        </div>

      </div>
    </div>
  );
}