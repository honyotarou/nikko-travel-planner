import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { touristSpots } from './schema';

const sqlite = new Database('./database.sqlite');
const db = drizzle(sqlite);

const nationalSpotsData = [
  // 北海道
  { name: '札幌雪まつり会場', description: '世界的に有名な雪と氷の祭典会場', category: 'cultural', prefecture: '北海道', latitude: 43.0642, longitude: 141.3469, duration: 120, ageGroup: 'all', season: 'winter', weatherPreference: 'outdoor', popularity: 10 },
  { name: '函館山', description: '日本三大夜景の一つ。100万ドルの夜景', category: 'nature', prefecture: '北海道', latitude: 41.7634, longitude: 140.7011, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '洞爺湖', description: 'カルデラ湖と温泉で有名なリゾート地', category: 'nature', prefecture: '北海道', latitude: 42.5964, longitude: 140.8469, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '登別温泉', description: '北海道を代表する温泉地。地獄谷が有名', category: 'hot_springs', prefecture: '北海道', latitude: 42.4913, longitude: 141.1543, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'both', popularity: 8 },
  { name: '小樽運河', description: '歴史的な運河と石造倉庫群が美しい', category: 'cultural', prefecture: '北海道', latitude: 43.1907, longitude: 140.9947, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },

  // 青森県
  { name: '弘前城', description: '現存12天守の一つ。桜の名所として有名', category: 'cultural', prefecture: '青森県', latitude: 40.6062, longitude: 140.4642, duration: 120, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 9 },
  { name: '奥入瀬渓流', description: '十和田湖から流れる美しい渓流', category: 'nature', prefecture: '青森県', latitude: 40.5500, longitude: 140.9500, duration: 180, ageGroup: 'adult', season: 'autumn', weatherPreference: 'outdoor', popularity: 8 },
  { name: '青森ねぶた祭り会場', description: '迫力ある大型ねぶたの祭典', category: 'cultural', prefecture: '青森県', latitude: 40.8244, longitude: 140.7400, duration: 150, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 9 },
  { name: '十和田湖', description: '二重カルデラ湖の神秘的な美しさ', category: 'nature', prefecture: '青森県', latitude: 40.4667, longitude: 140.8833, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '酸ヶ湯温泉', description: '秘湯として知られる混浴の千人風呂', category: 'hot_springs', prefecture: '青森県', latitude: 40.6500, longitude: 140.8667, duration: 180, ageGroup: 'adult', season: 'all', weatherPreference: 'indoor', popularity: 6 },

  // 岩手県
  { name: '中尊寺金色堂', description: '平泉の世界遺産。金に彩られた美しい堂', category: 'cultural', prefecture: '岩手県', latitude: 39.0028, longitude: 141.1000, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 9 },
  { name: '龍泉洞', description: '日本三大鍾乳洞の一つ。地底湖が神秘的', category: 'nature', prefecture: '岩手県', latitude: 39.8500, longitude: 141.7833, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 7 },
  { name: '毛越寺', description: '平泉の浄土庭園で有名な寺院', category: 'cultural', prefecture: '岩手県', latitude: 39.0014, longitude: 141.0992, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '花巻温泉', description: '宮沢賢治ゆかりの温泉郷', category: 'hot_springs', prefecture: '岩手県', latitude: 39.4167, longitude: 141.0500, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '浄土ヶ浜', description: '白い岩肌と青い海のコントラストが美しい', category: 'nature', prefecture: '岩手県', latitude: 39.5500, longitude: 141.9667, duration: 90, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 7 },

  // 宮城県
  { name: '仙台城跡', description: '伊達政宗の居城跡。青葉城とも呼ばれる', category: 'cultural', prefecture: '宮城県', latitude: 38.2550, longitude: 140.8433, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '松島', description: '日本三景の一つ。260余りの島々が美しい', category: 'nature', prefecture: '宮城県', latitude: 38.3733, longitude: 141.0667, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '秋保温泉', description: '古くから親しまれる名湯', category: 'hot_springs', prefecture: '宮城県', latitude: 38.2333, longitude: 140.7000, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '瑞巌寺', description: '伊達家の菩提寺。松島の名刹', category: 'cultural', prefecture: '宮城県', latitude: 38.3742, longitude: 141.0664, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '鳴子温泉', description: '東北屈指の温泉郷。紅葉も美しい', category: 'hot_springs', prefecture: '宮城県', latitude: 38.7333, longitude: 140.7333, duration: 300, ageGroup: 'all', season: 'autumn', weatherPreference: 'indoor', popularity: 7 },

  // 秋田県
  { name: '角館武家屋敷', description: '「みちのくの小京都」桜と武家屋敷が美しい', category: 'cultural', prefecture: '秋田県', latitude: 39.5947, longitude: 140.5558, duration: 120, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 8 },
  { name: '田沢湖', description: '日本で最も深い湖。瑠璃色の美しさ', category: 'nature', prefecture: '秋田県', latitude: 39.7167, longitude: 140.6667, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: 'なまはげ館', description: '男鹿のなまはげ文化を体験', category: 'cultural', prefecture: '秋田県', latitude: 39.9000, longitude: 139.8167, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '乳頭温泉郷', description: '秘湯として人気の7つの宿', category: 'hot_springs', prefecture: '秋田県', latitude: 39.7667, longitude: 140.7333, duration: 360, ageGroup: 'adult', season: 'all', weatherPreference: 'indoor', popularity: 8 },
  { name: '十和田湖・奥入瀬', description: '青森との県境にある美しい湖と渓流', category: 'nature', prefecture: '秋田県', latitude: 40.4667, longitude: 140.8833, duration: 180, ageGroup: 'all', season: 'autumn', weatherPreference: 'outdoor', popularity: 8 },

  // 山形県
  { name: '山寺（立石寺）', description: '松尾芭蕉ゆかりの山上の寺院', category: 'cultural', prefecture: '山形県', latitude: 38.3133, longitude: 140.4531, duration: 120, ageGroup: 'adult', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '蔵王温泉', description: '樹氷と強酸性の湯で有名', category: 'hot_springs', prefecture: '山形県', latitude: 38.1500, longitude: 140.4167, duration: 240, ageGroup: 'all', season: 'winter', weatherPreference: 'both', popularity: 8 },
  { name: '銀山温泉', description: '大正ロマンの街並みが美しい温泉街', category: 'hot_springs', prefecture: '山形県', latitude: 38.5167, longitude: 140.5167, duration: 180, ageGroup: 'all', season: 'winter', weatherPreference: 'outdoor', popularity: 9 },
  { name: '羽黒山五重塔', description: '国宝の美しい五重塔', category: 'cultural', prefecture: '山形県', latitude: 38.7167, longitude: 139.9833, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '最上川舟下り', description: '芭蕉の句で有名な川下り', category: 'nature', prefecture: '山形県', latitude: 38.7500, longitude: 140.3000, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },

  // 福島県
  { name: '会津若松城', description: '幕末の歴史で有名な鶴ヶ城', category: 'cultural', prefecture: '福島県', latitude: 37.4875, longitude: 139.9289, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '大内宿', description: '江戸時代の宿場町の面影を残す', category: 'cultural', prefecture: '福島県', latitude: 37.3167, longitude: 139.7833, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '猪苗代湖', description: '日本で4番目に大きい湖', category: 'nature', prefecture: '福島県', latitude: 37.5167, longitude: 140.1000, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '東山温泉', description: '会津の奥座敷として親しまれる', category: 'hot_springs', prefecture: '福島県', latitude: 37.4833, longitude: 139.9167, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: 'あぶくま洞', description: '8000万年の歳月が作り上げた鍾乳洞', category: 'nature', prefecture: '福島県', latitude: 37.1833, longitude: 140.8833, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },

  // 茨城県
  { name: 'ひたち海浜公園', description: 'ネモフィラとコキアで有名な絶景公園', category: 'nature', prefecture: '茨城県', latitude: 36.4044, longitude: 140.5886, duration: 180, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 9 },
  { name: '袋田の滝', description: '日本三大名瀑の一つ。四段の美しい滝', category: 'nature', prefecture: '茨城県', latitude: 36.7667, longitude: 140.3833, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '偕楽園', description: '日本三名園の一つ。梅の名所', category: 'cultural', prefecture: '茨城県', latitude: 36.3725, longitude: 140.4656, duration: 90, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 7 },
  { name: '筑波山', description: '関東平野を一望できる美しい山', category: 'nature', prefecture: '茨城県', latitude: 36.2256, longitude: 140.1053, duration: 240, ageGroup: 'adult', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '大洗磯前神社', description: '海上の岩に立つ神秘的な鳥居', category: 'cultural', prefecture: '茨城県', latitude: 36.3122, longitude: 140.5731, duration: 45, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },

  // 栃木県
  { name: '東照宮', description: '徳川家康が眠る霊廟として有名な神社', category: 'cultural', prefecture: '栃木県', latitude: 36.7580, longitude: 139.5994, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'both', popularity: 10 },
  { name: '華厳の滝', description: '日本三大名瀑の一つ。中禅寺湖からの落差は97m', category: 'nature', prefecture: '栃木県', latitude: 36.7394, longitude: 139.5069, duration: 45, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '中禅寺湖', description: '男体山の噴火でできた湖。遊覧船やボートが楽しめる', category: 'nature', prefecture: '栃木県', latitude: 36.7286, longitude: 139.4839, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '那須温泉', description: '皇室御用達の高原リゾート温泉', category: 'hot_springs', prefecture: '栃木県', latitude: 37.1167, longitude: 139.9667, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 7 },
  { name: 'あしかがフラワーパーク', description: '大藤で有名な花のテーマパーク', category: 'nature', prefecture: '栃木県', latitude: 36.3119, longitude: 139.5328, duration: 120, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 8 },

  // 群馬県
  { name: '草津温泉', description: '日本三名泉の一つ。湯畑が有名', category: 'hot_springs', prefecture: '群馬県', latitude: 36.6231, longitude: 138.5997, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'both', popularity: 9 },
  { name: '伊香保温泉', description: '石段街で有名な歴史ある温泉地', category: 'hot_springs', prefecture: '群馬県', latitude: 36.4889, longitude: 138.9078, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '尾瀬', description: '高層湿原の美しい自然が楽しめる', category: 'nature', prefecture: '群馬県', latitude: 36.8833, longitude: 139.2833, duration: 360, ageGroup: 'adult', season: 'summer', weatherPreference: 'outdoor', popularity: 8 },
  { name: '富岡製糸場', description: '世界遺産の近代化産業遺産', category: 'cultural', prefecture: '群馬県', latitude: 36.2547, longitude: 138.8906, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '榛名湖', description: '榛名山の火口湖。ボートやワカサギ釣りが楽しめる', category: 'nature', prefecture: '群馬県', latitude: 36.4667, longitude: 138.8500, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },

  // 埼玉県
  { name: '川越', description: '江戸時代の蔵造りの街並みが残る小江戸', category: 'cultural', prefecture: '埼玉県', latitude: 35.9253, longitude: 139.4856, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '秩父', description: '秩父夜祭で有名な歴史ある街', category: 'cultural', prefecture: '埼玉県', latitude: 35.9917, longitude: 139.0856, duration: 240, ageGroup: 'all', season: 'winter', weatherPreference: 'outdoor', popularity: 7 },
  { name: '長瀞', description: '荒川の渓谷美とライン下りで有名', category: 'nature', prefecture: '埼玉県', latitude: 36.1000, longitude: 139.1333, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '羊山公園', description: '芝桜の丘で有名な公園', category: 'nature', prefecture: '埼玉県', latitude: 35.9981, longitude: 139.0792, duration: 90, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 7 },
  { name: '鉄道博物館', description: '日本最大級の鉄道博物館', category: 'cultural', prefecture: '埼玉県', latitude: 35.9261, longitude: 139.6181, duration: 180, ageGroup: 'child', season: 'all', weatherPreference: 'indoor', popularity: 6 },

  // 千葉県
  { name: '成田山新勝寺', description: '初詣客数日本一を誇る寺院', category: 'cultural', prefecture: '千葉県', latitude: 35.7967, longitude: 140.3169, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '鴨川シーワールド', description: 'シャチのパフォーマンスで有名な水族館', category: 'cultural', prefecture: '千葉県', latitude: 35.1356, longitude: 140.0956, duration: 240, ageGroup: 'child', season: 'all', weatherPreference: 'indoor', popularity: 8 },
  { name: '房総フラワーライン', description: '海沿いの花畑ドライブコース', category: 'nature', prefecture: '千葉県', latitude: 34.9500, longitude: 139.8500, duration: 120, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 6 },
  { name: '犬吠埼', description: '日本で一番早い初日の出が見られる', category: 'nature', prefecture: '千葉県', latitude: 35.7072, longitude: 140.8669, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '養老渓谷', description: '紅葉と滝で有名な渓谷', category: 'nature', prefecture: '千葉県', latitude: 35.3167, longitude: 140.1833, duration: 120, ageGroup: 'all', season: 'autumn', weatherPreference: 'outdoor', popularity: 5 },

  // 東京都
  { name: '浅草寺', description: '東京最古の寺院。雷門で有名', category: 'cultural', prefecture: '東京都', latitude: 35.7148, longitude: 139.7967, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '東京スカイツリー', description: '世界一高い電波塔。東京の新シンボル', category: 'cultural', prefecture: '東京都', latitude: 35.7101, longitude: 139.8107, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 9 },
  { name: '明治神宮', description: '明治天皇を祀る都心のオアシス', category: 'cultural', prefecture: '東京都', latitude: 35.6764, longitude: 139.6993, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '上野公園', description: '桜の名所で美術館・博物館も多数', category: 'cultural', prefecture: '東京都', latitude: 35.7136, longitude: 139.7740, duration: 180, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 7 },
  { name: 'お台場', description: '東京湾の人工島。夜景とエンタメの街', category: 'cultural', prefecture: '東京都', latitude: 35.6297, longitude: 139.7714, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },

  // 神奈川県
  { name: '鎌倉大仏', description: '高徳院の青銅製阿弥陀如来坐像', category: 'cultural', prefecture: '神奈川県', latitude: 35.3167, longitude: 139.5356, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '江ノ島', description: '湘南を代表する観光地。グルメと絶景', category: 'nature', prefecture: '神奈川県', latitude: 35.2972, longitude: 139.4811, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '箱根', description: '温泉とアートの街。富士山の眺望も美しい', category: 'hot_springs', prefecture: '神奈川県', latitude: 35.2322, longitude: 139.1069, duration: 480, ageGroup: 'all', season: 'all', weatherPreference: 'both', popularity: 9 },
  { name: '横浜中華街', description: '日本最大の中華街。グルメの宝庫', category: 'cultural', prefecture: '神奈川県', latitude: 35.4422, longitude: 139.6489, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: 'みなとみらい21', description: '横浜の近未来的な港町エリア', category: 'cultural', prefecture: '神奈川県', latitude: 35.4556, longitude: 139.6317, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },

  // 新潟県
  { name: '佐渡島', description: '金山と朱鷺で有名な離島', category: 'cultural', prefecture: '新潟県', latitude: 38.0833, longitude: 138.3667, duration: 480, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '苗場スキー場', description: '冬はスキー、夏はフジロックで有名', category: 'nature', prefecture: '新潟県', latitude: 36.8500, longitude: 138.6833, duration: 480, ageGroup: 'all', season: 'winter', weatherPreference: 'outdoor', popularity: 7 },
  { name: '弥彦神社', description: '越後一宮として崇敬される古社', category: 'cultural', prefecture: '新潟県', latitude: 37.6833, longitude: 138.9500, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '月岡温泉', description: 'エメラルドグリーンの美肌の湯', category: 'hot_springs', prefecture: '新潟県', latitude: 37.8167, longitude: 139.3000, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '清津峡', description: '日本三大峡谷の一つ。絶景の渓谷美', category: 'nature', prefecture: '新潟県', latitude: 37.0167, longitude: 138.7667, duration: 90, ageGroup: 'all', season: 'autumn', weatherPreference: 'outdoor', popularity: 6 },

  // 富山県
  { name: '立山黒部アルペンルート', description: '3000m級の山々を貫く山岳観光ルート', category: 'nature', prefecture: '富山県', latitude: 36.5667, longitude: 137.6333, duration: 480, ageGroup: 'adult', season: 'summer', weatherPreference: 'outdoor', popularity: 9 },
  { name: '黒部ダム', description: '日本最大級のアーチ式ダム', category: 'cultural', prefecture: '富山県', latitude: 36.5667, longitude: 137.6667, duration: 120, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 8 },
  { name: '宇奈月温泉', description: '黒部峡谷の玄関口にある温泉地', category: 'hot_springs', prefecture: '富山県', latitude: 36.8333, longitude: 137.6167, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '五箇山', description: '世界遺産の合掌造り集落', category: 'cultural', prefecture: '富山県', latitude: 36.4167, longitude: 136.9167, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '氷見の寒鰤', description: '冬の味覚として有名な氷見漁港', category: 'cultural', prefecture: '富山県', latitude: 36.8667, longitude: 137.0167, duration: 120, ageGroup: 'all', season: 'winter', weatherPreference: 'indoor', popularity: 5 },

  // 石川県
  { name: '兼六園', description: '日本三名園の一つ。四季折々の美しさ', category: 'cultural', prefecture: '石川県', latitude: 36.5619, longitude: 136.6622, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '金沢城', description: '前田家の居城。美しい石垣で有名', category: 'cultural', prefecture: '石川県', latitude: 36.5656, longitude: 136.6594, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: 'ひがし茶屋街', description: '金沢の古い街並みが残る茶屋街', category: 'cultural', prefecture: '石川県', latitude: 36.5700, longitude: 136.6700, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '和倉温泉', description: '能登半島の海の温泉リゾート', category: 'hot_springs', prefecture: '石川県', latitude: 37.1000, longitude: 136.9167, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '白米千枚田', description: '日本海に面した美しい棚田', category: 'nature', prefecture: '石川県', latitude: 37.3000, longitude: 136.8833, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },

  // 福井県
  { name: '永平寺', description: '曹洞宗の大本山。修行体験も可能', category: 'cultural', prefecture: '福井県', latitude: 36.0833, longitude: 136.3167, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 7 },
  { name: '東尋坊', description: '日本海の荒波が作った断崖絶壁', category: 'nature', prefecture: '福井県', latitude: 36.2333, longitude: 136.1167, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '一乗谷朝倉氏遺跡', description: '戦国時代の城下町跡', category: 'cultural', prefecture: '福井県', latitude: 35.9833, longitude: 136.3000, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '芦原温泉', description: '関西の奥座敷として親しまれる温泉地', category: 'hot_springs', prefecture: '福井県', latitude: 36.2167, longitude: 136.2167, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 5 },
  { name: '恐竜博物館', description: '世界最大級の恐竜博物館', category: 'cultural', prefecture: '福井県', latitude: 36.1000, longitude: 136.5167, duration: 180, ageGroup: 'child', season: 'all', weatherPreference: 'indoor', popularity: 7 },

  // 山梨県
  { name: '富士山', description: '日本最高峰の霊峰。世界遺産', category: 'nature', prefecture: '山梨県', latitude: 35.3606, longitude: 138.7274, duration: 480, ageGroup: 'adult', season: 'summer', weatherPreference: 'outdoor', popularity: 10 },
  { name: '河口湖', description: '富士五湖の一つ。富士山の絶景スポット', category: 'nature', prefecture: '山梨県', latitude: 35.5000, longitude: 138.7500, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '武田神社', description: '武田信玄を祀る神社', category: 'cultural', prefecture: '山梨県', latitude: 35.6833, longitude: 138.5833, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '石和温泉', description: '山梨の代表的な温泉郷', category: 'hot_springs', prefecture: '山梨県', latitude: 35.6500, longitude: 138.6167, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 5 },
  { name: '昇仙峡', description: '日本屈指の渓谷美を誇る景勝地', category: 'nature', prefecture: '山梨県', latitude: 35.7167, longitude: 138.4833, duration: 120, ageGroup: 'all', season: 'autumn', weatherPreference: 'outdoor', popularity: 7 },

  // 長野県
  { name: '松本城', description: '国宝の現存天守。黒い外観が美しい', category: 'cultural', prefecture: '長野県', latitude: 36.2394, longitude: 137.9700, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '上高地', description: '日本有数の山岳リゾート。穂高連峰の絶景', category: 'nature', prefecture: '長野県', latitude: 36.1500, longitude: 137.6500, duration: 240, ageGroup: 'adult', season: 'summer', weatherPreference: 'outdoor', popularity: 9 },
  { name: '善光寺', description: '一生に一度は善光寺参りと言われる名刹', category: 'cultural', prefecture: '長野県', latitude: 36.6619, longitude: 138.1856, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '軽井沢', description: '避暑地として人気の高原リゾート', category: 'nature', prefecture: '長野県', latitude: 36.3500, longitude: 138.6333, duration: 360, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 8 },
  { name: '野沢温泉', description: 'スキーと温泉で有名な山里', category: 'hot_springs', prefecture: '長野県', latitude: 36.9167, longitude: 138.4333, duration: 480, ageGroup: 'all', season: 'winter', weatherPreference: 'both', popularity: 7 },

  // 岐阜県
  { name: '白川郷', description: '世界遺産の合掌造り集落', category: 'cultural', prefecture: '岐阜県', latitude: 36.2583, longitude: 136.9067, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '飛騨高山', description: '古い街並みが美しい飛騨の小京都', category: 'cultural', prefecture: '岐阜県', latitude: 36.1461, longitude: 137.2514, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '下呂温泉', description: '日本三名泉の一つ。美肌の湯で有名', category: 'hot_springs', prefecture: '岐阜県', latitude: 35.8000, longitude: 137.2500, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 7 },
  { name: '奥飛騨温泉郷', description: '5つの温泉地からなる秘湯の郷', category: 'hot_springs', prefecture: '岐阜県', latitude: 36.2167, longitude: 137.5833, duration: 360, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '郡上八幡', description: '水の城下町。郡上踊りで有名', category: 'cultural', prefecture: '岐阜県', latitude: 35.7500, longitude: 136.9667, duration: 180, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 6 },

  // 静岡県
  { name: '富士山', description: '静岡側からの富士山。世界遺産', category: 'nature', prefecture: '静岡県', latitude: 35.3606, longitude: 138.7274, duration: 480, ageGroup: 'adult', season: 'summer', weatherPreference: 'outdoor', popularity: 10 },
  { name: '熱海温泉', description: '首都圏から近い人気温泉リゾート', category: 'hot_springs', prefecture: '静岡県', latitude: 35.0950, longitude: 139.0781, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 8 },
  { name: '伊豆半島', description: '温泉と海の幸で有名な観光半島', category: 'nature', prefecture: '静岡県', latitude: 34.8000, longitude: 138.9500, duration: 480, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '久能山東照宮', description: '徳川家康が最初に埋葬された霊廟', category: 'cultural', prefecture: '静岡県', latitude: 34.9667, longitude: 138.4500, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '白糸の滝', description: '富士山の湧水による美しい滝', category: 'nature', prefecture: '静岡県', latitude: 35.3167, longitude: 138.5833, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },

  // 愛知県
  { name: '名古屋城', description: '金のシャチホコで有名な尾張徳川家の居城', category: 'cultural', prefecture: '愛知県', latitude: 35.1856, longitude: 136.8992, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '熱田神宮', description: '三種の神器の一つ草薙剣を祀る', category: 'cultural', prefecture: '愛知県', latitude: 35.1278, longitude: 136.9097, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '犬山城', description: '現存12天守の一つ。国宝指定', category: 'cultural', prefecture: '愛知県', latitude: 35.3881, longitude: 136.9406, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: 'リニア・鉄道館', description: '新幹線とリニアの博物館', category: 'cultural', prefecture: '愛知県', latitude: 35.0356, longitude: 136.8144, duration: 180, ageGroup: 'child', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '香嵐渓', description: '東海地方屈指の紅葉の名所', category: 'nature', prefecture: '愛知県', latitude: 35.1167, longitude: 137.3000, duration: 120, ageGroup: 'all', season: 'autumn', weatherPreference: 'outdoor', popularity: 7 },

  // 三重県
  { name: '伊勢神宮', description: '日本人の心のふるさと。天照大御神を祀る', category: 'cultural', prefecture: '三重県', latitude: 34.4569, longitude: 136.7256, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '鳥羽水族館', description: '日本最大級の水族館。ジュゴンで有名', category: 'cultural', prefecture: '三重県', latitude: 34.4833, longitude: 136.8500, duration: 180, ageGroup: 'child', season: 'all', weatherPreference: 'indoor', popularity: 7 },
  { name: '熊野古道', description: '世界遺産の霊場参詣道', category: 'cultural', prefecture: '三重県', latitude: 33.7333, longitude: 136.1167, duration: 240, ageGroup: 'adult', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '志摩スペイン村', description: 'スペインをテーマにしたテーマパーク', category: 'cultural', prefecture: '三重県', latitude: 34.3167, longitude: 136.8167, duration: 480, ageGroup: 'child', season: 'all', weatherPreference: 'outdoor', popularity: 5 },
  { name: '榊原温泉', description: '清少納言も愛した美肌の湯', category: 'hot_springs', prefecture: '三重県', latitude: 34.6000, longitude: 136.3167, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 5 },

  // 滋賀県
  { name: '琵琶湖', description: '日本最大の湖。様々なアクティビティが楽しめる', category: 'nature', prefecture: '滋賀県', latitude: 35.2500, longitude: 136.1000, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '比叡山延暦寺', description: '天台宗の総本山。世界遺産', category: 'cultural', prefecture: '滋賀県', latitude: 35.0706, longitude: 135.8411, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '彦根城', description: '国宝の天守とひこにゃんで有名', category: 'cultural', prefecture: '滋賀県', latitude: 35.2764, longitude: 136.2514, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '近江八幡', description: '水郷と近江商人の町並み', category: 'cultural', prefecture: '滋賀県', latitude: 35.1281, longitude: 136.0956, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '雄琴温泉', description: '琵琶湖を望む温泉リゾート', category: 'hot_springs', prefecture: '滋賀県', latitude: 35.1667, longitude: 135.9333, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 5 },

  // 京都府
  { name: '清水寺', description: '京都を代表する寺院。清水の舞台で有名', category: 'cultural', prefecture: '京都府', latitude: 34.9947, longitude: 135.7850, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 10 },
  { name: '金閣寺', description: '金箔に覆われた美しい舎利殿', category: 'cultural', prefecture: '京都府', latitude: 35.0394, longitude: 135.7292, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 10 },
  { name: '伏見稲荷大社', description: '千本鳥居で有名な稲荷神社の総本宮', category: 'cultural', prefecture: '京都府', latitude: 34.9672, longitude: 135.7725, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '嵐山', description: '竹林の道と渡月橋で有名な景勝地', category: 'nature', prefecture: '京都府', latitude: 35.0094, longitude: 135.6681, duration: 180, ageGroup: 'all', season: 'autumn', weatherPreference: 'outdoor', popularity: 9 },
  { name: '天橋立', description: '日本三景の一つ。天に架かる橋のような砂嘴', category: 'nature', prefecture: '京都府', latitude: 35.5500, longitude: 135.1833, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },

  // 大阪府
  { name: '大阪城', description: '太閤秀吉の居城。桜の名所でもある', category: 'cultural', prefecture: '大阪府', latitude: 34.6873, longitude: 135.5262, duration: 120, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 8 },
  { name: 'ユニバーサル・スタジオ・ジャパン', description: 'ハリウッド映画のテーマパーク', category: 'cultural', prefecture: '大阪府', latitude: 34.6658, longitude: 135.4322, duration: 480, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '道頓堀', description: '大阪の台所。グルメとエンタメの街', category: 'cultural', prefecture: '大阪府', latitude: 34.6686, longitude: 135.5017, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '住吉大社', description: '全国の住吉神社の総本社', category: 'cultural', prefecture: '大阪府', latitude: 34.6186, longitude: 135.4958, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '天王寺動物園', description: '都市型動物園として人気', category: 'cultural', prefecture: '大阪府', latitude: 34.6500, longitude: 135.5067, duration: 180, ageGroup: 'child', season: 'all', weatherPreference: 'outdoor', popularity: 6 },

  // 兵庫県
  { name: '姫路城', description: '世界遺産の国宝天守。白鷺城とも呼ばれる', category: 'cultural', prefecture: '兵庫県', latitude: 34.8394, longitude: 134.6939, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '有馬温泉', description: '日本最古の温泉の一つ。金泉で有名', category: 'hot_springs', prefecture: '兵庫県', latitude: 34.7972, longitude: 135.2497, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 8 },
  { name: '神戸港', description: '美しい港町の夜景とグルメ', category: 'cultural', prefecture: '兵庫県', latitude: 34.6833, longitude: 135.1833, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '淡路島', description: '鳴門海峡と花の島で有名', category: 'nature', prefecture: '兵庫県', latitude: 34.3500, longitude: 134.8000, duration: 360, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '竹田城跡', description: '天空の城として人気の山城跡', category: 'cultural', prefecture: '兵庫県', latitude: 35.3000, longitude: 134.8167, duration: 120, ageGroup: 'adult', season: 'autumn', weatherPreference: 'outdoor', popularity: 7 },

  // 奈良県
  { name: '東大寺', description: '奈良の大仏で有名な華厳宗の総本山', category: 'cultural', prefecture: '奈良県', latitude: 34.6889, longitude: 135.8378, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '奈良公園', description: '鹿と戯れることができる歴史公園', category: 'nature', prefecture: '奈良県', latitude: 34.6851, longitude: 135.8048, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '法隆寺', description: '世界最古の木造建築群。聖徳太子ゆかりの寺', category: 'cultural', prefecture: '奈良県', latitude: 34.6142, longitude: 135.7347, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '春日大社', description: '藤の花と灯籠で有名な神社', category: 'cultural', prefecture: '奈良県', latitude: 34.6818, longitude: 135.8482, duration: 90, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 7 },
  { name: '吉野山', description: '日本一の桜の名所。3万本の桜', category: 'nature', prefecture: '奈良県', latitude: 34.3667, longitude: 135.8667, duration: 240, ageGroup: 'all', season: 'spring', weatherPreference: 'outdoor', popularity: 8 },

  // 和歌山県
  { name: '高野山', description: '弘法大師空海が開いた真言密教の聖地', category: 'cultural', prefecture: '和歌山県', latitude: 34.2133, longitude: 135.5800, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '熊野三山', description: '熊野信仰の中心地。世界遺産', category: 'cultural', prefecture: '和歌山県', latitude: 33.8333, longitude: 135.7833, duration: 360, ageGroup: 'adult', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '白浜温泉', description: '関西屈指の温泉リゾート。白い砂浜も美しい', category: 'hot_springs', prefecture: '和歌山県', latitude: 33.6833, longitude: 135.3333, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'both', popularity: 7 },
  { name: 'アドベンチャーワールド', description: 'パンダで有名な動物園とテーマパーク', category: 'cultural', prefecture: '和歌山県', latitude: 33.6833, longitude: 135.3500, duration: 360, ageGroup: 'child', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '那智の滝', description: '日本三大名瀑の一つ。神聖な滝', category: 'nature', prefecture: '和歌山県', latitude: 33.6667, longitude: 135.8833, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },

  // 鳥取県
  { name: '鳥取砂丘', description: '日本最大の砂丘。ラクダ乗り体験も', category: 'nature', prefecture: '鳥取県', latitude: 35.5333, longitude: 134.2333, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '境港', description: 'ゲゲゲの鬼太郎の水木しげるロード', category: 'cultural', prefecture: '鳥取県', latitude: 35.5333, longitude: 133.2333, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '大山', description: '中国地方最高峰。伯耆富士とも呼ばれる', category: 'nature', prefecture: '鳥取県', latitude: 35.3667, longitude: 133.5333, duration: 360, ageGroup: 'adult', season: 'summer', weatherPreference: 'outdoor', popularity: 6 },
  { name: '三朝温泉', description: 'ラジウム温泉で有名な湯治場', category: 'hot_springs', prefecture: '鳥取県', latitude: 35.4167, longitude: 133.9167, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 5 },
  { name: '浦富海岸', description: '山陰海岸ジオパークの美しい海岸', category: 'nature', prefecture: '鳥取県', latitude: 35.5500, longitude: 134.3500, duration: 120, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 5 },

  // 島根県
  { name: '出雲大社', description: '縁結びの神様で有名な古社', category: 'cultural', prefecture: '島根県', latitude: 35.4017, longitude: 132.6858, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '松江城', description: '現存12天守の一つ。黒い天守が美しい', category: 'cultural', prefecture: '島根県', latitude: 35.4736, longitude: 133.0506, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '石見銀山', description: '世界遺産の銀山遺跡', category: 'cultural', prefecture: '島根県', latitude: 35.1000, longitude: 132.4333, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '玉造温泉', description: '美肌の湯として知られる古湯', category: 'hot_springs', prefecture: '島根県', latitude: 35.4167, longitude: 132.9833, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '隠岐諸島', description: '独特の自然と文化を持つ離島群', category: 'nature', prefecture: '島根県', latitude: 36.2000, longitude: 133.3167, duration: 480, ageGroup: 'adult', season: 'summer', weatherPreference: 'outdoor', popularity: 5 },

  // 岡山県
  { name: '後楽園', description: '日本三名園の一つ。岡山城との眺めが美しい', category: 'cultural', prefecture: '岡山県', latitude: 34.6633, longitude: 133.9342, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '岡山城', description: '烏城とも呼ばれる黒い天守', category: 'cultural', prefecture: '岡山県', latitude: 34.6650, longitude: 133.9350, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '倉敷美観地区', description: '白壁の蔵屋敷が美しい歴史地区', category: 'cultural', prefecture: '岡山県', latitude: 34.5958, longitude: 133.7714, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '湯原温泉', description: '露天風呂番付西の横綱。砂湯が有名', category: 'hot_springs', prefecture: '岡山県', latitude: 35.2667, longitude: 133.7167, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '吉備津神社', description: '桃太郎伝説ゆかりの古社', category: 'cultural', prefecture: '岡山県', latitude: 34.6667, longitude: 133.8167, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 5 },

  // 広島県
  { name: '厳島神社', description: '海に浮かぶ朱色の大鳥居。世界遺産', category: 'cultural', prefecture: '広島県', latitude: 34.2958, longitude: 132.3197, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 10 },
  { name: '原爆ドーム', description: '平和の象徴として保存される遺構', category: 'cultural', prefecture: '広島県', latitude: 34.3956, longitude: 132.4536, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '宮島', description: '厳島神社がある神の島', category: 'cultural', prefecture: '広島県', latitude: 34.2958, longitude: 132.3197, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '尾道', description: '坂の街と猫の街として親しまれる', category: 'cultural', prefecture: '広島県', latitude: 34.4083, longitude: 133.2050, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '湯来温泉', description: '広島の奥座敷。自然豊かな温泉地', category: 'hot_springs', prefecture: '広島県', latitude: 34.4333, longitude: 132.3167, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 5 },

  // 山口県
  { name: '錦帯橋', description: '日本三名橋の一つ。木造のアーチ橋', category: 'cultural', prefecture: '山口県', latitude: 34.1667, longitude: 132.1833, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '秋芳洞', description: '日本最大級の鍾乳洞', category: 'nature', prefecture: '山口県', latitude: 34.2333, longitude: 131.3000, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 7 },
  { name: '萩', description: '明治維新の志士を育んだ城下町', category: 'cultural', prefecture: '山口県', latitude: 34.4167, longitude: 131.4000, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '湯田温泉', description: '山口の奥座敷。白狐の伝説で有名', category: 'hot_springs', prefecture: '山口県', latitude: 34.1833, longitude: 131.4667, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 5 },
  { name: '角島大橋', description: 'エメラルドグリーンの海に架かる美しい橋', category: 'nature', prefecture: '山口県', latitude: 34.4167, longitude: 130.9000, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },

  // 徳島県
  { name: '阿波踊り', description: '日本三大盆踊りの一つ。夏の風物詩', category: 'cultural', prefecture: '徳島県', latitude: 34.0653, longitude: 134.5594, duration: 180, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 8 },
  { name: '鳴門の渦潮', description: '世界最大級の自然現象の渦潮', category: 'nature', prefecture: '徳島県', latitude: 34.2333, longitude: 134.6167, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '祖谷のかずら橋', description: 'シラクチカズラで編まれた秘境の吊り橋', category: 'cultural', prefecture: '徳島県', latitude: 33.8667, longitude: 133.8167, duration: 120, ageGroup: 'adult', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '大塚国際美術館', description: '世界の名画を陶板で再現した美術館', category: 'cultural', prefecture: '徳島県', latitude: 34.2333, longitude: 134.6000, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '剣山', description: '西日本第二の高峰。山頂からの眺望が美しい', category: 'nature', prefecture: '徳島県', latitude: 33.8667, longitude: 134.1000, duration: 360, ageGroup: 'adult', season: 'summer', weatherPreference: 'outdoor', popularity: 5 },

  // 香川県
  { name: '金刀比羅宮', description: '「こんぴらさん」で親しまれる海の守り神', category: 'cultural', prefecture: '香川県', latitude: 34.1853, longitude: 133.8172, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '栗林公園', description: '江戸時代の回遊式庭園。特別名勝', category: 'cultural', prefecture: '香川県', latitude: 34.3300, longitude: 134.0433, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '直島', description: 'アートの島として世界的に有名', category: 'cultural', prefecture: '香川県', latitude: 34.4667, longitude: 133.9833, duration: 360, ageGroup: 'adult', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '小豆島', description: 'オリーブの島。エンジェルロードが有名', category: 'nature', prefecture: '香川県', latitude: 34.4833, longitude: 134.2000, duration: 360, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '善通寺', description: '弘法大師空海の生誕地', category: 'cultural', prefecture: '香川県', latitude: 34.2283, longitude: 133.7881, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 5 },

  // 愛媛県
  { name: '松山城', description: '現存12天守の一つ。坂の上の雲で有名', category: 'cultural', prefecture: '愛媛県', latitude: 33.8456, longitude: 132.7661, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '道後温泉', description: '日本最古の温泉の一つ。夏目漱石ゆかりの地', category: 'hot_springs', prefecture: '愛媛県', latitude: 33.8522, longitude: 132.7858, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 9 },
  { name: 'しまなみ海道', description: '瀬戸内海の島々を結ぶサイクリングロード', category: 'nature', prefecture: '愛媛県', latitude: 34.3000, longitude: 133.0000, duration: 480, ageGroup: 'adult', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '内子', description: '江戸時代の商家の街並みが残る', category: 'cultural', prefecture: '愛媛県', latitude: 33.5500, longitude: 132.6500, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 5 },
  { name: '石鎚山', description: '四国最高峰。霊峰として崇拝される', category: 'nature', prefecture: '愛媛県', latitude: 33.7667, longitude: 133.1167, duration: 360, ageGroup: 'adult', season: 'summer', weatherPreference: 'outdoor', popularity: 6 },

  // 高知県
  { name: '高知城', description: '現存12天守の一つ。山内一豊の居城', category: 'cultural', prefecture: '高知県', latitude: 33.5597, longitude: 133.5311, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '桂浜', description: '坂本龍馬像で有名な月の名所', category: 'nature', prefecture: '高知県', latitude: 33.4972, longitude: 133.5700, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '四万十川', description: '最後の清流と呼ばれる美しい川', category: 'nature', prefecture: '高知県', latitude: 33.2333, longitude: 133.0000, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '室戸岬', description: '太平洋の荒波が作った断崖絶壁', category: 'nature', prefecture: '高知県', latitude: 33.2500, longitude: 134.1833, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 5 },
  { name: 'よさこい祭り', description: '高知発祥の踊り祭り', category: 'cultural', prefecture: '高知県', latitude: 33.5597, longitude: 133.5311, duration: 180, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 6 },

  // 福岡県
  { name: '太宰府天満宮', description: '学問の神様菅原道真を祀る', category: 'cultural', prefecture: '福岡県', latitude: 33.5200, longitude: 130.5325, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '博多祇園山笠', description: '博多の夏を代表する勇壮な祭り', category: 'cultural', prefecture: '福岡県', latitude: 33.5904, longitude: 130.4017, duration: 180, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 7 },
  { name: '門司港', description: '大正ロマンの街並みが美しい港町', category: 'cultural', prefecture: '福岡県', latitude: 33.9500, longitude: 130.9667, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '柳川', description: '川下りと鰻せいろ蒸しで有名', category: 'cultural', prefecture: '福岡県', latitude: 33.1667, longitude: 130.4000, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '原鶴温泉', description: '筑後川沿いの美肌の湯', category: 'hot_springs', prefecture: '福岡県', latitude: 33.4167, longitude: 130.7500, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 5 },

  // 佐賀県
  { name: '吉野ヶ里遺跡', description: '弥生時代の大規模環濠集落遺跡', category: 'cultural', prefecture: '佐賀県', latitude: 33.3333, longitude: 130.3833, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '有田', description: '日本磁器発祥の地。有田焼で有名', category: 'cultural', prefecture: '佐賀県', latitude: 33.1833, longitude: 129.8833, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '嬉野温泉', description: '美肌の湯として知られる温泉地', category: 'hot_springs', prefecture: '佐賀県', latitude: 33.1167, longitude: 130.0667, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '唐津城', description: '虹の松原を望む海城', category: 'cultural', prefecture: '佐賀県', latitude: 33.4500, longitude: 129.9667, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 5 },
  { name: '祐徳稲荷神社', description: '日本三大稲荷の一つ', category: 'cultural', prefecture: '佐賀県', latitude: 33.0833, longitude: 130.0500, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 5 },

  // 長崎県
  { name: '平和公園', description: '原爆の記憶と平和への祈りを込めた公園', category: 'cultural', prefecture: '長崎県', latitude: 32.7792, longitude: 129.8683, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: 'グラバー園', description: '明治の洋館群と長崎港の眺望', category: 'cultural', prefecture: '長崎県', latitude: 32.7333, longitude: 129.8667, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: 'ハウステンボス', description: 'ヨーロッパの街並みを再現したテーマパーク', category: 'cultural', prefecture: '長崎県', latitude: 33.0833, longitude: 129.7833, duration: 480, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '軍艦島', description: '廃墟となった海上の炭鉱島', category: 'cultural', prefecture: '長崎県', latitude: 32.6278, longitude: 129.7389, duration: 180, ageGroup: 'adult', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '雲仙温泉', description: '地獄めぐりで有名な山の温泉地', category: 'hot_springs', prefecture: '長崎県', latitude: 32.7667, longitude: 130.2667, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'both', popularity: 6 },

  // 熊本県
  { name: '熊本城', description: '日本三名城の一つ。加藤清正の築城', category: 'cultural', prefecture: '熊本県', latitude: 32.8064, longitude: 130.7056, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '阿蘇山', description: '世界最大級のカルデラを持つ活火山', category: 'nature', prefecture: '熊本県', latitude: 32.8833, longitude: 131.1000, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '黒川温泉', description: '全国屈指の人気温泉郷', category: 'hot_springs', prefecture: '熊本県', latitude: 33.0500, longitude: 131.1167, duration: 360, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 9 },
  { name: 'くまモンスクエア', description: 'くまモンに会える公式グッズショップ', category: 'cultural', prefecture: '熊本県', latitude: 32.8033, longitude: 130.7081, duration: 60, ageGroup: 'child', season: 'all', weatherPreference: 'indoor', popularity: 5 },
  { name: '天草', description: 'キリシタンの歴史と美しい海', category: 'cultural', prefecture: '熊本県', latitude: 32.4500, longitude: 130.2000, duration: 360, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },

  // 大分県
  { name: '別府温泉', description: '日本一の温泉湧出量を誇る温泉都市', category: 'hot_springs', prefecture: '大分県', latitude: 33.2839, longitude: 131.4919, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'both', popularity: 9 },
  { name: '湯布院', description: '由布岳を望む人気の温泉リゾート', category: 'hot_springs', prefecture: '大分県', latitude: 33.2667, longitude: 131.3667, duration: 360, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '臼杵石仏', description: '国宝の石造仏群。平安時代後期の作', category: 'cultural', prefecture: '大分県', latitude: 33.1167, longitude: 131.8000, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '中津城', description: '黒田官兵衛が築いた水城', category: 'cultural', prefecture: '大分県', latitude: 33.6000, longitude: 131.1833, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 5 },
  { name: '耶馬溪', description: '奇岩と紅葉で有名な渓谷', category: 'nature', prefecture: '大分県', latitude: 33.5333, longitude: 131.1667, duration: 120, ageGroup: 'all', season: 'autumn', weatherPreference: 'outdoor', popularity: 6 },

  // 宮崎県
  { name: '高千穂峡', description: '神話の里の美しい渓谷。真名井の滝が有名', category: 'nature', prefecture: '宮崎県', latitude: 32.7000, longitude: 131.3000, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '日南海岸', description: 'フェニックスとモアイ像で有名', category: 'nature', prefecture: '宮崎県', latitude: 31.5500, longitude: 131.4167, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '宮崎神宮', description: '神武天皇を祀る神宮', category: 'cultural', prefecture: '宮崎県', latitude: 31.9167, longitude: 131.4167, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 5 },
  { name: '青島', description: '鬼の洗濯板で囲まれた小島', category: 'nature', prefecture: '宮崎県', latitude: 31.8000, longitude: 131.4667, duration: 90, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: 'えびの高原', description: '霧島連山の高原リゾート', category: 'nature', prefecture: '宮崎県', latitude: 31.9833, longitude: 130.8333, duration: 180, ageGroup: 'all', season: 'summer', weatherPreference: 'outdoor', popularity: 5 },

  // 鹿児島県
  { name: '桜島', description: '活火山の雄大な姿。鹿児島のシンボル', category: 'nature', prefecture: '鹿児島県', latitude: 31.5850, longitude: 130.6567, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '屋久島', description: '世界遺産の神秘の森。縄文杉で有名', category: 'nature', prefecture: '鹿児島県', latitude: 30.3333, longitude: 130.5000, duration: 480, ageGroup: 'adult', season: 'all', weatherPreference: 'outdoor', popularity: 9 },
  { name: '知覧特攻平和会館', description: '特攻隊の歴史を伝える平和学習施設', category: 'cultural', prefecture: '鹿児島県', latitude: 31.3667, longitude: 130.4333, duration: 120, ageGroup: 'adult', season: 'all', weatherPreference: 'indoor', popularity: 6 },
  { name: '指宿温泉', description: '世界でも珍しい砂むし温泉', category: 'hot_springs', prefecture: '鹿児島県', latitude: 31.2500, longitude: 130.6500, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '霧島温泉郷', description: '霧島連山の恵みを受けた温泉群', category: 'hot_springs', prefecture: '鹿児島県', latitude: 31.8833, longitude: 130.8167, duration: 240, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 6 },

  // 沖縄県
  { name: '首里城', description: '琉球王国の王宮。独特の文化と建築', category: 'cultural', prefecture: '沖縄県', latitude: 26.2172, longitude: 127.7192, duration: 120, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 8 },
  { name: '美ら海水族館', description: '世界最大級の水槽でジンベエザメが泳ぐ', category: 'cultural', prefecture: '沖縄県', latitude: 26.6944, longitude: 127.8794, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'indoor', popularity: 9 },
  { name: '竹富島', description: '赤瓦の民家と白砂の道が美しい離島', category: 'cultural', prefecture: '沖縄県', latitude: 24.3250, longitude: 124.0889, duration: 360, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 7 },
  { name: '万座毛', description: '象の鼻のような奇岩と美しい海', category: 'nature', prefecture: '沖縄県', latitude: 26.4944, longitude: 127.8506, duration: 60, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 },
  { name: '国際通り', description: '沖縄最大の繁華街。お土産とグルメの街', category: 'cultural', prefecture: '沖縄県', latitude: 26.2125, longitude: 127.6792, duration: 180, ageGroup: 'all', season: 'all', weatherPreference: 'outdoor', popularity: 6 }
];

export async function seedDatabase() {
  try {
    // Insert tourist spots data
    await db.insert(touristSpots).values(nationalSpotsData);
    console.log('Database seeded successfully with national tourist spots!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    sqlite.close();
  }
}

// Run if this file is executed directly
seedDatabase();