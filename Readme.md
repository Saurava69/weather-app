# 🌤️ Weather App - Beautiful Weather Forecasts

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS. Get accurate weather forecasts with a beautiful, intuitive interface that adapts to current weather conditions.

![Weather App Preview](https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🎯 Core Functionality
- **Current Weather**: Real-time weather data for any city worldwide
- **5-Day Forecast**: Detailed weather predictions with daily summaries
- **Location-Based Weather**: Automatic weather detection using GPS
- **Search Functionality**: Smart search with recent searches and popular cities
- **Unit Conversion**: Toggle between Celsius and Fahrenheit

### 🎨 Design & UX
- **Dynamic Backgrounds**: Beautiful gradients that change based on weather conditions
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Micro-interactions and transitions for enhanced UX
- **Glass Morphism**: Modern backdrop blur effects and transparency
- **Weather Icons**: Contextual emoji icons for different weather conditions

### 🔧 Technical Features
- **TypeScript**: Full type safety and better development experience
- **Local Storage**: Persistent settings and recent searches
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Demo Mode**: Works without API keys using realistic demo data
- **Secure API**: Weather data fetched through Supabase Edge Functions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- (Optional) Supabase account for live weather data
- (Optional) OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

The app will work immediately in demo mode with realistic weather data!

## 🔑 Live Weather Data Setup (Optional)

To enable real weather data, you'll need to set up Supabase and OpenWeatherMap:

### Step 1: Get OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard

### Step 2: Set up Supabase
1. Create a [Supabase](https://supabase.com) account
2. Create a new project
3. Get your project URL and anon key from Settings > API

### Step 3: Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```

### Step 4: Deploy Edge Function
The Supabase Edge Function is already configured in `supabase/functions/weather/`. When you connect to Supabase, it will automatically handle the API calls securely.

## 📱 Usage

### Search for Weather
- **City Search**: Type any city name in the search bar
- **Recent Searches**: Click on previously searched cities
- **Popular Cities**: Quick access to major cities worldwide
- **Current Location**: Click the location icon for GPS-based weather

### Weather Information
- **Current Conditions**: Temperature, feels like, humidity, wind, pressure
- **Extended Details**: Visibility, UV index, sunrise/sunset times
- **5-Day Forecast**: Daily highs/lows with weather descriptions
- **Unit Toggle**: Switch between Celsius and Fahrenheit

### Responsive Design
- **Mobile**: Optimized touch interface with stacked layout
- **Tablet**: Balanced grid layout for comfortable viewing
- **Desktop**: Full-width layout with detailed information panels

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with full IntelliSense
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful, customizable icons

### Backend & APIs
- **Supabase**: Backend-as-a-Service for secure API handling
- **Edge Functions**: Serverless functions for API proxy
- **OpenWeatherMap**: Reliable weather data provider

### Development Tools
- **ESLint**: Code linting and quality enforcement
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefixing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.tsx   # Search functionality with suggestions
│   ├── WeatherCard.tsx # Main weather display
│   ├── ForecastCard.tsx# 5-day forecast component
│   ├── LoadingSpinner.tsx# Loading state component
│   └── ErrorMessage.tsx# Error handling component
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts# Persistent storage hook
├── services/           # API and data services
│   └── weatherService.ts# Weather API integration
├── types/              # TypeScript type definitions
│   └── weather.ts      # Weather data interfaces
├── utils/              # Utility functions
│   └── weatherUtils.ts # Weather-related helpers
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports

supabase/
└── functions/
    └── weather/        # Edge function for secure API calls
        └── index.ts    # Weather API proxy
```

## 🎨 Customization

### Themes and Colors
The app uses dynamic backgrounds based on weather conditions. You can customize colors in `src/utils/weatherUtils.ts`:

```typescript
const gradients = {
  Clear: 'from-blue-400 via-blue-500 to-blue-600',
  Clouds: 'from-gray-400 via-gray-500 to-gray-600',
  Rain: 'from-gray-600 via-gray-700 to-gray-800',
  // Add your custom gradients
};
```

### Weather Icons
Customize weather icons in the `getWeatherIcon` function:

```typescript
const iconMap = {
  '01d': '☀️', // clear sky day
  '01n': '🌙', // clear sky night
  // Add your custom icons
};
```

### Popular Cities
Modify the popular cities list in `src/components/SearchBar.tsx`:

```typescript
const popularCities = [
  'London', 'New York', 'Tokyo', 'Paris',
  // Add your preferred cities
];
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Connect your repository to Vercel
2. Environment variables will be automatically detected
3. Deploy with zero configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for reliable weather data
- **Supabase** for backend infrastructure
- **Tailwind CSS** for beautiful styling utilities
- **Lucide** for clean, modern icons
- **Pexels** for beautiful stock photos

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. Include browser version, error messages, and steps to reproduce

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**

*Get accurate weather forecasts with our beautiful, modern weather application. Check current conditions and 5-day forecasts for any city worldwide.*