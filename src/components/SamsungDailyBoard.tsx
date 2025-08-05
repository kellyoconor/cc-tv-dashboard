import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/samsung-daily-board.css';

interface Widget {
  id: string;
  type: 'weather' | 'sports' | 'connected-devices' | 'watching' | 'internet-usage' | 'music' | 'traffic';
  data?: any;
}

const SamsungDailyBoard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusedIndex, setFocusedIndex] = useState(0); // TV remote focus management
  const [weatherUpdating, setWeatherUpdating] = useState(false); // For update animations
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
      id: 'connected-devices',
      type: 'connected-devices',
      data: {
        totalDevices: 23,
        status: 'Online',
        categories: [
          { name: 'Phones & Tablets', count: 7, icon: '📱' },
          { name: 'TV & Video', count: 4, icon: '📺' },
          { name: 'Smart Home', count: 9, icon: '🏠' },
          { name: 'Gaming', count: 3, icon: '🎮' }
        ]
      }
    },
    {
      id: 'watching',
      type: 'watching',
      data: {
        showTitle: 'Love Island',
        currentEpisode: 12,
        totalEpisodes: 45,
        nextEpisode: {
          day: 'Tonight',
          time: '9:00 PM'
        },
        category: 'Your Shows'
      }
    },
    {
      id: 'internet-usage',
      type: 'internet-usage',
      data: {
        usedGB: 333,
        totalGB: 1200,
        remainingGB: 867,
        percentage: 28,
        speed: 'Fast',
        threatsBlocked: 6
      }
    },
    {
      id: 'music',
      type: 'music',
      data: {
        isPlaying: true,
        track: "You're on your own, kid",
        artist: 'Taylor Swift',
        album: 'Midnights'
      }
    },
    {
      id: 'sports',
      type: 'sports',
      data: {
        status: 'Final',
        homeTeam: 'Phillies',
        awayTeam: 'Braves',
        homeScore: 7,
        awayScore: 4,
        venue: 'Citizens Bank Park',
        gameTime: '3:15 Game Time',
        nextGame: 'Next Game vs Mets'
      }
    },
    {
      id: 'traffic',
      type: 'traffic',
      data: {
        destination: 'Downtown Office',
        arrivalTime: '10:13 AM arrival',
        route: 'via I-95 North',
        duration: '22 min',
        trafficStatus: 'Moderate Traffic',
        status: 'Live Traffic'
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

  // Simulate weather updates with animation
  useEffect(() => {
    const weatherUpdateTimer = setInterval(() => {
      setWeatherUpdating(true);
      
      // Remove updating class after animation completes
      setTimeout(() => {
        setWeatherUpdating(false);
      }, 800);
    }, 45000); // Update every 45 seconds

    return () => clearInterval(weatherUpdateTimer);
  }, []);

  // Memoized widget components to prevent unnecessary re-renders
  const widgetComponents = useMemo(() => [
    // Weather Widget - Modern Design
    <div key="weather" className={`samsung-widget weather-card modern-weather ${focusedIndex === 0 ? 'focused' : ''}`}>
      {/* Top Section */}
             <div className="weather-top-section">
         <div className="weather-condition-badge">
           <div className="weather-badge-icon">
             <svg 
               width="20" 
               height="20" 
               viewBox="0 0 64 64" 
               className="weather-icon-svg"
             >
               <defs>
                 <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#f3f7fe"/>
                   <stop offset="1" stopColor="#deeafb"/>
                 </linearGradient>
               </defs>
               <circle cx="26" cy="26" r="10" stroke="#72b9d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" fill="none">
                 <animate attributeName="stroke-dasharray" dur="6s" repeatCount="indefinite" values="0 31.416;15.708 15.708;0 31.416"/>
               </circle>
               <path d="M17.5,46.5c0-4.583,4.167-8.5,9-8.5a9.424,9.424,0,0,1,2,.238,7,7,0,0,1,13-2.238c.333,0,.667.084,1,.084A4.5,4.5,0,0,1,46.5,41c0,2.833-2.333,5.5-5.5,5.5Z" stroke="#e6effc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" fill="url(#a)"/>
             </svg>
           </div>
           <span>Partly Cloudy</span>
         </div>
        <div className="feels-like">
          <span className="feels-like-label">Feels like</span>
          <span className="feels-like-temp">75°</span>
        </div>
      </div>

      {/* Main Temperature Section */}
      <div className="weather-main-section">
        <div className="main-temperature">
          <span className={`temperature-large ${weatherUpdating ? 'updating' : ''}`}>72°</span>
          <span className="temperature-unit">F</span>
        </div>
        <div className="location-info">Philadelphia, PA</div>
      </div>

      {/* Weather Details */}
             <div className="weather-details-grid">
         <div className="weather-detail-item">
           <div className="detail-icon">
             <svg width="24" height="24" viewBox="0 0 64 64" className="detail-icon-svg">
               <defs>
                 <linearGradient id="humidity" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#3392d6"/>
                   <stop offset="1" stopColor="#2078b9"/>
                 </linearGradient>
               </defs>
               <path d="M32,17S42,27.6,42,36a10,10,0,0,1-20,0C22,27.6,32,17,32,17Z" fill="url(#humidity)" stroke="#2078b9" strokeMiterlimit="10" strokeWidth="1">
                 <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="scale" values="1 1;1.2 0.8;1 1"/>
               </path>
             </svg>
           </div>
           <div className="detail-label">Humidity</div>
           <div className="detail-value">65%</div>
         </div>
         <div className="weather-detail-item">
           <div className="detail-icon">
             <svg width="24" height="24" viewBox="0 0 64 64" className="detail-icon-svg">
               <path d="M43.64,20a5,5,0,1,1,3.61,8.46L21.69,53.23a5,5,0,1,1-3.61-8.46Z" fill="#72b9d5" opacity="0">
                 <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="translate" values="-20 -11;20 11;-20 -11"/>
                 <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0;1;0"/>
               </path>
               <path d="M29.64,44a5,5,0,1,1,3.61,8.46L7.69,77.23a5,5,0,1,1-3.61-8.46Z" fill="#72b9d5" opacity="0">
                 <animateTransform attributeName="transform" dur="1.5s" begin="0.5s" repeatCount="indefinite" type="translate" values="-20 -11;20 11;-20 -11"/>
                 <animate attributeName="opacity" dur="1.5s" begin="0.5s" repeatCount="indefinite" values="0;1;0"/>
               </path>
             </svg>
           </div>
           <div className="detail-label">Wind</div>
           <div className="detail-value">8 mph</div>
         </div>
         <div className="weather-detail-item">
           <div className="detail-icon">
             <svg width="24" height="24" viewBox="0 0 64 64" className="detail-icon-svg">
               <path d="M32,21.5C23.5,21.5,16.5,28,12.5,32c4,4,11,10.5,19.5,10.5S51.5,36,55.5,32C51.5,28,44.5,21.5,32,21.5Z" fill="none" stroke="#72b9d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                 <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.5;1;0.5"/>
               </path>
               <circle cx="32" cy="32" r="6" fill="#72b9d5">
                 <animate attributeName="r" dur="3s" repeatCount="indefinite" values="6;8;6"/>
                 <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.8;1;0.8"/>
               </circle>
               <circle cx="32" cy="32" r="3" fill="#ffffff" opacity="0.8">
                 <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.8;0.4;0.8"/>
               </circle>
             </svg>
           </div>
           <div className="detail-label">Visibility</div>
           <div className="detail-value">10 mi</div>
         </div>
       </div>
    </div>,
    
    // Connected Devices Widget
    <div key="connected-devices" className={`samsung-widget connected-devices-card ${focusedIndex === 1 ? 'focused' : ''}`}>
             {/* Top Section */}
       <div className="devices-top-section">
         <div className="connected-devices-badge">
           <span className="status-dot"></span>
           <span>Connected Devices</span>
         </div>
       </div>

      {/* Main Device Count */}
      <div className="devices-main-section">
        <div className="device-count">
          <span className="count-number">23</span>
          <span className="count-label">devices</span>
        </div>
      </div>

      {/* Device Categories */}
      <div className="device-categories">
                 <div className="category-item">
           <div className="category-icon">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="device-icon-svg">
               <rect x="5" y="4" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
               <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
               <rect x="7" y="7" width="10" height="8" rx="1" fill="currentColor" opacity="0.2"/>
             </svg>
           </div>
           <div className="category-count">7</div>
           <div className="category-label">Phones &<br />Tablets</div>
         </div>
         <div className="category-item">
           <div className="category-icon">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="device-icon-svg">
               <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
               <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="1.5"/>
               <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5"/>
               <rect x="4" y="5" width="16" height="10" rx="1" fill="currentColor" opacity="0.2"/>
             </svg>
           </div>
           <div className="category-count">4</div>
           <div className="category-label">TV & Video</div>
         </div>
         <div className="category-item">
           <div className="category-icon">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="device-icon-svg">
               <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
               <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2"/>
               <circle cx="12" cy="8" r="1" fill="currentColor"/>
             </svg>
           </div>
           <div className="category-count">9</div>
           <div className="category-label">Smart Home</div>
         </div>
         <div className="category-item">
           <div className="category-icon">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="device-icon-svg">
               <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
               <circle cx="15" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
               <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
               <rect x="8" y="6" width="8" height="4" rx="1" fill="currentColor" opacity="0.2"/>
               <rect x="10" y="16" width="4" height="2" rx="1" fill="currentColor" opacity="0.2"/>
             </svg>
           </div>
           <div className="category-count">3</div>
           <div className="category-label">Gaming</div>
         </div>
      </div>
    </div>,
    
        // Watching Widget
    <div key="watching" className={`samsung-widget watching-card ${focusedIndex === 2 ? 'focused' : ''}`}>
             {/* Watching Badge */}
      <div className="watching-badge">
        <div className="play-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="play-icon-svg">
            <polygon points="5,3 19,12 5,21" fill="currentColor"/>
          </svg>
        </div>
        <span>Watching</span>
      </div>

      {/* Show Title */}
      <div className="show-title">Love Island</div>

      {/* Episode Progress Section */}
      <div className="episode-progress-section">
        <div className="progress-header">
          <span className="progress-label">Episode Progress</span>
          <span className="episode-count">12/45</span>
        </div>
        <div className="episode-progress-bar">
          <div className="progress-fill-watching" style={{width: `${(12/45) * 100}%`}}></div>
        </div>
      </div>

      {/* Next Episode Section */}
      <div className="next-episode-section">
        <div className="next-episode-header">
          <div className="calendar-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="calendar-icon-svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <span className="next-episode-title">Next Episode</span>
        </div>
        <div className="next-episode-time">
          <span className="episode-day">Tonight</span>
          <div className="time-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="time-icon-svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="episode-time">9:00 PM</span>
        </div>
      </div>
    </div>,
    
    // Internet Usage Widget
    <div key="internet-usage" className={`samsung-widget internet-usage-card ${focusedIndex === 3 ? 'focused' : ''}`}>
      {/* Top Section */}
      <div className="internet-top-section">
                 <div className="internet-usage-badge">
           <div className="wifi-icon">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="badge-icon-svg">
               <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
               <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
               <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
               <line x1="12" y1="20" x2="12.01" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
             </svg>
           </div>
           <span>Internet Usage</span>
         </div>
        <div className="connection-speed">
          <span className="speed-label">Fast</span>
          <div className="signal-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>

      {/* Main Usage Section */}
      <div className="internet-main-section">
        <div className="usage-display">
          <span className="usage-number">333</span>
          <span className="usage-unit">GB used</span>
        </div>
        <div className="remaining-info">867 GB remaining this month</div>
      </div>

      {/* Progress and Footer */}
      <div className="internet-footer-section">
        <div className="usage-progress-bar">
          <div className="progress-fill-internet" style={{width: '28%'}}></div>
        </div>
        <div className="footer-stats">
          <div className="percentage-info">28% of 1200 GB</div>
                     <div className="security-info">
             <div className="shield-icon">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="security-icon-svg">
                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
                 <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </div>
             <span>6 threats blocked</span>
           </div>
        </div>
      </div>
    </div>,
    
    // Music Widget - Editorial Style
    <div key="music" className={`samsung-widget music-card editorial-music ${focusedIndex === 4 ? 'focused' : ''}`}>
      {/* Now Playing Badge */}
      <div className="now-playing-badge">
        <div className="badge-icon">
          <div className="audio-bar"></div>
          <div className="audio-bar"></div>
          <div className="audio-bar"></div>
        </div>
        <span>Now Playing</span>
      </div>
      
      {/* Track Info Overlay */}
      <div className="track-info-overlay">
        <div className="track-name">Anti-Hero</div>
        <div className="artist-name">Taylor Swift</div>
        <div className="album-name">Midnights</div>
        
        {/* Progress Bar with Time */}
        <div className="progress-container">
          <div className="time-display">
            <span className="current-time">1:24</span>
            <div className="track-progress-full">
              <div className="progress-fill-music"></div>
            </div>
            <span className="total-time">3:44</span>
          </div>
        </div>
      </div>
    </div>,
    
    // Sports Widget
    <div key="sports" className={`samsung-widget sports-card ${focusedIndex === 5 ? 'focused' : ''}`}>
      {/* Final Badge */}
      <div className="sports-status-badge">
        <div className="trophy-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="trophy-icon-svg">
            <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M18 20H6a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="6" y="3" width="12" height="12" rx="2" fill="currentColor" opacity="0.3"/>
            <circle cx="12" cy="8" r="2" fill="currentColor"/>
          </svg>
        </div>
        <span>Final</span>
      </div>
      
      {/* Next Game */}
      <div className="next-game">
        Next Game<br />vs Mets
      </div>
      
      {/* Teams and Scores */}
      <div className="teams-scores">
        <div className="team-score">
          <span className="team-name">Phillies</span>
          <span className="score">7</span>
        </div>
        <div className="team-score">
          <span className="team-name">Braves</span>
          <span className="score">4</span>
        </div>
      </div>
      
             {/* Game Info */}
       <div className="game-info">
         <div className="venue">
           <div className="venue-icon">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="venue-icon-svg">
               <ellipse cx="12" cy="12" rx="10" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
               <ellipse cx="12" cy="12" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2"/>
               <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5"/>
               <path d="M12 4v16" stroke="currentColor" strokeWidth="1.5"/>
             </svg>
           </div>
           <span>Citizens Bank Park</span>
         </div>
         <div className="game-time">
           <div className="time-icon">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="time-icon-svg">
               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
               <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
               <circle cx="12" cy="12" r="1" fill="currentColor"/>
             </svg>
           </div>
           <span>3:15 Game Time</span>
         </div>
       </div>
    </div>,
    
              // Traffic Widget
     <div key="traffic" className={`samsung-widget traffic-card ${focusedIndex === 6 ? 'focused' : ''}`}>
       {/* Live Traffic Badge */}
       <div className="traffic-badge">
         <div className="traffic-icon">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="traffic-icon-svg">
             <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
             <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
         </div>
         <span>Live Traffic</span>
       </div>

       {/* CarPlay-Style Mini Map */}
       <div className="mini-map-container">
         <svg width="100%" height="160" viewBox="0 0 200 160" className="mini-map">
           {/* Background Streets (subtle) */}
           <path d="M 0 40 L 200 40" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
           <path d="M 0 80 L 200 80" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
           <path d="M 0 120 L 200 120" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
           <path d="M 40 0 L 40 160" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
           <path d="M 80 0 L 80 160" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
           <path d="M 120 0 L 120 160" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
           <path d="M 160 0 L 160 160" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
           
           {/* Main Route - I-95 with Traffic Segments */}
           {/* Green segment (clear traffic) */}
           <path d="M 20 80 L 80 80" stroke="#34D399" strokeWidth="10" strokeLinecap="round"/>
           {/* Yellow segment (moderate traffic) */}
           <path d="M 80 80 L 140 80" stroke="#FBBF24" strokeWidth="10" strokeLinecap="round"/>
           {/* Green segment (clear again) */}
           <path d="M 140 80 L 180 80" stroke="#34D399" strokeWidth="10" strokeLinecap="round"/>
           
           {/* Current Location (blue dot) */}
           <circle cx="20" cy="80" r="6" fill="#007AFF" stroke="white" strokeWidth="2">
             <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite"/>
           </circle>
           
           {/* Destination Pin */}
           <g transform="translate(180,80)">
             <circle cx="0" cy="0" r="5" fill="#FF3B30"/>
             <path d="M 0 -12 C -5 -12 -7 -8 -7 -5 C -7 0 0 7 0 7 C 0 7 7 0 7 -5 C 7 -8 5 -12 0 -12 Z" fill="#FF3B30"/>
           </g>
         </svg>
       </div>

       {/* Route Info */}
       <div className="route-info-section">
         <div className="route-instruction">Downtown Office</div>
         <div className="route-details">
           <span className="distance">8.2 miles</span>
           <span className="separator">•</span>
           <span className="eta">10:13 AM arrival</span>
           <span className="separator">•</span>
           <span className="route-name">I-95 North</span>
         </div>
       </div>

       {/* Traffic Status */}
       <div className="traffic-status-section">
         <div className="duration-info">
           <div className="clock-icon">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="clock-icon-svg">
               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
               <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
             </svg>
           </div>
           <span className="duration">22 min</span>
           <span className="traffic-condition">Moderate Traffic</span>
         </div>
       </div>
     </div>
  ], [focusedIndex, weatherUpdating]); // Re-create when focusedIndex or weatherUpdating changes

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