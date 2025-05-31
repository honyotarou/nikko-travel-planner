import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { touristSpots } from './schema';

const sqlite = new Database('./database.sqlite');
const db = drizzle(sqlite);

const nikkoSpotsData = [
  {
    name: '東照宮',
    description: '徳川家康が眠る霊廟として有名な神社。豪華絢爛な装飾が見どころ。',
    category: 'cultural',
    latitude: 36.7580,
    longitude: 139.5994,
    duration: 90, // 1.5 hours
    ageGroup: 'all',
    season: 'all',
    weatherPreference: 'both',
    popularity: 10,
  },
  {
    name: '輪王寺',
    description: '日光山の中心的な寺院。三仏堂は圧巻の大きさ。',
    category: 'cultural',
    latitude: 36.7563,
    longitude: 139.5975,
    duration: 60,
    ageGroup: 'all',
    season: 'all',
    weatherPreference: 'both',
    popularity: 8,
  },
  {
    name: '二荒山神社',
    description: '縁結びの神様として親しまれる神社。',
    category: 'cultural',
    latitude: 36.7575,
    longitude: 139.6021,
    duration: 30,
    ageGroup: 'all',
    season: 'all',
    weatherPreference: 'both',
    popularity: 7,
  },
  {
    name: '華厳の滝',
    description: '日本三大名瀑の一つ。中禅寺湖からの落差は97m。',
    category: 'nature',
    latitude: 36.7394,
    longitude: 139.5069,
    duration: 45,
    ageGroup: 'all',
    season: 'all',
    weatherPreference: 'outdoor',
    popularity: 9,
  },
  {
    name: '中禅寺湖',
    description: '男体山の噴火でできた湖。遊覧船やボートが楽しめる。',
    category: 'nature',
    latitude: 36.7286,
    longitude: 139.4839,
    duration: 120,
    ageGroup: 'all',
    season: 'all',
    weatherPreference: 'outdoor',
    popularity: 8,
  },
  {
    name: 'いろは坂',
    description: '48のカーブがある有名なドライブコース。紅葉の名所。',
    category: 'nature',
    latitude: 36.7450,
    longitude: 139.4950,
    duration: 30,
    ageGroup: 'adult',
    season: 'autumn',
    weatherPreference: 'outdoor',
    popularity: 7,
  },
  {
    name: '湯波の里',
    description: '日光名物の湯波料理が楽しめる。温泉も併設。',
    category: 'hot_springs',
    latitude: 36.7500,
    longitude: 139.6000,
    duration: 150,
    ageGroup: 'all',
    season: 'all',
    weatherPreference: 'indoor',
    popularity: 6,
  },
  {
    name: '奥日光温泉',
    description: '秘湯として人気の温泉地。宿泊がおすすめ。',
    category: 'hot_springs',
    latitude: 36.7200,
    longitude: 139.4700,
    duration: 480, // 8 hours (overnight stay)
    ageGroup: 'adult',
    season: 'all',
    weatherPreference: 'indoor',
    popularity: 5,
  },
  {
    name: '竜頭の滝',
    description: '滝が岩で二股に分かれる様子が竜の頭に似ていることから命名。',
    category: 'nature',
    latitude: 36.7250,
    longitude: 139.4900,
    duration: 30,
    ageGroup: 'all',
    season: 'all',
    weatherPreference: 'outdoor',
    popularity: 6,
  },
  {
    name: '戦場ヶ原',
    description: '高層湿原の自然散策路。野鳥観察や花々が楽しめる。',
    category: 'nature',
    latitude: 36.7100,
    longitude: 139.4600,
    duration: 90,
    ageGroup: 'adult',
    season: 'summer',
    weatherPreference: 'outdoor',
    popularity: 5,
  },
];

export async function seedDatabase() {
  try {
    // Insert tourist spots data
    await db.insert(touristSpots).values(nikkoSpotsData);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    sqlite.close();
  }
}

// Run if this file is executed directly
seedDatabase();