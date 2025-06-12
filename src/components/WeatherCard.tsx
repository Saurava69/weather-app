import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset,
  Navigation
} from 'lucide-react';
import { WeatherData } from '../types/weather';
import { 
  getWeatherIcon, 
  formatTime, 
  getWindDirection,
  capitalizeWords
} from '../utils/weatherUtils';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'C' | 'F';
  onUnitToggle: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ 
  weather, 
  unit, 
  onUnitToggle 
}) => {
  const temperature = unit === 'C' 
    ? Math.round(weather.main.temp)
    : Math.round((weather.main.temp * 9/5) + 32);
  
  const feelsLike = unit === 'C' 
    ? Math.round(weather.main.feels_like)
    : Math.round((weather.main.feels_like * 9/5) + 32);

  const tempMin = unit === 'C' 
    ? Math.round(weather.main.temp_min)
    : Math.round((weather.main.temp_min * 9/5) + 32);

  const tempMax = unit === 'C' 
    ? Math.round(weather.main.temp_max)
    : Math.round((weather.main.temp_max * 9/5) + 32);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30">
      {/* Location and Time */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {weather.name}, {weather.sys.country}
        </h1>
        <p className="text-white/80 text-lg">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Current Weather */}
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">
          {getWeatherIcon(weather.weather[0].icon, weather.weather[0].main)}
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl font-light text-white">
            {temperature}
          </span>
          <div className="flex flex-col items-start">
            <button
              onClick={onUnitToggle}
              className="text-2xl text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              °{unit}
            </button>
            <span className="text-sm text-white/60">
              Feels like {feelsLike}°
            </span>
          </div>
        </div>
        <p className="text-xl text-white/90 capitalize mb-2">
          {capitalizeWords(weather.weather[0].description)}
        </p>
        <p className="text-white/70">
          H: {tempMax}° L: {tempMin}°
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Thermometer className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm font-medium">Feels Like</span>
          </div>
          <p className="text-xl font-semibold text-white">{feelsLike}°{unit}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm font-medium">Humidity</span>
          </div>
          <p className="text-xl font-semibold text-white">{weather.main.humidity}%</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Wind className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm font-medium">Wind</span>
          </div>
          <p className="text-xl font-semibold text-white">
            {Math.round(weather.wind.speed * 3.6)} km/h
          </p>
          <p className="text-xs text-white/60">
            {getWindDirection(weather.wind.deg)}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm font-medium">Visibility</span>
          </div>
          <p className="text-xl font-semibold text-white">
            {Math.round(weather.visibility / 1000)} km
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Gauge className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm font-medium">Pressure</span>
          </div>
          <p className="text-xl font-semibold text-white">{weather.main.pressure} hPa</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Navigation className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm font-medium">UV Index</span>
          </div>
          <p className="text-xl font-semibold text-white">Moderate</p>
        </div>
      </div>

      {/* Sun Times */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Sunrise className="w-5 h-5 text-orange-300" />
            <span className="text-white/80 text-sm font-medium">Sunrise</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {formatTime(weather.sys.sunrise, weather.timezone)}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Sunset className="w-5 h-5 text-orange-300" />
            <span className="text-white/80 text-sm font-medium">Sunset</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {formatTime(weather.sys.sunset, weather.timezone)}
          </p>
        </div>
      </div>
    </div>
  );
};