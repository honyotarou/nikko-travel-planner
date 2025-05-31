import { useState, useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db";
import { touristSpots } from "~/db/schema";
import PlannerForm from "~/components/PlannerForm";
import WeatherWidget from "~/components/WeatherWidget";

export const meta: MetaFunction = () => {
  return [
    { title: "プラン作成 - 日光観光プランナー" },
    { name: "description", content: "あなたの条件に合わせた日光観光プランを作成します" },
  ];
};

export const loader: LoaderFunction = async () => {
  try {
    const spots = await db.select().from(touristSpots);
    return json({ spots });
  } catch (error) {
    console.error("Database error:", error);
    // Return mock data as fallback
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
    return json({ spots: mockSpots });
  }
};

interface LoaderData {
  spots: any[];
}

export default function Plan() {
  const { spots } = useLoaderData<LoaderData>();
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
    <div className="bg-gradient-to-b from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            📋 観光プラン作成
          </h1>
          <p className="text-gray-600">
            あなたの条件に合わせて最適な日光観光プランを提案します
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column - Form */}
            <div className="lg:col-span-2">
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-xl mb-6">旅行条件の入力</h2>
                  
                  {/* Location Status */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2">📍 現在地情報</h3>
                    {userLocation ? (
                      <div>
                        <p className="text-green-600">✓ 位置情報を取得しました</p>
                        <p className="text-sm text-gray-600">
                          日光までの距離: 約 {distanceToNikko?.toFixed(1)} km
                        </p>
                      </div>
                    ) : locationError ? (
                      <p className="text-red-600">{locationError}</p>
                    ) : (
                      <p className="text-blue-600">位置情報を取得中...</p>
                    )}
                  </div>

                  <PlannerForm spots={spots} userLocation={userLocation} />
                </div>
              </div>
            </div>

            {/* Right column - Weather & Info */}
            <div className="space-y-6">
              <WeatherWidget />
              
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">💡 プランニングのコツ</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      雨の日は屋内スポット（東照宮、輪王寺）がおすすめ
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      半日プランなら東照宮エリアに集中
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      1日プランなら中禅寺湖エリアも回れます
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      車なら移動時間を短縮できます
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">🏛️ 主要スポット</h3>
                  <div className="space-y-2">
                    {spots.slice(0, 5).map((spot: any) => (
                      <div key={spot.id} className="flex justify-between items-center">
                        <span className="text-sm">{spot.name}</span>
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