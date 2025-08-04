import React, { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  high: number;
  low: number;
  humidity: number;
  icon: string;
  backgroundImage: string;
  description: string;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 72,
    condition: 'Partly Cloudy',
    location: 'San Francisco, CA',
    high: 78,
    low: 65,
    humidity: 68,
    icon: '🌤️',
    backgroundImage: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=240&fit=crop',
    description: 'Perfect weather for outdoor activities'
  });

  const getWeatherIcon = (condition: string): string => {
    const iconMap: { [key: string]: string } = {
      'sunny': '☀️',
      'partly cloudy': '🌤️',
      'cloudy': '☁️',
      'rainy': '🌧️',
      'stormy': '⛈️',
      'snowy': '❄️',
      'foggy': '🌫️'
    };
    return iconMap[condition.toLowerCase()] || '🌤️';
  };

  useEffect(() => {
    // Simulate weather updates every 30 minutes
    const weatherTimer = setInterval(() => {
      // In a real app, this would fetch from a weather API
      const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      setWeather(prev => ({
        ...prev,
        condition: randomCondition,
        icon: getWeatherIcon(randomCondition),
        temperature: Math.floor(Math.random() * 20) + 65 // 65-85°F
      }));
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(weatherTimer);
  }, []);

  return (
    <div className="widget weather-widget">
      {/* Temperature and icon */}
      <div className="flex items-center justify-between mb-md">
        <div className="heading-lg">{weather.temperature}°</div>
        <div style={{ fontSize: '24px', opacity: 0.8 }}>{weather.icon}</div>
      </div>
      
      {/* Condition */}
      <div className="body-lg mb-sm">{weather.condition}</div>
      
      {/* Location */}
      <div className="body-base mb-md">{weather.location}</div>
      
      {/* High/Low */}
      <div className="flex justify-between body-sm">
        <span>High {weather.high}°</span>
        <span>Low {weather.low}°</span>
      </div>
    </div>
  );
};

export default WeatherWidget;