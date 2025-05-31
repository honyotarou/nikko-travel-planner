import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { touristSpots } from './schema';
import path from 'path';

const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), 'database.sqlite')
  : './database.sqlite';

console.log(`Seeding database at: ${dbPath}`);

const sqlite = new Database(dbPath);
const db = drizzle(sqlite);

const regionalSpotsData = [
  // 栃木県 - 日光エリア
  { 
    name: '東照宮', 
    description: '徳川家康が眠る霊廟として有名な神社', 
    category: 'cultural', 
    prefecture: '栃木県', 
    region: '日光', 
    latitude: 36.7580, 
    longitude: 139.5994, 
    duration: 90, 
    ageGroup: 'all', 
    season: 'all', 
    weatherPreference: 'both', 
    popularity: 10,
    admissionFee: '大人1,300円、小中学生450円',
    parkingInfo: '有料駐車場あり（200台）1日600円',
    accessInfo: 'JR日光駅・東武日光駅からバス10分「神橋」下車徒歩8分',
    openingHours: '4月-10月：8:00-17:00、11月-3月：8:00-16:00'
  },
  { 
    name: '華厳の滝', 
    description: '日本三大名瀑の一つ。中禅寺湖からの落差は97m', 
    category: 'nature', 
    prefecture: '栃木県', 
    region: '日光', 
    latitude: 36.7394, 
    longitude: 139.5069, 
    duration: 45, 
    ageGroup: 'all', 
    season: 'all', 
    weatherPreference: 'outdoor', 
    popularity: 9,
    admissionFee: 'エレベーター利用：大人570円、小学生340円',
    parkingInfo: '無料駐車場あり（約240台）',
    accessInfo: 'JR日光駅・東武日光駅からバス45分「中禅寺温泉」下車徒歩5分',
    openingHours: '3月-11月：8:00-17:00、12月-2月：9:00-16:30'
  },
  { 
    name: '中禅寺湖', 
    description: '男体山の噴火でできた湖。遊覧船やボートが楽しめる', 
    category: 'nature', 
    prefecture: '栃木県', 
    region: '日光', 
    latitude: 36.7286, 
    longitude: 139.4839, 
    duration: 120, 
    ageGroup: 'all', 
    season: 'all', 
    weatherPreference: 'outdoor', 
    popularity: 8,
    admissionFee: '遊覧船：大人1,400円、小学生700円',
    parkingInfo: '湖畔に複数の無料駐車場あり',
    accessInfo: 'JR日光駅・東武日光駅からバス45分「中禅寺温泉」下車',
    openingHours: '遊覧船：9:00-16:00（季節により変動）'
  },
  { 
    name: '輪王寺', 
    description: '日光山の中心的な寺院。三仏堂は圧巻の大きさ', 
    category: 'cultural', 
    prefecture: '栃木県', 
    region: '日光', 
    latitude: 36.7563, 
    longitude: 139.5975, 
    duration: 60, 
    ageGroup: 'all', 
    season: 'all', 
    weatherPreference: 'both', 
    popularity: 8,
    admissionFee: '三仏堂：大人400円、小中学生200円',
    parkingInfo: '有料駐車場あり（神橋駐車場利用）',
    accessInfo: 'JR日光駅・東武日光駅からバス7分「神橋」下車徒歩5分',
    openingHours: '4月-10月：8:00-17:00、11月-3月：8:00-16:00'
  },
  { 
    name: 'いろは坂', 
    description: '48のカーブがある有名なドライブコース。紅葉の名所', 
    category: 'nature', 
    prefecture: '栃木県', 
    region: '日光', 
    latitude: 36.7450, 
    longitude: 139.4950, 
    duration: 30, 
    ageGroup: 'adult', 
    season: 'autumn', 
    weatherPreference: 'outdoor', 
    popularity: 7,
    admissionFee: '無料',
    parkingInfo: '明智平展望台に駐車場あり（第1・第2駐車場）',
    accessInfo: '車でのアクセスが一般的。JR日光駅から車で約30分',
    openingHours: '24時間通行可能（ロープウェイは9:00-16:30）'
  },

  // 栃木県 - 那須エリア
  { 
    name: '那須温泉', 
    description: '皇室御用達の高原リゾート温泉', 
    category: 'hot_springs', 
    prefecture: '栃木県', 
    region: '那須', 
    latitude: 37.1167, 
    longitude: 139.9667, 
    duration: 240, 
    ageGroup: 'all', 
    season: 'all', 
    weatherPreference: 'indoor', 
    popularity: 7,
    admissionFee: '日帰り入浴：500円-1,500円（施設により異なる）',
    parkingInfo: '各温泉施設に駐車場あり（多くは無料）',
    accessInfo: 'JR那須塩原駅からバス65分「那須湯本」下車',
    openingHours: '施設により異なる（多くは10:00-21:00）'
  },
  { 
    name: '那須高原', 
    description: '美しい高原リゾート。避暑地として人気', 
    category: 'nature', 
    prefecture: '栃木県', 
    region: '那須', 
    latitude: 37.0500, 
    longitude: 139.9833, 
    duration: 180, 
    ageGroup: 'all', 
    season: 'summer', 
    weatherPreference: 'outdoor', 
    popularity: 6,
    admissionFee: '散策無料（施設利用は別途）',
    parkingInfo: '各観光施設に駐車場あり',
    accessInfo: 'JR那須塩原駅からバス50分「那須高原」下車',
    openingHours: '24時間散策可能（施設は営業時間あり）'
  },
  { 
    name: '那須サファリパーク', 
    description: '野生動物を間近で見られるサファリパーク', 
    category: 'cultural', 
    prefecture: '栃木県', 
    region: '那須', 
    latitude: 37.0167, 
    longitude: 139.9500, 
    duration: 180, 
    ageGroup: 'child', 
    season: 'all', 
    weatherPreference: 'outdoor', 
    popularity: 6,
    admissionFee: '大人2,800円、小人（3歳-小学生）1,900円',
    parkingInfo: '無料駐車場完備（1,000台）',
    accessInfo: 'JR那須塩原駅から車で約50分',
    openingHours: '8:00-17:00（季節により変動）'
  },
  { 
    name: '殺生石', 
    description: '九尾の狐伝説で有名な史跡', 
    category: 'cultural', 
    prefecture: '栃木県', 
    region: '那須', 
    latitude: 37.1333, 
    longitude: 139.9667, 
    duration: 60, 
    ageGroup: 'all', 
    season: 'all', 
    weatherPreference: 'outdoor', 
    popularity: 5,
    admissionFee: '無料',
    parkingInfo: '無料駐車場あり（約50台）',
    accessInfo: 'JR那須塩原駅からバス70分「那須湯本」下車徒歩10分',
    openingHours: '24時間見学可能'
  },
  { 
    name: '那須岳', 
    description: '関東の名峰。登山とロープウェイが楽しめる', 
    category: 'nature', 
    prefecture: '栃木県', 
    region: '那須', 
    latitude: 37.1333, 
    longitude: 139.9667, 
    duration: 240, 
    ageGroup: 'adult', 
    season: 'summer', 
    weatherPreference: 'outdoor', 
    popularity: 6,
    admissionFee: 'ロープウェイ：大人往復1,800円、子供往復900円',
    parkingInfo: 'ロープウェイ駅に無料駐車場あり（200台）',
    accessInfo: 'JR那須塩原駅からバス65分「那須ロープウェイ」下車',
    openingHours: 'ロープウェイ：8:30-16:30（季節により変動）'
  },
];

export async function seedDatabase() {
  try {
    // Insert tourist spots data
    await db.insert(touristSpots).values(regionalSpotsData);
    console.log('Database seeded successfully with Tochigi Prefecture tourist spots!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    sqlite.close();
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}