import React from "react";
import { useWeather } from "./hooks/useWeather";
import { getWeatherIconUrl } from "./utils/weatherIcon";

function App() {
  const { city, setCity, weather, loading, error, recentSearches } =
    useWeather();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
          SkyCache Weather
        </h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city... (e.g. Yaoundé)"
            className="w-full px-5 py-4 rounded-full shadow-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Weather Card */}
          <div className="md:col-span-2">
            {loading && (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Loading weather...
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg text-center">
                {error}
              </div>
            )}

            {weather && !loading && !error && (
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 transition-all hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                      {weather.city}, {weather.country}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">
                      {weather.description}
                    </p>
                  </div>
                  <img
                    src={getWeatherIconUrl(weather.icon)}
                    alt={weather.description}
                    className="w-24 h-24"
                  />
                </div>

                <div className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  {weather.temp}°C
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Feels like
                    </p>
                    <p className="text-xl font-semibold">
                      {weather.feels_like}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Humidity
                    </p>
                    <p className="text-xl font-semibold">{weather.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Wind
                    </p>
                    <p className="text-xl font-semibold">
                      {weather.wind_speed} m/s
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Updated
                    </p>
                    <p className="text-sm">
                      {new Date(weather.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!weather && !loading && !error && (
              <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                Enter a city to see the weather ✨
              </div>
            )}
          </div>

          {/* Recent Searches Sidebar */}
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Recent Searches
            </h3>
            {recentSearches.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No searches yet
              </p>
            ) : (
              <ul className="space-y-3">
                {recentSearches.map((log) => (
                  <li key={log._id}>
                    <button
                      onClick={() => setCity(log.city)}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                    >
                      {log.city} •{" "}
                      {new Date(log.timestamp).toLocaleDateString()}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
