import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
  loading: boolean;
  recentSearches: string[];
  onClearRecent: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onLocationSearch, 
  loading,
  recentSearches,
  onClearRecent
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const popularCities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney', 
    'Dubai', 'Singapore', 'Los Angeles', 'Mumbai', 'Berlin'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setQuery('');
    setShowSuggestions(false);
    // Add a small delay to ensure the dropdown closes before triggering search
    setTimeout(() => {
      onSearch(city);
    }, 100);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!showSuggestions) {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter popular cities based on query
  const filteredPopularCities = popularCities.filter(city => 
    city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-20 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
            disabled={loading}
          />
          <button
            type="button"
            onClick={onLocationSearch}
            disabled={loading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-300 hover:text-white transition-colors duration-200 disabled:opacity-50"
            title="Use current location"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </form>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden z-50">
          {recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearRecent();
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.slice(0, 3).map((city, index) => (
                  <button
                    key={`recent-${index}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCitySelect(city);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    disabled={loading}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Popular Cities</h3>
            <div className="grid grid-cols-2 gap-1">
              {filteredPopularCities.slice(0, 8).map((city, index) => (
                <button
                  key={`popular-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCitySelect(city);
                  }}
                  className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  disabled={loading}
                >
                  {city}
                </button>
              ))}
            </div>
            
            {query && filteredPopularCities.length === 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">
                  Press Enter to search for "{query}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};