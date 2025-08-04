import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/samsung-daily-board.css';

interface Widget {
  id: string;
  type: 'weather' | 'notes' | 'home-status' | 'camera' | 'energy' | 'music' | 'tips';
  data?: any;
}

const SamsungDailyBoard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusedIndex, setFocusedIndex] = useState(0); // TV remote focus management
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const widgets: Widget[] = useMemo(() => [
    {
      id: 'weather',
      type: 'weather',
      data: {
        temperature: '16°C',
        condition: 'Partly Cloudy',
        hourly: [
          { time: '8AM', icon: '🌤️', temp: '15°' },
          { time: '12PM', icon: '☁️', temp: '17°' },
          { time: '4PM', icon: '☁️', temp: '16°' }
        ]
      }
    },
    {
      id: 'home-status',
      type: 'home-status',
      data: {
        temperature: '26°',
        humidity: '67.3%',
        lights: '3 Turn On'
      }
    },
    {
      id: 'camera',
      type: 'camera',
      data: {
        name: 'Living Room Cam',
        location: 'Living Room',
        lastUpdated: '09/25 11:30',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
      }
    },
    {
      id: 'energy',
      type: 'energy',
      data: {
        percentage: '7.2%',
        monthlyUsage: '$999,999',
        monthlyTarget: '$999,999',
        progressValue: 7.2
      }
    },
    {
      id: 'music',
      type: 'music',
      data: {
        isPlaying: false,
        track: 'Never too late',
        artist: 'Blue Illusion'
      }
    },
    {
      id: 'notes',
      type: 'notes',
      data: {
        message: 'Happy Birthday!',
        from: 'From Lisa',
        date: 'Mon, August 7'
      }
    },
    {
      id: 'tips',
      type: 'tips',
      data: {
        message: 'Press and hold the widget to change order'
      }
    }
  ], []);

  // TV Remote Navigation - Arrow Keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, widgets.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [widgets.length]);

  // Auto-scroll to ALWAYS center the focused widget - RESPONSIVE
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      // Get actual responsive values from CSS
      const style = getComputedStyle(document.documentElement);
      const widgetWidth = parseInt(style.getPropertyValue('--widget-width'));
      const widgetGap = parseInt(style.getPropertyValue('--widget-gap'));
      const totalWidgetWidth = widgetWidth + widgetGap;
      
      const containerWidth = container.offsetWidth;
      
      // Calculate position of focused widget
      const widgetLeft = focusedIndex * totalWidgetWidth;
      const widgetCenter = widgetLeft + (widgetWidth / 2);
      
      // Calculate scroll position to center this widget in viewport
      const viewportCenter = containerWidth / 2;
      const targetScroll = widgetCenter - viewportCenter;
      
      // Always scroll to center the focused widget
      container.scrollTo({
        left: Math.max(0, targetScroll), // Don't scroll past start
        behavior: 'smooth'
      });
    }
  }, [focusedIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Memoized widget components to prevent unnecessary re-renders
  const widgetComponents = useMemo(() => [
    // Weather Widget
    <div key="weather" className={`samsung-widget weather-card ${focusedIndex === 0 ? 'focused' : ''}`}>
      <div className="widget-header">
        <span className="widget-icon weather-icon">🌤️</span>
        <span className="widget-title">Weather</span>
      </div>
      <div className="weather-content">
        <div className="weather-main">
          <div className="weather-icon-large">
            <div className="cloud-sun-icon">
              <div className="cloud"></div>
              <div className="sun"></div>
            </div>
          </div>
          <div className="temperature-display">16°C</div>
          <div className="weather-condition">Partly Cloudy</div>
        </div>
        <div className="hourly-forecast">
          <div className="hourly-item">
            <div className="hour">8AM</div>
            <div className="hourly-icon">🌤️</div>
            <div className="hourly-temp">15°</div>
          </div>
          <div className="hourly-item">
            <div className="hour">12PM</div>
            <div className="hourly-icon">☁️</div>
            <div className="hourly-temp">17°</div>
          </div>
          <div className="hourly-item">
            <div className="hour">4PM</div>
            <div className="hourly-icon">☁️</div>
            <div className="hourly-temp">16°</div>
          </div>
        </div>
      </div>
    </div>,
    
    // Home Status Widget
    <div key="home-status" className={`samsung-widget home-status-card ${focusedIndex === 1 ? 'focused' : ''}`}>
      <div className="widget-header">
        <span className="widget-icon">🏠</span>
        <span className="widget-title">Home status</span>
      </div>
      <div className="home-status-content">
        <div className="status-item">
          <div className="status-icon-container">
            <span className="status-icon temp-icon">🌡️</span>
          </div>
          <span className="status-value">26°C</span>
        </div>
        <div className="status-item">
          <div className="status-icon-container">
            <span className="status-icon humidity-icon">💧</span>
          </div>
          <span className="status-value">67.3%</span>
        </div>
        <div className="status-item">
          <div className="status-icon-container">
            <span className="status-icon light-icon">💡</span>
          </div>
          <span className="status-value">3 On</span>
        </div>
      </div>
      <div className="pagination-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>,
    
    // Camera Widget
    <div key="camera" className={`samsung-widget camera-card ${focusedIndex === 2 ? 'focused' : ''}`}>
      <div className="widget-header">
        <span className="widget-icon">📷</span>
        <span className="widget-title">Camera</span>
      </div>
      <div className="camera-content">
        <div className="camera-feed">
          <img 
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" 
            alt="Front Door Cam" 
            className="camera-image"
          />
        </div>
        <div className="camera-info">
          <div className="camera-name">Front Door Cam</div>
          <div className="camera-location">Front Door</div>
          <div className="camera-timestamp">Last updated: 09/25 11:30</div>
        </div>
      </div>
    </div>,
    
    // Energy Widget
    <div key="energy" className={`samsung-widget energy-card ${focusedIndex === 3 ? 'focused' : ''}`}>
      <div className="widget-header">
        <span className="widget-icon">⚡</span>
        <span className="widget-title">Energy</span>
      </div>
      <div className="energy-content">
        <div className="energy-percentage">
          <span className="energy-big-text">7.2%</span>
        </div>
        <div className="energy-message">
          You've used <span className="energy-percentage-inline">7.2%</span> of your monthly target.
        </div>
        <div className="energy-progress">
          <div className="progress-item">
            <div className="progress-label">So far this month</div>
            <div className="progress-bar">
              <div className="progress-fill current" style={{width: '7.2%'}}></div>
            </div>
            <div className="progress-value">28,218</div>
          </div>
          <div className="progress-item">
            <div className="progress-label">Monthly target</div>
            <div className="progress-bar">
              <div className="progress-fill target" style={{width: '100%'}}></div>
            </div>
            <div className="progress-value">50,000</div>
          </div>
        </div>
      </div>
    </div>,
    
    // Music Widget
    <div key="music" className={`samsung-widget music-card ${focusedIndex === 4 ? 'focused' : ''}`}>
      <div className="widget-header">
        <span className="widget-icon">🎵</span>
        <span className="widget-title">Music</span>
      </div>
      <div className="music-content">
        <div className="album-artwork">
          <div 
            className="album-cover"
            style={{
              backgroundImage: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
            }}
          >
            <div className="play-pause-button">
              <span className="pause-icon">▶️</span>
            </div>
          </div>
        </div>
        <div className="track-info">
          <div className="track-name">Never too late</div>
          <div className="artist-name">Blue Illusion</div>
        </div>
      </div>
    </div>,
    
    // Notes Widget
    <div key="notes" className={`samsung-widget notes-card ${focusedIndex === 5 ? 'focused' : ''}`}>
      <div className="widget-header">
        <span className="widget-icon">📝</span>
        <span className="widget-title">Notes</span>
      </div>
      <div className="notes-content">
        <div className="note-message">Happy Birthday!</div>
        <div className="note-from">From Lisa</div>
        <div className="note-date">Mon, August 7</div>
      </div>
    </div>,
    
    // Tips Widget
    <div key="tips" className={`samsung-widget tips-card ${focusedIndex === 6 ? 'focused' : ''}`}>
      <div className="widget-header">
        <span className="widget-icon">💡</span>
        <span className="widget-title">Tips</span>
      </div>
      <div className="tips-content">
        <div className="tip-illustration">
          <div className="widget-preview">
            <div className="preview-item"></div>
            <div className="preview-item highlighted"></div>
            <div className="preview-item"></div>
          </div>
        </div>
        <div className="tip-message">Press and hold the widget to change order</div>
      </div>
    </div>
  ], [focusedIndex]); // Only re-create when focusedIndex changes

  return (
    <div className="samsung-daily-board-real" tabIndex={0}>
      {/* Dynamic Background */}
      <div className="dynamic-background">
        <div className="flow-lines"></div>
      </div>

      {/* Time Display - Top Left */}
      <div className="time-display-corner">
        <div className="current-time">
          {currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        </div>
        <div className="current-date">
          {currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Widget Row with TV Remote Navigation */}
      <div className="widgets-container" ref={scrollContainerRef}>
        {widgetComponents}
      </div>

      {/* Focus Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dots">
          {widgets.map((_, i) => (
            <span 
              key={i} 
              className={`scroll-dot ${focusedIndex === i ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="navigation-hint">
        Use ← → arrow keys to navigate | Current Focus: {focusedIndex}
      </div>
    </div>
  );
};

export default SamsungDailyBoard;