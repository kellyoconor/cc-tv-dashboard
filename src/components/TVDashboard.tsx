import React from 'react';
import TimeDisplay from './TimeDisplay';
import WeatherWidget from './WeatherWidget';
import CalendarWidget from './CalendarWidget';
import NewsWidget from './NewsWidget';
import StocksWidget from './StocksWidget';
import LifestyleWidget from './LifestyleWidget';

const TVDashboard: React.FC = () => {
  return (
    <div className="tv-dashboard">
      {/* Top Section - Time and Weather */}
      <div className="time-weather">
        <TimeDisplay />
        <WeatherWidget />
      </div>
      
      {/* Main Content Area */}
      <div className="main-content">
        <CalendarWidget />
        <NewsWidget />
      </div>
      
      {/* Sidebar */}
      <div className="sidebar">
        <StocksWidget />
        <LifestyleWidget />
      </div>
      
      {/* Bottom Bar - Could include additional info or controls */}
      <div className="bottom-bar">
        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--accent-text)' }}>
          Ambient TV Dashboard
        </div>
        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--accent-text)' }}>
          {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TVDashboard;