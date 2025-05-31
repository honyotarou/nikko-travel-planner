import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const NIKKO_COORDINATES = {
  lat: 36.7580,
  lon: 139.5994
};

export const loader: LoaderFunction = async ({ request }) => {
  if (!OPENWEATHER_API_KEY) {
    return json(
      { error: "OpenWeatherMap API key not configured" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(request.url);
    const lat = url.searchParams.get("lat") || NIKKO_COORDINATES.lat;
    const lon = url.searchParams.get("lon") || NIKKO_COORDINATES.lon;

    // Current weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=ja`;
    
    // 5-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=ja`;

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const currentWeather = await currentResponse.json();
    const forecast = await forecastResponse.json();

    // Process forecast data to get next 24 hours
    const next24Hours = forecast.list.slice(0, 8); // 8 * 3 hours = 24 hours

    // Get tomorrow's forecast (average of daytime hours)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0); // noon tomorrow
    
    const tomorrowForecast = forecast.list.find((item: any) => {
      const itemDate = new Date(item.dt * 1000);
      return itemDate.getDate() === tomorrow.getDate() && 
             itemDate.getHours() >= 9 && 
             itemDate.getHours() <= 15;
    }) || forecast.list[8]; // fallback to 24h later

    const processedData = {
      current: {
        temperature: Math.round(currentWeather.main.temp),
        description: currentWeather.weather[0].description,
        icon: currentWeather.weather[0].icon,
        humidity: currentWeather.main.humidity,
        windSpeed: Math.round(currentWeather.wind.speed * 10) / 10,
        pressure: currentWeather.main.pressure,
        feelsLike: Math.round(currentWeather.main.feels_like),
        visibility: currentWeather.visibility / 1000, // convert to km
      },
      tomorrow: {
        temperature: Math.round(tomorrowForecast.main.temp),
        description: tomorrowForecast.weather[0].description,
        icon: tomorrowForecast.weather[0].icon,
        humidity: tomorrowForecast.main.humidity,
        windSpeed: Math.round(tomorrowForecast.wind.speed * 10) / 10,
        precipitation: tomorrowForecast.rain?.['3h'] || tomorrowForecast.snow?.['3h'] || 0,
      },
      hourlyForecast: next24Hours.map((item: any) => ({
        time: new Date(item.dt * 1000).getHours(),
        temperature: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        precipitation: item.rain?.['3h'] || item.snow?.['3h'] || 0,
      })),
      lastUpdated: new Date().toISOString(),
    };

    return json(processedData);
  } catch (error) {
    console.error("Weather API error:", error);
    
    // Return mock data as fallback
    const mockData = {
      current: {
        temperature: 18,
        description: "晴れ",
        icon: "01d",
        humidity: 65,
        windSpeed: 3.2,
        pressure: 1013,
        feelsLike: 20,
        visibility: 10,
      },
      tomorrow: {
        temperature: 22,
        description: "曇り",
        icon: "03d",
        humidity: 70,
        windSpeed: 2.5,
        precipitation: 0,
      },
      hourlyForecast: Array.from({ length: 8 }, (_, i) => ({
        time: (new Date().getHours() + i * 3) % 24,
        temperature: 18 + Math.random() * 6,
        description: ["晴れ", "曇り", "小雨"][Math.floor(Math.random() * 3)],
        icon: "01d",
        precipitation: Math.random() * 2,
      })),
      lastUpdated: new Date().toISOString(),
      isMockData: true,
    };

    return json(mockData);
  }
};