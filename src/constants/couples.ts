// src/constants/couples.ts

export const COUPLE_DATA = {
  chenge: {
    id: 'chenge',
    name: '辰哥',
    avatarSvg: '/avatar_chenge.svg',
    avatarPng: '/chenge.png',
    birthdayType: 'solar', // 阳历
    birthdayDate: '2000-04-02', 
    color: 'text-brand-blue'
  },
  dabao: {
    id: 'dabao',
    name: '大宝',
    avatarSvg: '/avatar_dabao.svg',
    avatarPng: '/dabao.png',
    birthdayType: 'lunar', // 农历
    birthdayDate: '2001-01-21',
    color: 'text-brand-pink'
  }
} as const;

export type ProfileKey = keyof typeof COUPLE_DATA;