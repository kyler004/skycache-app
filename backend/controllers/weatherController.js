import axios from "axios";
import SearchLog from "../models/searchLog.js";
import weatherCache from "../utils/cache.js";

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (req, res, next) => {
  try {
    const { city } = req.query; // ?city=Paris or ?city=Yaoundé

    if (!city) {
      return res
        .status(400)
        .json({ message: "City query parameter is required" });
    }

    // 1. Check cache first
    const cacheKey = `weather_${city.toLowerCase().trim()}`;
    const cachedData = weatherCache.get(cacheKey);

    if (cachedData) {
      console.log(`Cache hit for ${city} `);
      // Still log the search even on cache hit (for history)
      await new SearchLog({ city }).save().catch(() => {}); // silent fail ok here
      return res.json(cachedData);
    }

    // 2. Call external API
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric", // Celsius
        lang: "en", // you can make dynamic later
      },
    });

    const rawData = response.data;

    // 3. Transform/shape data (clean & frontend-friendly)
    const weatherData = {
      city: rawData.name,
      country: rawData.sys.country,
      temp: Math.round(rawData.main.temp),
      feels_like: Math.round(rawData.main.feels_like),
      description: rawData.weather[0].description,
      icon: rawData.weather[0].icon, // e.g. "01d" → use with http://openweathermap.org/img/wn/01d@2x.png
      humidity: rawData.main.humidity,
      wind_speed: rawData.wind.speed,
      timestamp: new Date().toISOString(),
    };

    // 4. Cache it
    weatherCache.set(cacheKey, weatherData);
    console.log(`Cached weather for ${city} ⏱️`);

    // 5. Log search to DB
    await new SearchLog({ city: weatherData.city }).save();

    res.json(weatherData);
  } catch (error) {
    // Important: classify errors
    if (error.response) {
      // OpenWeather responded with error (e.g. 404 city not found, 401 bad key, 429 rate limit)
      const status = error.response.status;
      let message = "Error fetching weather";

      if (status === 404) message = "City not found";
      if (status === 429)
        message = "Rate limit exceeded – please try again later";
      if (status === 401) message = "Invalid API key (server issue)";

      return res.status(status).json({ message });
    }

    // Network error, timeout, etc.
    next(error); // pass to global error handler (we'll add next step)
  }
};
