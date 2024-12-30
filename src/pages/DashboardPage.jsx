/* eslint-disable no-unused-vars */
import axios from "axios";
import React from "react";
import { useState } from "react";
import {
  WiCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSmoke,
  WiSnow,
} from "react-icons/wi";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");

  const API_KEY = "eae8802f363074ff372cdb1e971e48c8";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found! Please try again.");
      setWeather(null);
    }
  };

  const getWeatherBackground = (temp) => {
    if (temp > 30)
      return "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500";
    if (temp > 20)
      return "bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500";
    return "bg-gradient-to-r from-blue-600 via-gray-500 to-gray-800";
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return null;

    switch (condition) {
      case "Clear":
        return <WiDaySunny className="text-yellow-400 text-6xl mx-auto" />;
      case "Clouds":
        return <WiCloudy className="text-gray-400 text-6xl mx-auto" />;
      case "Rain":
        return <WiRain className="text-blue-400 text-6xl mx-auto" />;
      case "Snow":
        return <WiSnow className="text-white text-6xl mx-auto" />;
      case "Fog":
        return <WiFog className="text-gray-300 text-6xl mx-auto" />;
      case "Smoke":
        return <WiSmoke className="text-gray-500 text-6xl mx-auto" />;
      default:
        return <WiCloudy className="text-gray-400 text-6xl mx-auto" />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col items-center justify-center p-10 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Weather Dashboard
        </h1>
        <div className="flex flex-col items-center w-full max-w-md">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 rounded-md border border-gray-300 w-full mb-4"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Get Weather
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {weather && (
          <div
            className={`mt-10 p-6 rounded-lg shadow-lg text-center text-white ${getWeatherBackground(
              weather.main.temp
            )}`}
          >
            <h2 className="text-lg text-white-800 font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            {weather.weather && weather.weather[0] && (
              <div className="mt-4">
                {getWeatherIcon(weather.weather[0].main)}
                <p className="capitalize mt-2 text-lg">
                  {weather.weather[0].description}
                </p>
              </div>
            )}
            <p className="text-4xl text-white-800 font-bold mt-2">
              {Math.round(weather.main.temp)}°C
            </p>
            <div className="mt-4 text-sm">
              <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind speed: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
