import React from 'react';
import { Calendar } from 'lucide-react';
import { ForecastData } from '../types/weather';
import { getWeatherIcon, formatDate, capitalizeWords } from '../utils/weatherUtils';

interface ForecastCardProps {
  forecast: ForecastData;
  unit: 'C' | 'F';
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  // Group forecast by day and get daily summary
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = formatDate(item.dt);
    if (!acc[date]) {
      acc[date] = {
        date,
        items: [],
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather[0]
      };
    }
    
    acc[date].items.push(item);
    acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
    acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
    
    return acc;
  }, {} as any);

  const dailyEntries = Object.values(dailyForecast).slice(0, 5);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/30">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-white/80" />
        <h2 className="text-2xl font-bold text-white">5-Day Forecast</h2>
      </div>

      <div className="space-y-4">
        {dailyEntries.map((day: any, index) => {
          const tempMin = unit === 'C' 
            ? Math.round(day.temp_min)
            : Math.round((day.temp_min * 9/5) + 32);
          
          const tempMax = unit === 'C' 
            ? Math.round(day.temp_max)
            : Math.round((day.temp_max * 9/5) + 32);

          return (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">
                    {getWeatherIcon(day.weather.icon, day.weather.main)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {index === 0 ? 'Today' : day.date}
                    </p>
                    <p className="text-white/70 text-sm capitalize">
                      {capitalizeWords(day.weather.description)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">
                      {tempMax}°
                    </span>
                    <span className="text-lg text-white/60">
                      {tempMin}°
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};