import React, { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from './types/weather';
import { WeatherService } from './services/weatherService';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { getBackgroundGradient } from './utils/weatherUtils';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useLocalStorage<'C' | 'F'>('temperatureUnit', 'C');
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recentSearches', []);

  const loadWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const [weatherData, forecastData] = await Promise.all([
        WeatherService.getCurrentWeather(city),
        WeatherService.getForecast(city)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      
      // Add to recent searches
      setRecentSearches(prev => {
        const filtered = prev.filter(search => search.toLowerCase() !== city.toLowerCase());
        return [city, ...filtered].slice(0, 5);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const loadWeatherByLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const location = await WeatherService.getCurrentLocation();
      const [weatherData, forecastData] = await Promise.all([
        WeatherService.getCurrentWeatherByCoords(location.lat, location.lon),
        WeatherService.getForecast(`${location.lat},${location.lon}`)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location weather');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load default city weather on app start
    loadWeatherData('London');
  }, []);

  const handleRetry = () => {
    if (weather?.name) {
      loadWeatherData(weather.name);
    } else {
      loadWeatherData('London');
    }
  };

  const handleUnitToggle = () => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  const backgroundGradient = weather 
    ? getBackgroundGradient(weather.weather[0].main, true)
    : 'from-blue-400 via-blue-500 to-blue-600';

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  const isSupabaseConnected = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={loadWeatherData}
            onLocationSearch={loadWeatherByLocation}
            loading={loading}
            recentSearches={recentSearches}
            onClearRecent={handleClearRecentSearches}
          />
        </div>

        {/* Weather Content */}
        {weather && forecast && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Current Weather - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <WeatherCard 
                weather={weather} 
                unit={unit}
                onUnitToggle={handleUnitToggle}
              />
            </div>
            
            {/* Forecast - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <ForecastCard forecast={forecast} unit={unit} />
            </div>
          </div>
        )}

        {/* Status Notice */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-2xl mx-auto border border-white/20">
            <p className="text-white/80 text-sm">
              {isSupabaseConnected ? (
                <>
                  <strong>🔒 Secure API:</strong> Weather data is fetched through secure Supabase Edge Functions with real OpenWeatherMap data.
                </>
              ) : (
                <>
                  <strong>🎭 Demo Mode:</strong> Using demo weather data. 
                  <span className="text-orange-300">
                    {' '}Connect to Supabase to enable live weather data with your OpenWeatherMap API key.
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}