import React, { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  high: number;
  low: number;
  humidity: number;
  icon: string;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 72,
    condition: 'Partly Cloudy',
    location: 'San Francisco, CA',
    high: 78,
    low: 65,
    humidity: 68,
    icon: '🌤️'
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
      <div className="widget-title">Weather</div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: 'var(--spacing-md)'
      }}>
        <div>
          <div style={{ 
            fontSize: 'var(--font-size-2xl)', 
            fontWeight: '100',
            lineHeight: '1'
          }}>
            {weather.temperature}°
          </div>
          <div style={{ 
            fontSize: 'var(--font-size-sm)', 
            color: 'var(--secondary-text)',
            marginTop: 'var(--spacing-xs)'
          }}>
            {weather.condition}
          </div>
        </div>
        
        <div style={{ 
          fontSize: 'var(--font-size-xl)',
          opacity: 0.8
        }}>
          {weather.icon}
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--secondary-text)',
        marginBottom: 'var(--spacing-sm)'
      }}>
        <span>H: {weather.high}°</span>
        <span>L: {weather.low}°</span>
        <span>💧 {weather.humidity}%</span>
      </div>
      
      <div style={{ 
        fontSize: 'var(--font-size-xs)', 
        color: 'var(--accent-text)',
        textAlign: 'center'
      }}>
        📍 {weather.location}
      </div>
    </div>
  );
};

export default WeatherWidget;