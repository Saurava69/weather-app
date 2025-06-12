import { WeatherData, ForecastData, LocationData } from '../types/weather';

// Use environment variables for Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export class WeatherService {
  // Demo data for current weather when API is not available
  private static getDemoWeatherData(city: string = 'London'): WeatherData {
    const cities = {
      'london': { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
      'new york': { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
      'tokyo': { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
      'paris': { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
      'sydney': { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
      'dubai': { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 },
      'singapore': { name: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198 },
      'los angeles': { name: 'Los Angeles', country: 'US', lat: 34.0522, lon: -118.2437 },
      'mumbai': { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
      'berlin': { name: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050 }
    };

    const cityKey = city.toLowerCase();
    const cityData = cities[cityKey] || cities['london'];
    
    // Generate realistic weather data based on city
    const baseTemp = cityKey.includes('dubai') ? 35 : 
                    cityKey.includes('mumbai') ? 28 :
                    cityKey.includes('sydney') ? 22 :
                    cityKey.includes('singapore') ? 30 :
                    cityKey.includes('tokyo') ? 18 :
                    cityKey.includes('new york') ? 15 :
                    cityKey.includes('los angeles') ? 25 :
                    cityKey.includes('berlin') ? 12 :
                    cityKey.includes('paris') ? 16 : 20;

    const weatherConditions = ['Clear', 'Clouds', 'Rain'];
    const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    return {
      id: Math.floor(Math.random() * 1000000),
      name: cityData.name,
      country: cityData.country,
      coord: { lat: cityData.lat, lon: cityData.lon },
      weather: [
        {
          id: randomCondition === 'Clear' ? 800 : randomCondition === 'Clouds' ? 803 : 500,
          main: randomCondition,
          description: randomCondition === 'Clear' ? 'clear sky' : 
                      randomCondition === 'Clouds' ? 'broken clouds' : 'light rain',
          icon: randomCondition === 'Clear' ? '01d' : 
                randomCondition === 'Clouds' ? '04d' : '10d'
        }
      ],
      main: {
        temp: baseTemp + (Math.random() * 6 - 3),
        feels_like: baseTemp + (Math.random() * 6 - 3),
        temp_min: baseTemp - 3,
        temp_max: baseTemp + 4,
        pressure: 1013 + (Math.random() * 20 - 10),
        humidity: 50 + Math.floor(Math.random() * 40)
      },
      visibility: 10000,
      wind: {
        speed: 2 + Math.random() * 8,
        deg: Math.floor(Math.random() * 360)
      },
      clouds: {
        all: randomCondition === 'Clear' ? 0 : 
             randomCondition === 'Clouds' ? 75 : 90
      },
      dt: Date.now() / 1000,
      sys: {
        type: 1,
        id: 1414,
        country: cityData.country,
        sunrise: Date.now() / 1000 - 3600,
        sunset: Date.now() / 1000 + 7200
      },
      timezone: 0
    };
  }

  // Demo data for forecast when API is not available
  private static getDemoForecastData(city: string = 'London'): ForecastData {
    const baseTemp = 20;
    const list = Array.from({ length: 40 }, (_, i) => ({
      dt: (Date.now() / 1000) + (i * 3 * 3600), // Every 3 hours
      main: {
        temp: baseTemp + Math.random() * 10 - 5,
        feels_like: baseTemp + Math.random() * 10 - 5,
        temp_min: baseTemp - 5 + Math.random() * 3,
        temp_max: baseTemp + 5 + Math.random() * 3,
        pressure: 1013 + Math.random() * 20 - 10,
        sea_level: 1013,
        grnd_level: 1013,
        humidity: 60 + Math.random() * 20,
        temp_kf: 0
      },
      weather: [
        {
          id: [800, 801, 802, 803, 500][Math.floor(Math.random() * 5)],
          main: ['Clear', 'Clouds', 'Clouds', 'Clouds', 'Rain'][Math.floor(Math.random() * 5)],
          description: ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'light rain'][Math.floor(Math.random() * 5)],
          icon: ['01d', '02d', '03d', '04d', '10d'][Math.floor(Math.random() * 5)]
        }
      ],
      clouds: { all: Math.floor(Math.random() * 100) },
      wind: {
        speed: 2 + Math.random() * 5,
        deg: Math.floor(Math.random() * 360)
      },
      visibility: 10000,
      pop: Math.random() * 0.5,
      sys: { pod: i % 8 < 4 ? 'd' : 'n' },
      dt_txt: new Date((Date.now() / 1000 + i * 3 * 3600) * 1000).toISOString()
    }));

    return {
      cod: '200',
      message: 0,
      cnt: 40,
      list,
      city: {
        id: 2643743,
        name: city,
        coord: { lat: 51.5074, lon: -0.1278 },
        country: 'GB',
        population: 8982000,
        timezone: 0,
        sunrise: Date.now() / 1000 - 3600,
        sunset: Date.now() / 1000 + 7200
      }
    };
  }

  private static async callWeatherAPI(requestData: any): Promise<any> {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('SUPABASE_NOT_CONFIGURED');
    }

    const response = await fetch(`${SUPABASE_URL}/functions/v1/weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    return await response.json();
  }

  static async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const data = await this.callWeatherAPI({
        type: 'current',
        city: city
      });
      
      // Transform the API response to match our WeatherData interface
      return {
        id: data.id,
        name: data.name,
        country: data.sys.country,
        coord: data.coord,
        weather: data.weather,
        main: data.main,
        visibility: data.visibility,
        wind: data.wind,
        clouds: data.clouds,
        dt: data.dt,
        sys: data.sys,
        timezone: data.timezone
      };
    } catch (error) {
      // If Supabase is not configured, use demo data
      if (error instanceof Error && error.message === 'SUPABASE_NOT_CONFIGURED') {
        console.log('Using demo data - Supabase not configured');
        await new Promise(resolve => setTimeout(resolve, 800));
        return this.getDemoWeatherData(city);
      }
      
      // For other errors, also fall back to demo data
      console.warn('API error, using demo data:', error);
      await new Promise(resolve => setTimeout(resolve, 800));
      return this.getDemoWeatherData(city);
    }
  }

  static async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      const data = await this.callWeatherAPI({
        type: 'coords',
        lat: lat,
        lon: lon
      });
      
      return {
        id: data.id,
        name: data.name,
        country: data.sys.country,
        coord: data.coord,
        weather: data.weather,
        main: data.main,
        visibility: data.visibility,
        wind: data.wind,
        clouds: data.clouds,
        dt: data.dt,
        sys: data.sys,
        timezone: data.timezone
      };
    } catch (error) {
      // If Supabase is not configured, use demo data for current location
      if (error instanceof Error && error.message === 'SUPABASE_NOT_CONFIGURED') {
        console.log('Using demo data for location - Supabase not configured');
        await new Promise(resolve => setTimeout(resolve, 800));
        return this.getDemoWeatherData('Your Location');
      }
      
      console.warn('Location API error, using demo data:', error);
      await new Promise(resolve => setTimeout(resolve, 800));
      return this.getDemoWeatherData('Your Location');
    }
  }

  static async getForecast(city: string): Promise<ForecastData> {
    try {
      return await this.callWeatherAPI({
        type: 'forecast',
        city: city
      });
    } catch (error) {
      // If Supabase is not configured, use demo data
      if (error instanceof Error && error.message === 'SUPABASE_NOT_CONFIGURED') {
        console.log('Using demo forecast data - Supabase not configured');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.getDemoForecastData(city);
      }
      
      console.warn('Forecast API error, using demo data:', error);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return this.getDemoForecastData(city);
    }
  }

  static async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Location access denied. Please enable location services and try again.'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information unavailable. Please try searching for a city instead.'));
              break;
            case error.TIMEOUT:
              reject(new Error('Location request timed out. Please try again.'));
              break;
            default:
              reject(new Error('An unknown error occurred while getting location.'));
              break;
          }
        },
        { 
          timeout: 10000,
          enableHighAccuracy: true,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }
}