import React from 'react';

interface HeroBandProps {
  currentTime: Date;
}

const HeroBand: React.FC<HeroBandProps> = ({ currentTime }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  // Mock weather data - would connect to API
  const weather = {
    temp: 72,
    condition: 'Partly Cloudy',
    icon: '🌤️'
  };

  return (
    <div className="hero-band">
      {/* Time - Primary anchor */}
      <div className="hero-time">
        {formatTime(currentTime)}
      </div>
      
      {/* Date - Secondary anchor */}
      <div className="hero-date">
        {formatDate(currentTime)}
      </div>
      
      {/* Weather - Tertiary anchor */}
      <div className="hero-weather">
        <span className="weather-icon">{weather.icon}</span>
        <span className="weather-temp">{weather.temp}°</span>
        <span className="weather-condition">{weather.condition}</span>
      </div>
    </div>
  );
};

export default HeroBand;