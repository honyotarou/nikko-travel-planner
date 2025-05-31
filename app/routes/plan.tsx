import { useState, useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db";
import { touristSpots } from "~/db/schema";
import { eq, and } from "drizzle-orm";
import PlannerForm from "~/components/PlannerForm";
import WeatherWidget from "~/components/WeatherWidget";

export const meta: MetaFunction = () => {
  return [
    { title: "プラン作成 - 栃木県観光プランナー" },
    { name: "description", content: "あなたの条件に合わせた栃木県観光プランを作成します" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const prefecture = url.searchParams.get('prefecture') || '栃木県';
    const region = url.searchParams.get('region');
    
    console.log(`Loading data for prefecture: ${prefecture}, region: ${region}`);
    
    let spots;
    if (region) {
      spots = await db.select().from(touristSpots).where(
        and(
          eq(touristSpots.prefecture, prefecture),
          eq(touristSpots.region, region)
        )
      );
    } else {
      spots = await db.select().from(touristSpots).where(
        eq(touristSpots.prefecture, prefecture)
      );
    }
    
    console.log(`Found ${spots.length} spots`);
    
    // Get unique regions for the selected prefecture
    const regions = await db.select({ region: touristSpots.region })
      .from(touristSpots)
      .where(eq(touristSpots.prefecture, prefecture))
      .groupBy(touristSpots.region);
    
    console.log(`Found regions: ${regions.map(r => r.region).join(', ')}`);
    
    return json({ 
      spots, 
      selectedPrefecture: prefecture, 
      selectedRegion: region,
      availableRegions: regions.map(r => r.region)
    });
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
  selectedRegion?: string;
  availableRegions: string[];
}

export default function Plan() {
  const { spots, selectedPrefecture, selectedRegion, availableRegions } = useLoaderData<LoaderData>();
  const [selectedPrefectureState, setSelectedPrefectureState] = useState(selectedPrefecture);
  const [selectedRegionState, setSelectedRegionState] = useState(selectedRegion || '');
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
          setLocationError("");
        },
        (error) => {
          console.error("Geolocation error:", error);
          let errorMessage = "位置情報の取得に失敗しました。";
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "位置情報の利用が拒否されています。ブラウザの設定をご確認ください。";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "位置情報が利用できません。";
              break;
            case error.TIMEOUT:
              errorMessage = "位置情報の取得がタイムアウトしました。";
              break;
          }
          
          setLocationError(errorMessage);
          // Set default location to Nikko (fallback)
          setUserLocation({ lat: 36.7580, lng: 139.5994 });
        },
        {
          timeout: 10000,
          enableHighAccuracy: false,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      setLocationError("お使いのブラウザは位置情報取得に対応していません。");
      // Set default location to Nikko (fallback)
      setUserLocation({ lat: 36.7580, lng: 139.5994 });
    }
  }, []);

  // Get representative location from available spots for distance calculation
  const representativeLocation = spots.length > 0 
    ? { lat: spots[0].latitude, lng: spots[0].longitude }
    : { lat: 36.7580, lng: 139.5994 }; // 東照宮の座標 (fallback)

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

  const distanceToDestination = userLocation 
    ? calculateDistance(userLocation.lat, userLocation.lng, representativeLocation.lat, representativeLocation.lng)
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
                  {/* Region Selection */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-gray-200 rounded-2xl">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">🗾</span>
                      栃木県の地域選択
                    </h3>
                    <div className="space-y-4">
                      <div className="mb-4">
                        <div className="text-center p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                          <span className="text-emerald-800 font-semibold">📍 栃木県</span>
                        </div>
                      </div>
                      
                      {availableRegions.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">地域</label>
                          <select 
                            className="select select-bordered w-full bg-white border-gray-300 text-gray-900"
                            value={selectedRegionState}
                            onChange={(e) => {
                              setSelectedRegionState(e.target.value);
                              // Navigate to new region
                              const regionParam = e.target.value ? `&region=${encodeURIComponent(e.target.value)}` : '';
                              window.location.href = `/plan?prefecture=栃木県${regionParam}`;
                            }}
                          >
                            <option value="">すべての地域を表示</option>
                            {availableRegions.map((region) => (
                              <option key={region} value={region}>{region}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
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
                          {locationError ? "デフォルト位置を使用中" : "位置情報を取得しました"}
                        </p>
                        <p className="text-gray-600 text-sm">
                          栃木県{selectedRegion ? `・${selectedRegion}` : ''}までの距離: 約 {distanceToDestination?.toFixed(1)} km
                        </p>
                        {locationError && (
                          <p className="text-amber-600 text-xs">
                            ⚠️ {locationError}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                        位置情報を取得中...
                      </div>
                    )}
                  </div>

                  <PlannerForm spots={spots} userLocation={userLocation} selectedPrefecture={selectedPrefecture} selectedRegion={selectedRegion} />
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
                      <span className="text-gray-600">雨の日は屋内スポット（文化系施設）がおすすめ</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600">半日プランなら1つの地域に集中すると効率的</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600">1日プランなら複数地域を周遊できます</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600">車なら移動時間を短縮できます</span>
                    </li>
                    {selectedRegion && (
                      <li className="flex items-start">
                        <span className="text-emerald-500 mr-2">🎯</span>
                        <span className="text-gray-600">現在は{selectedRegion}地域のスポットに絞って表示しています</span>
                      </li>
                    )}
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