import React from "react";
import {
  Search,
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  CloudRain,
  MapPin,
} from "lucide-react";
import { useWeather } from "./hooks/useWeather";
import { getWeatherIconUrl } from "./utils/weatherIcon";

export default function WeatherApp() {
  const {
    city,
    setCity,
    weather,
    loading,
    error,
    recentSearches,
    clearHistory,
  } = useWeather();

  const handleSearch = (e) => {
    e.preventDefault();
    // fetchWeather is triggered automatically by the hook when 'city' changes
    // But if we want it to trigger only on button click, we'd need to adjust the hook.
    // Given the current hook implementation, it's debounced on input change.
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 flex items-center justify-center p-8">
      <div className="flex gap-8 max-w-7xl w-full">
        {/* Main Weather Card */}
        <div className="relative w-2/3 h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image - Dynamic based on weather if possible, but keeping current default */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1585377776757-396916bea17f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          />

          {/* Overlay linear */}
          <div className="absolute inset-0 bg-linear-to-br from-teal-700/40 via-cyan-600/30 to-slate-600/40" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-10">
            {/* Logo */}
            <div className="flex justify-between items-start">
              <div className="text-white text-sm font-light tracking-wider flex items-center gap-2">
                <CloudRain className="w-5 h-5" />
                SKYCACHE
              </div>
              {loading && (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              )}
            </div>

            {/* Weather Display */}
            {weather ? (
              <div className="text-white">
                <div className="flex items-start gap-4 mb-2">
                  <h1 className="text-[120px] font-light leading-none tracking-tight">
                    {weather.temp}°
                  </h1>
                  <img
                    src={getWeatherIconUrl(weather.icon)}
                    alt={weather.description}
                    className="w-24 h-24 mt-4"
                  />
                </div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-4xl font-light">{weather.city}</h2>
                  <span className="text-xl font-thin opacity-60">
                    | {weather.country}
                  </span>
                </div>
                <p className="text-sm font-light opacity-80">
                  {new Date(weather.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(weather.timestamp).toLocaleDateString([], {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  })}
                </p>
                <p className="text-lg font-light mt-1 capitalize">
                  {weather.description}
                </p>
              </div>
            ) : error ? (
              <div className="text-white bg-red-500/20 backdrop-blur-md p-6 rounded-2xl border border-red-500/50">
                <h3 className="text-xl font-medium mb-2">Oops!</h3>
                <p className="opacity-90">{error}</p>
              </div>
            ) : (
              <div className="text-white">
                <h1 className="text-6xl font-thin leading-tight">
                  Discover
                  <br />
                  Your Weather
                </h1>
                <p className="mt-4 text-xl font-light opacity-70">
                  Search for any city to see current conditions...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-1/3 flex flex-col gap-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-gray-800/50 backdrop-blur-md text-gray-200 placeholder-gray-500 px-6 py-4 rounded-2xl border border-gray-700/50 focus:outline-none focus:border-teal-500/50 transition-all shadow-lg"
            />
            <button
              type="button"
              onClick={() => setCity(city)} // Just re-trigger if needed, though hook handles it
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-600/80 hover:bg-teal-600 p-3 rounded-xl transition-colors shadow-inner"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </form>

          {/* Recent Searches Sidebar */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-3xl p-6 border border-gray-700/30 flex-1 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-light flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                Recent Searches
              </h3>
              {recentSearches.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-[10px] text-gray-500 hover:text-red-400 uppercase tracking-widest transition-colors font-medium bg-gray-900/40 px-3 py-1.5 rounded-lg border border-gray-700/30 active:scale-95"
                >
                  Empty History
                </button>
              )}
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
              {recentSearches.length === 0 ? (
                <p className="text-gray-500 text-sm italic px-4">
                  No recent searches yet
                </p>
              ) : (
                recentSearches.map((log) => (
                  <button
                    key={log._id}
                    onClick={() => setCity(log.city)}
                    className="w-full text-left px-6 py-4 text-gray-400 hover:text-white hover:bg-teal-600/20 rounded-2xl transition-all duration-200 border border-transparent hover:border-teal-500/30 group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-light">{log.city}</span>
                      <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Weather Details (Only if weather available) */}
            {weather && (
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <h3 className="text-white text-lg font-light mb-6">
                  Weather Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                      <Thermometer className="w-4 h-4 text-orange-400" />
                      <span className="text-gray-400 text-sm">Feels like</span>
                    </div>
                    <span className="text-white font-light">
                      {weather.feels_like}°
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                      <Droplets className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">Humidity</span>
                    </div>
                    <span className="text-white font-light">
                      {weather.humidity}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                      <Wind className="w-4 h-4 text-teal-300" />
                      <span className="text-gray-400 text-sm">Wind</span>
                    </div>
                    <span className="text-white font-light">
                      {weather.wind_speed} m/s
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
