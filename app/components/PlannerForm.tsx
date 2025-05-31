import { useState } from "react";
import { Form } from "@remix-run/react";

interface PlannerFormProps {
  spots: any[];
  userLocation: {lat: number, lng: number} | null;
}

export default function PlannerForm({ spots, userLocation }: PlannerFormProps) {
  const [formData, setFormData] = useState({
    duration: "halfday",
    groupSize: 2,
    ageGroup: "adult",
    transportation: "car",
    interests: [] as string[]
  });

  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePlan = async () => {
    try {
      // Get weather data for plan optimization
      const weatherResponse = await fetch("/api/weather");
      const weatherData = await weatherResponse.json();
      
      // Enhanced plan generation with weather consideration
      let recommendedSpots = [...spots];
      
      // Filter by duration
      const maxDuration = {
        "2hours": 120,
        "halfday": 240,
        "fullday": 480,
        "1night2days": 960,
        "2nights3days": 1440
      }[formData.duration] || 240;

      // Weather-based filtering
      const isRainyTomorrow = weatherData.tomorrow?.description?.includes("雨") || 
                             weatherData.tomorrow?.precipitation > 0.5;
      
      // Filter by weather preference and other criteria
      recommendedSpots = recommendedSpots.filter(spot => {
        // Age group filtering
        if (formData.ageGroup === "child" && spot.ageGroup === "adult") return false;
        if (formData.ageGroup === "senior" && spot.category === "nature" && spot.duration > 120) return false;
        
        // Weather-based filtering
        if (isRainyTomorrow && spot.weatherPreference === "outdoor") {
          return spot.category === "cultural"; // Prefer indoor cultural spots when rainy
        }
        
        return true;
      });

      // Enhanced scoring system
      recommendedSpots = recommendedSpots.map(spot => {
        let score = spot.popularity;
        
        // Weather bonus/penalty
        if (isRainyTomorrow) {
          if (spot.weatherPreference === "indoor" || spot.category === "cultural") {
            score += 3; // Bonus for indoor spots when rainy
          } else if (spot.weatherPreference === "outdoor") {
            score -= 2; // Penalty for outdoor spots when rainy
          }
        } else {
          if (spot.weatherPreference === "outdoor" || spot.category === "nature") {
            score += 2; // Bonus for outdoor spots when sunny
          }
        }
        
        // Age group preferences
        if (formData.ageGroup === "child") {
          if (spot.category === "nature") score += 2;
          if (spot.duration > 120) score -= 1;
        } else if (formData.ageGroup === "senior") {
          if (spot.category === "cultural") score += 2;
          if (spot.duration > 90) score -= 1;
        }
        
        // Transportation considerations
        if (formData.transportation === "train") {
          // Prefer spots closer to station (simplified logic)
          if (["東照宮", "輪王寺", "二荒山神社"].includes(spot.name)) {
            score += 2;
          }
        }
        
        // Group size considerations
        if (formData.groupSize > 5) {
          if (spot.category === "hot_springs") score -= 1; // Large groups might have difficulty
        }
        
        return { ...spot, score };
      });

      // Sort by enhanced score
      recommendedSpots.sort((a, b) => b.score - a.score);
      
      // Smart selection considering travel efficiency
      const selectedSpots = selectOptimalRoute(recommendedSpots, maxDuration, formData.transportation);
      
      // Calculate times
      const totalSpotTime = selectedSpots.reduce((sum, spot) => sum + spot.duration, 0);
      const travelTime = calculateTravelTime(selectedSpots, formData.transportation);
      
      setGeneratedPlan({
        spots: selectedSpots,
        totalTime: totalSpotTime + travelTime,
        travelTime: travelTime,
        recommendations: generateRecommendations(selectedSpots, formData, weatherData),
        weatherConsideration: isRainyTomorrow ? "雨予報のため屋内スポットを優先しました" : "好天予報のため屋外スポットも含めました"
      });
    } catch (error) {
      console.error("Plan generation error:", error);
      // Fallback to simple plan generation
      generateSimplePlan();
    }
  };

  const selectOptimalRoute = (spots: any[], maxDuration: number, transportation: string) => {
    const selected = [];
    let totalTime = 0;
    const travelTimePerSpot = transportation === "car" ? 15 : 30;
    
    // Prioritize geographically close spots
    const culturalSpots = spots.filter(s => s.category === "cultural");
    const natureSpots = spots.filter(s => s.category === "nature");
    const hotSpringSpots = spots.filter(s => s.category === "hot_springs");
    
    // Select top spots from each category
    for (const spot of culturalSpots.slice(0, 2)) {
      if (totalTime + spot.duration + (selected.length * travelTimePerSpot) <= maxDuration) {
        selected.push(spot);
        totalTime += spot.duration;
      }
    }
    
    for (const spot of natureSpots.slice(0, 2)) {
      if (totalTime + spot.duration + (selected.length * travelTimePerSpot) <= maxDuration) {
        selected.push(spot);
        totalTime += spot.duration;
      }
    }
    
    for (const spot of hotSpringSpots.slice(0, 1)) {
      if (totalTime + spot.duration + (selected.length * travelTimePerSpot) <= maxDuration) {
        selected.push(spot);
        totalTime += spot.duration;
      }
    }
    
    return selected.slice(0, 6); // Max 6 spots
  };

  const calculateTravelTime = (spots: any[], transportation: string) => {
    if (spots.length <= 1) return 0;
    
    const baseTimePerMove = transportation === "car" ? 15 : 30;
    let totalTravelTime = (spots.length - 1) * baseTimePerMove;
    
    // Add extra time for distant spots
    const hasDistantSpots = spots.some(spot => 
      ["華厳の滝", "中禅寺湖", "いろは坂", "奥日光温泉"].includes(spot.name)
    );
    
    if (hasDistantSpots) {
      totalTravelTime += transportation === "car" ? 30 : 60;
    }
    
    return totalTravelTime;
  };

  const generateSimplePlan = () => {
    // Fallback simple plan generation (original logic)
    let recommendedSpots = [...spots];
    const maxDuration = {
      "2hours": 120,
      "halfday": 240,
      "fullday": 480,
      "1night2days": 960,
      "2nights3days": 1440
    }[formData.duration] || 240;

    recommendedSpots.sort((a, b) => b.popularity - a.popularity);
    
    let totalTime = 0;
    const selectedSpots = [];
    
    for (const spot of recommendedSpots) {
      if (totalTime + spot.duration <= maxDuration) {
        selectedSpots.push(spot);
        totalTime += spot.duration;
      }
      if (selectedSpots.length >= 6) break;
    }

    const travelTimePerSpot = formData.transportation === "car" ? 15 : 30;
    const totalTravelTime = selectedSpots.length > 1 ? (selectedSpots.length - 1) * travelTimePerSpot : 0;

    setGeneratedPlan({
      spots: selectedSpots,
      totalTime: totalTime + totalTravelTime,
      travelTime: totalTravelTime,
      recommendations: generateRecommendations(selectedSpots, formData)
    });
  };

  const generateRecommendations = (spots: any[], formData: any, weatherData?: any) => {
    const recommendations = [];
    
    // Weather-based recommendations
    if (weatherData?.tomorrow) {
      const isRainy = weatherData.tomorrow.description?.includes("雨") || weatherData.tomorrow.precipitation > 0.5;
      const isCold = weatherData.tomorrow.temperature < 15;
      const isHot = weatherData.tomorrow.temperature > 25;
      
      if (isRainy) {
        recommendations.push("明日は雨の予報です。傘や雨具をお忘れなく。");
        if (spots.some(spot => spot.weatherPreference === "outdoor")) {
          recommendations.push("屋外スポットは雨天時は見学が困難な場合があります。");
        }
      }
      
      if (isCold) {
        recommendations.push("気温が低めです。防寒着をご準備ください。");
      } else if (isHot) {
        recommendations.push("暑くなる予報です。日焼け止めと水分補給をお忘れなく。");
      }
    }
    
    // Spot-based recommendations
    if (spots.some(spot => spot.category === "nature")) {
      recommendations.push("自然スポットが含まれています。歩きやすい靴をおすすめします。");
    }
    
    if (spots.some(spot => spot.category === "cultural")) {
      recommendations.push("文化スポットでは写真撮影のマナーにご注意ください。");
    }
    
    if (spots.some(spot => spot.category === "hot_springs")) {
      recommendations.push("温泉スポットが含まれています。タオルをお持ちください。");
    }
    
    // Transportation recommendations
    if (formData.transportation === "train") {
      recommendations.push("電車利用の場合、バスの時刻表も事前に確認しましょう。");
      if (spots.some(spot => ["華厳の滝", "中禅寺湖"].includes(spot.name))) {
        recommendations.push("奥日光エリアは電車+バスでアクセスできます。");
      }
    } else if (formData.transportation === "car") {
      recommendations.push("駐車場の確認をおすすめします。");
      if (spots.some(spot => spot.name === "いろは坂")) {
        recommendations.push("いろは坂は紅葉シーズンは渋滞の可能性があります。");
      }
    }
    
    // Group size recommendations
    if (formData.groupSize > 5) {
      recommendations.push("大人数の場合は事前に施設に連絡しておくと安心です。");
    }
    
    // Age group recommendations
    if (formData.ageGroup === "child") {
      recommendations.push("お子様連れの場合は休憩スポットも確認しておきましょう。");
    } else if (formData.ageGroup === "senior") {
      recommendations.push("ゆっくりとしたペースでお楽しみください。");
    }
    
    // Duration-based recommendations
    if (formData.duration === "2hours") {
      recommendations.push("短時間の滞在なので効率よく回りましょう。");
    } else if (formData.duration === "1night2days" || formData.duration === "2nights3days") {
      recommendations.push("宿泊プランの場合は温泉も楽しめます。");
    }
    
    return recommendations;
  };

  return (
    <div className="space-y-6 text-white">
      <Form className="space-y-6">
        {/* Duration Selection */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-white">滞在時間</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { value: "2hours", label: "2時間" },
              { value: "halfday", label: "半日" },
              { value: "fullday", label: "1日" },
              { value: "1night2days", label: "1泊2日" },
              { value: "2nights3days", label: "2泊3日" }
            ].map(option => (
              <label key={option.value} className="cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="duration"
                  value={option.value}
                  checked={formData.duration === option.value}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  className="radio radio-primary"
                />
                <span className="ml-2 text-sm text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Group Size */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-white">人数</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.groupSize}
            onChange={(e) => handleInputChange("groupSize", parseInt(e.target.value))}
            className="range range-primary"
          />
          <div className="w-full flex justify-between text-xs px-2 text-gray-300">
            <span>1人</span>
            <span>5人</span>
            <span>10人</span>
          </div>
          <p className="text-center mt-2 font-semibold text-white">{formData.groupSize}人</p>
        </div>

        {/* Age Group */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-white">年齢層</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { value: "child", label: "子供連れ" },
              { value: "adult", label: "大人" },
              { value: "senior", label: "シニア" },
              { value: "mixed", label: "混合" }
            ].map(option => (
              <label key={option.value} className="cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="ageGroup"
                  value={option.value}
                  checked={formData.ageGroup === option.value}
                  onChange={(e) => handleInputChange("ageGroup", e.target.value)}
                  className="radio radio-secondary"
                />
                <span className="ml-2 text-sm text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Transportation */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-white">交通手段</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "car", label: "🚗 車" },
              { value: "train", label: "🚃 電車" },
              { value: "bus", label: "🚌 バス" }
            ].map(option => (
              <label key={option.value} className="cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="transportation"
                  value={option.value}
                  checked={formData.transportation === option.value}
                  onChange={(e) => handleInputChange("transportation", e.target.value)}
                  className="radio radio-accent"
                />
                <span className="ml-2 text-sm text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={generatePlan}
          className="btn btn-primary w-full text-lg py-3"
          disabled={!userLocation}
        >
          {!userLocation ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              位置情報取得中...
            </>
          ) : (
            <>
              🎯 プランを生成する
            </>
          )}
        </button>
      </Form>

      {/* Generated Plan Display */}
      {generatedPlan && (
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            ✨ あなたにおすすめのプラン
          </h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              総所要時間: {Math.floor(generatedPlan.totalTime / 60)}時間{generatedPlan.totalTime % 60}分 
              （移動時間 {generatedPlan.travelTime}分を含む）
            </p>
          </div>

          <div className="space-y-4">
            {generatedPlan.spots.map((spot: any, index: number) => (
              <div key={spot.id} className="flex items-center space-x-4 p-3 bg-white rounded-lg">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{spot.name}</h4>
                  <p className="text-sm text-gray-600">{spot.description}</p>
                  <p className="text-xs text-blue-600">
                    所要時間: {Math.floor(spot.duration / 60)}時間{spot.duration % 60 > 0 ? `${spot.duration % 60}分` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`badge ${
                    spot.category === 'cultural' ? 'badge-primary' :
                    spot.category === 'nature' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {spot.category === 'cultural' ? '文化' :
                     spot.category === 'nature' ? '自然' : '温泉'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {generatedPlan.weatherConsideration && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🌤️ 天気を考慮したプラン</h4>
              <p className="text-sm text-blue-700">{generatedPlan.weatherConsideration}</p>
            </div>
          )}

          {generatedPlan.recommendations.length > 0 && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 おすすめポイント・持ち物</h4>
              <ul className="space-y-1">
                {generatedPlan.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="text-sm text-yellow-700">• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}