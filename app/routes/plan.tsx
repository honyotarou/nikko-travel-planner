import { useState, useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db";
import { touristSpots } from "~/db/schema";
import { eq } from "drizzle-orm";
import PlannerForm from "~/components/PlannerForm";
import WeatherWidget from "~/components/WeatherWidget";

export const meta: MetaFunction = () => {
  return [
    { title: "プラン作成 - 全国観光プランナー" },
    { name: "description", content: "あなたの条件に合わせた観光プランを作成します" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const prefecture = url.searchParams.get('prefecture') || '栃木県';
    
    const spots = await db.select().from(touristSpots).where(
      eq(touristSpots.prefecture, prefecture)
    );
    return json({ spots, selectedPrefecture: prefecture });
  } catch (error) {
    console.error("Database error:", error);
    // Return mock data as fallback for Tochigi
    const mockSpots = [
      {
        id: 1,
        name: '東照宮',
        description: '徳川家康が眠る霊廟として有名な神社。豪華絢爛な装飾が見どころ。',
        category: 'cultural',
        latitude: 36.7580,
        longitude: 139.5994,
        duration: 90,
        ageGroup: 'all',
        season: 'all',
        weatherPreference: 'both',
        popularity: 10,
      },
      {
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
      }
    ];
    return json({ spots: mockSpots, selectedPrefecture: '栃木県' });
  }
};

interface LoaderData {
  spots: any[];
  selectedPrefecture: string;
}

export default function Plan() {
  const { spots, selectedPrefecture } = useLoaderData<LoaderData>();
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setLocationError("位置情報の取得に失敗しました。手動で現在地を設定してください。");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setLocationError("お使いのブラウザは位置情報取得に対応していません。");
    }
  }, []);

  const nikkoLocation = { lat: 36.7580, lng: 139.5994 }; // 東照宮の座標

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // 地球の半径（km）
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const distanceToNikko = userLocation 
    ? calculateDistance(userLocation.lat, userLocation.lng, nikkoLocation.lat, nikkoLocation.lng)
    : null;

  return (
    <div className="relative min-h-screen bg-white w-full overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl mb-6 shadow-xl">
            <span className="text-2xl">📋</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            観光プラン作成
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            あなたの条件に合わせて最適な観光プランを提案します
          </p>
        </header>

        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">旅行条件の入力</h2>
                  
                  {/* Location Status */}
                  {/* Prefecture Selection */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-gray-200 rounded-2xl">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">🗾</span>
                      観光地域の選択
                    </h3>
                    <select 
                      className="select select-bordered w-full bg-white border-gray-300 text-gray-900"
                      defaultValue="栃木県"
                    >
                      <option value="北海道">北海道</option>
                      <option value="青森県">青森県</option>
                      <option value="岩手県">岩手県</option>
                      <option value="宮城県">宮城県</option>
                      <option value="秋田県">秋田県</option>
                      <option value="山形県">山形県</option>
                      <option value="福島県">福島県</option>
                      <option value="茨城県">茨城県</option>
                      <option value="栃木県">栃木県</option>
                      <option value="群馬県">群馬県</option>
                      <option value="埼玉県">埼玉県</option>
                      <option value="千葉県">千葉県</option>
                      <option value="東京都">東京都</option>
                      <option value="神奈川県">神奈川県</option>
                      <option value="新潟県">新潟県</option>
                      <option value="富山県">富山県</option>
                      <option value="石川県">石川県</option>
                      <option value="福井県">福井県</option>
                      <option value="山梨県">山梨県</option>
                      <option value="長野県">長野県</option>
                      <option value="岐阜県">岐阜県</option>
                      <option value="静岡県">静岡県</option>
                      <option value="愛知県">愛知県</option>
                      <option value="三重県">三重県</option>
                      <option value="滋賀県">滋賀県</option>
                      <option value="京都府">京都府</option>
                      <option value="大阪府">大阪府</option>
                      <option value="兵庫県">兵庫県</option>
                      <option value="奈良県">奈良県</option>
                      <option value="和歌山県">和歌山県</option>
                      <option value="鳥取県">鳥取県</option>
                      <option value="島根県">島根県</option>
                      <option value="岡山県">岡山県</option>
                      <option value="広島県">広島県</option>
                      <option value="山口県">山口県</option>
                      <option value="徳島県">徳島県</option>
                      <option value="香川県">香川県</option>
                      <option value="愛媛県">愛媛県</option>
                      <option value="高知県">高知県</option>
                      <option value="福岡県">福岡県</option>
                      <option value="佐賀県">佐賀県</option>
                      <option value="長崎県">長崎県</option>
                      <option value="熊本県">熊本県</option>
                      <option value="大分県">大分県</option>
                      <option value="宮崎県">宮崎県</option>
                      <option value="鹿児島県">鹿児島県</option>
                      <option value="沖縄県">沖縄県</option>
                    </select>
                  </div>

                  <div className="mb-8 p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-gray-200 rounded-2xl">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">📍</span>
                      現在地情報
                    </h3>
                    {userLocation ? (
                      <div className="space-y-2">
                        <p className="text-green-600 flex items-center">
                          <span className="mr-2">✓</span>
                          位置情報を取得しました
                        </p>
                        <p className="text-gray-600 text-sm">
                          日光までの距離: 約 {distanceToNikko?.toFixed(1)} km
                        </p>
                      </div>
                    ) : locationError ? (
                      <p className="text-red-600">{locationError}</p>
                    ) : (
                      <div className="flex items-center text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                        位置情報を取得中...
                      </div>
                    )}
                  </div>

                  <PlannerForm spots={spots} userLocation={userLocation} selectedPrefecture={selectedPrefecture} />
                </div>
              </div>
            </div>

            {/* Right column - Weather & Info */}
            <div className="space-y-6">
              <WeatherWidget />
              
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">💡 プランニングのコツ</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600">雨の日は屋内スポット（東照宮、輪王寺）がおすすめ</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600">半日プランなら東照宮エリアに集中</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600">1日プランなら中禅寺湖エリアも回れます</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600">車なら移動時間を短縮できます</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🏛️ 主要スポット</h3>
                  <div className="space-y-2">
                    {spots.slice(0, 5).map((spot: any) => (
                      <div key={spot.id} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{spot.name}</span>
                        <span className="text-xs text-gray-500">
                          {Math.floor(spot.duration / 60)}時間{spot.duration % 60 > 0 ? `${spot.duration % 60}分` : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}