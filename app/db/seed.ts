import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { touristSpots } from './schema';

const sqlite = new Database('./database.sqlite');
const db = drizzle(sqlite);

const regionalSpotsData = [
  // 栃木県 - 日光エリア
  { name: '東照宮', description: '徳川家康が眠る霊廟として有名な神社', category: 'cultural', prefecture: '栃木県', region: '日光', latitude: 36.7580, longitude: 139.5994, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'both', popularity: 10 },
  { name: '華厳の滝', description: '日本三大名瀑の一つ。中禅寺湖からの落差は97m', category: 'nature', prefecture: '栃木県', region: '日光', latitude: 36.7394, longitude: 139.5069, duration: 45, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '中禅寺湖', description: '男体山の噴火でできた湖。遊覧船やボートが楽しめる', category: 'nature', prefecture: '栃木県', region: '日光', latitude: 36.7286, longitude: 139.4839, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '輪王寺', description: '日光山の中心的な寺院。三仏堂は圧巻の大きさ', category: 'cultural', prefecture: '栃木県', region: '日光', latitude: 36.7563, longitude: 139.5975, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'both', popularity: 8 },
  { name: 'いろは坂', description: '48のカーブがある有名なドライブコース。紅葉の名所', category: 'nature', prefecture: '栃木県', region: '日光', latitude: 36.7450, longitude: 139.4950, duration: 30, ageGroup: 'adult', season: 'autumn', weatherPreference: 'outdoor', popularity: 7 },

  // 栃木県 - 那須エリア
  { name: '那須温泉', description: '皇室御用達の高原リゾート温泉', category: 'hot_springs', prefecture: '栃木県', region: '那須', latitude: 37.1167, longitude: 139.9667, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 7 },
  { name: '那須高原', description: '美しい高原リゾート。避暑地として人気', category: 'nature', prefecture: '栃木県', region: '那須', latitude: 37.0500, longitude: 139.9833, duration: 180, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 6 },
  { name: '那須サファリパーク', description: '野生動物を間近で見られるサファリパーク', category: 'cultural', prefecture: '栃木県', region: '那須', latitude: 37.0167, longitude: 139.9500, duration: 180, ageGroup: 'child', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '殺生石', description: '九尾の狐伝説で有名な史跡', category: 'cultural', prefecture: '栃木県', region: '那須', latitude: 37.1333, longitude: 139.9667, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 5 },
  { name: '那須岳', description: '関東の名峰。登山とロープウェイが楽しめる', category: 'nature', prefecture: '栃木県', region: '那須', latitude: 37.1333, longitude: 139.9667, duration: 240, ageGroup: 'adult', season: 'summer', weatherPreference: 'outdoor', popularity: 6 },
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