export const getWeatherIcon = (iconCode: string, condition: string) => {
  // Map weather conditions to appropriate icons
  const iconMap: { [key: string]: string } = {
    '01d': '☀️', // clear sky day
    '01n': '🌙', // clear sky night
    '02d': '⛅', // few clouds day
    '02n': '☁️', // few clouds night
    '03d': '☁️', // scattered clouds
    '03n': '☁️',
    '04d': '☁️', // broken clouds
    '04n': '☁️',
    '09d': '🌧️', // shower rain
    '09n': '🌧️',
    '10d': '🌦️', // rain day
    '10n': '🌧️', // rain night
    '11d': '⛈️', // thunderstorm
    '11n': '⛈️',
    '13d': '❄️', // snow
    '13n': '❄️',
    '50d': '🌫️', // mist
    '50n': '🌫️'
  };

  return iconMap[iconCode] || '☀️';
};

export const getBackgroundGradient = (condition: string, isDay: boolean = true) => {
  const gradients = {
    Clear: isDay 
      ? 'from-blue-400 via-blue-500 to-blue-600' 
      : 'from-indigo-900 via-purple-900 to-gray-900',
    Clouds: isDay 
      ? 'from-gray-400 via-gray-500 to-gray-600' 
      : 'from-gray-800 via-gray-900 to-black',
    Rain: 'from-gray-600 via-gray-700 to-gray-800',
    Thunderstorm: 'from-gray-800 via-gray-900 to-black',
    Snow: 'from-blue-200 via-blue-300 to-blue-400',
    Mist: 'from-gray-300 via-gray-400 to-gray-500',
    Fog: 'from-gray-300 via-gray-400 to-gray-500'
  };

  return gradients[condition as keyof typeof gradients] || gradients.Clear;
};

export const formatTime = (timestamp: number, timezoneOffset: number = 0) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const kelvinToCelsius = (temp: number) => Math.round(temp - 273.15);
export const celsiusToFahrenheit = (temp: number) => Math.round((temp * 9/5) + 32);

export const getWindDirection = (degrees: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const capitalizeWords = (str: string) => {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};