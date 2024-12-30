/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react'
import { useState } from 'react';


const Dashboard = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');
    const [error, setError] = useState('');
  
    const API_KEY = 'eae8802f363074ff372cdb1e971e48c8';
  
    const fetchWeather = async() =>{
      if (!city) {
        setError('Please enter a city');
        return;
      }
      try{
        setError('');
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      }
      catch (err){
          setError('City not found! Please try again.');
          setWeather(null);
      }
    };
    return (
      
      <div className="min-h-screen bg-blue-200 flex flex-col items-center p-10">
        
        <h1 className='text-2xl font-bold mb-6 text-gray-800'>Weather Dashboard</h1>
        <div className='flex flex-col items-center w-full max-w-md'>
          <input
            type='text'
            placeholder='Enter city name'
            value={city}
            onChange={(e)=> setCity(e.target.value)}
            className='p-2 rounded-md border border-gray-300 w-full mb-4'
            />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Get Weather
          </button>
        </div>
        
        {error && <p className='text-red-500 mt-4'>{error}</p>}
  
        {weather && (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-sm mx-auto mt-10 animate-slideUp">
            <h2 className="text-lg text-blue-800 font-semibold">{weather.name}, {weather.sys.country}</h2>
            <p className="text-gray-600">{weather.weather[0].description}</p>
            <p className="text-4xl text-indigo-800 font-bold mt-2">{Math.round(weather.main.temp)}°C</p>
            
  
          </div>
        )}
      </div>
   
    );
}

export default Dashboard