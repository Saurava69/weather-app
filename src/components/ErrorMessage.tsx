import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 max-w-md text-center">
        <AlertTriangle className="w-16 h-16 text-orange-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
        <p className="text-white/80 mb-6 leading-relaxed">{message}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 border border-white/30"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
};