// 🔴 改动点：这里引用 'lunar-typescript'，而不是 'lunar-javascript'
import { Solar, Lunar } from "lunar-typescript";

interface BirthdayConfig {
  type: "solar" | "lunar";
  date: string; 
  name: string;
}

// ... 下面的代码逻辑完全不用动，两个库的用法是一模一样的 ...

const getConstellation = (month: number, day: number) => {
  const s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
  const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2) + "座";
};

const getZodiac = (year: number) => {
  const zodiacs = ["猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊"];
  return zodiacs[year % 12] + "年"; 
};

export const calculateBirthdayInfo = (config: BirthdayConfig) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  let nextBirthday: Date;
  let constellation = "";
  let chineseZodiac = "";
  let age = 0;

  if (config.type === "solar") {
    // --- 阳历逻辑 ---
    const birthDate = new Date(config.date);
    chineseZodiac = getZodiac(birthDate.getFullYear());
    constellation = getConstellation(birthDate.getMonth() + 1, birthDate.getDate());
    age = currentYear - birthDate.getFullYear();

    const thisYearBday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    if (now > thisYearBday) {
      nextBirthday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
      age++; 
    } else {
      nextBirthday = thisYearBday;
    }
  } else {
    // --- 农历逻辑 ---
    const [lYear, lMonth, lDay] = config.date.split("-").map(Number);
    
    // 1. 获取出生信息
    const lunarBirth = Lunar.fromYmd(lYear, lMonth, lDay);
    const solarBirth = lunarBirth.getSolar();
    chineseZodiac = lunarBirth.getYearShengXiao(); 
    constellation = solarBirth.getXingZuo() + "座"; 
    age = currentYear - lYear;

    // 2. 计算今年农历生日的阳历日期
    let nextLunarBday = Lunar.fromYmd(currentYear, lMonth, lDay);
    let nextSolarBday = nextLunarBday.getSolar();
    // 注意：getYear(), getMonth(), getDay() 在不同库里返回值可能不同，
    // 这里 lunar-typescript 的 getMonth() 返回的是 1-12，而 JS Date 需要 0-11
    let nextSolarDate = new Date(nextSolarBday.getYear(), nextSolarBday.getMonth() - 1, nextSolarBday.getDay());

    // 如果今年的已经过了，算明年的
    if (now.getTime() > nextSolarDate.getTime()) {
      nextLunarBday = Lunar.fromYmd(currentYear + 1, lMonth, lDay);
      nextSolarBday = nextLunarBday.getSolar();
      nextSolarDate = new Date(nextSolarBday.getYear(), nextSolarBday.getMonth() - 1, nextSolarBday.getDay());
      age++;
    }
    nextBirthday = nextSolarDate;
  }

  // 避免倒计时出现 -0 的情况
  const diffTime = nextBirthday.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    constellation,
    chineseZodiac,
    daysLeft: daysLeft < 0 ? 0 : daysLeft, // 简单兜底
    age,
    // 优化日期显示格式
    nextDateStr: `${nextBirthday.getFullYear()}.${nextBirthday.getMonth() + 1}.${nextBirthday.getDate()}`
  };
};