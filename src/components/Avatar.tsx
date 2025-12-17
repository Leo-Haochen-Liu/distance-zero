import React from 'react';
import Image from 'next/image';

// 定义角色类型
type CharacterType = 'chenge' | 'dabao';

interface AvatarProps {
  type: CharacterType;
  size?: number;
  className?: string;
}

export default function Avatar({ type, size = 64, className = "" }: AvatarProps) {
  // ✅ 这里的路径必须和 public 文件夹里的文件名完全一致
  const imageSrc = type === 'chenge' ? '/avatar_chenge.svg' : '/dabao_2.png';
  
  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: size, height: size }}
    >
      <Image
        src={imageSrc}
        alt={type} // 图片加载失败时显示的文字
        fill // 让图片自动填满这个 div
        sizes="(max-width: 768px) 100vw, 50vw" // 性能优化
        className="object-contain" // 保持图片比例，不拉伸
        priority // 优先加载，防止闪烁
      />
    </div>
  );
}