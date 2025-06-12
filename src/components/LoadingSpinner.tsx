import React from 'react';
import { CloudRain } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="relative">
        <CloudRain className="w-16 h-16 text-white/80 animate-bounce" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-xl font-medium text-white/90">
        Loading weather data...
      </p>
      <p className="mt-2 text-sm text-white/70">
        Fetching the latest conditions
      </p>
    </div>
  );
};