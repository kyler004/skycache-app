// src/hooks/useWeather.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const API_BASE = import.meta.env.VITE_API_URL;

export const useWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // Fetch recent searches once on mount
  useEffect(() => {
    fetchRecentSearches();
  }, []);

  const fetchRecentSearches = async () => {
    try {
      const res = await axios.get(`${API_BASE}/search/logs`);
      setRecentSearches(res.data); // Removed slice to support scrollable list
    } catch (err) {
      console.error("Failed to load recent searches", err);
    }
  };

  const clearHistory = async () => {
    try {
      await axios.delete(`${API_BASE}/search`);
      setRecentSearches([]);
    } catch (err) {
      console.error("Failed to clear history", err);
    }
  };

  const fetchWeather = useCallback(
    debounce(async (searchCity) => {
      if (!searchCity.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${API_BASE}/weather`, {
          params: { city: searchCity },
        });
        setWeather(res.data);
        // Refresh recent searches after successful search
        fetchRecentSearches();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch weather");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }, 500), // 500ms debounce
    [],
  );

  // Trigger fetch when city changes (via input)
  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city, fetchWeather]);

  return {
    city,
    setCity,
    weather,
    loading,
    error,
    recentSearches,
    clearHistory,
  };
};
