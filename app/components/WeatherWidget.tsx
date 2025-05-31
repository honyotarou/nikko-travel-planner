import { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure?: number;
  feelsLike?: number;
  visibility?: number;
}

interface WeatherResponse {
  current: WeatherData;
  tomorrow: WeatherData & { precipitation: number };
  hourlyForecast: Array<{
    time: number;
    temperature: number;
    description: string;
    icon: string;
    precipitation: number;
  }>;
  lastUpdated: string;
  isMockData?: boolean;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/weather");
      if (!response.ok) {
        throw new Error("天気情報の取得に失敗しました");
      }
      const data: WeatherResponse = await response.json();
      setWeather(data);
    } catch (err) {
      setError("天気情報の取得に失敗しました");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (description: string) => {
    if (description.includes("晴")) return "☀️";
    if (description.includes("曇")) return "☁️";
    if (description.includes("雨")) return "🌧️";
    if (description.includes("雪")) return "❄️";
    return "🌤️";
  };

  const getWeatherAdvice = (current: WeatherData, tomorrow: WeatherData & { precipitation: number }) => {
    const advice = [];
    
    if (tomorrow.description.includes("雨") || tomorrow.precipitation > 0.5) {
      advice.push("明日は雨の可能性があります");
      advice.push("屋内スポット（東照宮・輪王寺）がおすすめ");
      advice.push("雨具をお忘れなく");
    } else if (tomorrow.description.includes("晴")) {
      advice.push("明日は絶好の観光日和です");
      advice.push("屋外スポット（華厳の滝・中禅寺湖）がおすすめ");
      advice.push("日焼け止めをお忘れなく");
    } else if (tomorrow.description.includes("曇")) {
      advice.push("明日は曇りの予報です");
      advice.push("涼しく過ごしやすい一日になりそうです");
    }
    
    if (tomorrow.temperature < 10) {
      advice.push("防寒着が必要です");
    } else if (tomorrow.temperature > 25) {
      advice.push("水分補給をこまめに");
    } else if (tomorrow.temperature > 15 && tomorrow.temperature < 25) {
      advice.push("過ごしやすい気温です");
    }
    
    if (tomorrow.windSpeed > 7) {
      advice.push("風が強いのでご注意を");
    }
    
    return advice;
  };

  return (
    <div className="card bg-white shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4">
          🌤️ 日光の天気予報
        </h3>
        
        {loading && (
          <div className="text-center py-4">
            <span className="loading loading-spinner loading-md"></span>
            <p className="text-sm text-gray-600 mt-2">天気情報を取得中...</p>
          </div>
        )}
        
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
            <button 
              onClick={fetchWeather}
              className="btn btn-sm btn-outline"
            >
              再試行
            </button>
          </div>
        )}
        
        {weather && !loading && (
          <div className="space-y-4">
            {weather.isMockData && (
              <div className="alert alert-info alert-sm">
                <span className="text-xs">デモデータを表示中（API設定が必要）</span>
              </div>
            )}
            
            {/* Current Weather */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getWeatherIcon(weather.current.description)}</span>
                <div>
                  <p className="text-2xl font-bold">{weather.current.temperature}°C</p>
                  <p className="text-sm text-gray-600">{weather.current.description}</p>
                  {weather.current.feelsLike && (
                    <p className="text-xs text-gray-500">体感 {weather.current.feelsLike}°C</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Tomorrow's Weather */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">📅 明日の天気</h4>
              <div className="flex items-center space-x-3">
                <span className="text-xl">{getWeatherIcon(weather.tomorrow.description)}</span>
                <div>
                  <p className="font-semibold">{weather.tomorrow.temperature}°C</p>
                  <p className="text-xs text-gray-600">{weather.tomorrow.description}</p>
                  {weather.tomorrow.precipitation > 0 && (
                    <p className="text-xs text-blue-600">降水量: {weather.tomorrow.precipitation}mm</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span>💧</span>
                <span>湿度: {weather.current.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💨</span>
                <span>風速: {weather.current.windSpeed}m/s</span>
              </div>
              {weather.current.pressure && (
                <div className="flex items-center space-x-2">
                  <span>🌡️</span>
                  <span>気圧: {weather.current.pressure}hPa</span>
                </div>
              )}
              {weather.current.visibility && (
                <div className="flex items-center space-x-2">
                  <span>👁️</span>
                  <span>視界: {weather.current.visibility}km</span>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-2">🎒 明日の観光アドバイス</h4>
              <ul className="space-y-1">
                {getWeatherAdvice(weather.current, weather.tomorrow).map((advice, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2 mt-0.5">•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              最終更新: {new Date(weather.lastUpdated).toLocaleTimeString('ja-JP')}
            </div>
            
            <button 
              onClick={fetchWeather}
              className="btn btn-sm btn-outline w-full"
            >
              🔄 更新
            </button>
          </div>
        )}
      </div>
    </div>
  );
}