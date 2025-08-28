import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { ReactElement } from 'react';
import '../styles/samsung-daily-board.css';
import '../styles/samsung-layout.css';

interface Widget {
  id: string;
  type: 'weather' | 'sports' | 'connected-devices' | 'watching' | 'internet-usage' | 'music' | 'traffic' | 'xfinity-mobile' | 'xfinity-home' | 'x1-dvr' | 'xfinity-stream';
  name?: string;
  category?: string;
  data?: any;
}

// Force refresh - widget order: weather, watching, music, sports, connected home, internet usage, traffic
const SamsungDailyBoard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusedIndex, setFocusedIndex] = useState(0); // TV remote focus management  
  const [weatherUpdating, setWeatherUpdating] = useState(false); // For update animations
  const [videoSimulation, setVideoSimulation] = useState<'sports' | 'movie' | 'news'>('sports'); // Live TV simulation
  const [showWidgetSelector, setShowWidgetSelector] = useState(false); // Widget customization
  const [samsungLayout, setSamsungLayout] = useState(false); // Samsung 4-column layout toggle
  const [samsungPage, setSamsungPage] = useState(0); // Samsung pagination (0 = first 4 widgets, 1 = next 3)
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([
    'weather', 'watching', 'music', 'sports', 'connected-devices', 'internet-usage', 'traffic'
  ]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Available widgets pool - all possible widgets
  const availableWidgets: Widget[] = useMemo(() => [
    {
      id: 'weather',
      type: 'weather',
      name: 'Weather',
      category: 'Lifestyle',
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
      id: 'watching',
      type: 'watching',
      name: 'Continue Watching',
      category: 'Entertainment',
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
      id: 'music',
      type: 'music',
      name: 'Now Playing',
      category: 'Entertainment',
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
      name: 'Sports Scores',
      category: 'Lifestyle',
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
      id: 'connected-devices',
      type: 'connected-devices',
      name: 'Connected Devices',
      category: 'Network',
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
      id: 'internet-usage',
      type: 'internet-usage',
      name: 'Internet Usage',
      category: 'Network',
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
      id: 'traffic',
      type: 'traffic',
      name: 'Traffic & Navigation',
      category: 'Lifestyle',
      data: {
        destination: 'Downtown Office',
        arrivalTime: '10:13 AM arrival',
        route: 'via I-95 North',
        duration: '22 min',
        trafficStatus: 'Moderate Traffic',
        status: 'Live Traffic'
      }
    },
    // NEW Xfinity Service Widgets
    {
      id: 'xfinity-mobile',
      type: 'xfinity-mobile',
      name: 'Xfinity Mobile',
      category: 'Xfinity Services',
      data: {
        planName: 'Unlimited Premium',
        billingCycle: 'Jan 15 - Feb 14',
        familyMembers: [
          { name: 'Sarah', dataUsed: 18.2, dataLimit: 'Unlimited', status: 'active' },
          { name: 'Mike', dataUsed: 12.8, dataLimit: 'Unlimited', status: 'active' },
          { name: 'Emma', dataUsed: 6.4, dataLimit: '5GB', status: 'warning' },
          { name: 'Josh', dataUsed: 2.1, dataLimit: '5GB', status: 'active' }
        ],
        totalLines: 4,
        savings: '$45/month vs Verizon',
        nextBillDate: 'Feb 15'
      }
    },
    {
      id: 'xfinity-home',
      type: 'xfinity-home',
      name: 'Xfinity Home Security',
      category: 'Xfinity Services',
      data: {
        systemStatus: 'armed-away',
        lastActivity: '2:34 PM - Front Door',
        zones: [
          { name: 'Front Door', status: 'secure', lastTriggered: '2:34 PM' },
          { name: 'Back Door', status: 'secure', lastTriggered: 'Yesterday' },
          { name: 'Living Room', status: 'secure', lastTriggered: '11:20 AM' },
          { name: 'Garage', status: 'secure', lastTriggered: 'Yesterday' }
        ],
        cameras: { active: 3, recording: 1 },
        recentEvents: 2
      }
    },
    {
      id: 'x1-dvr',
      type: 'x1-dvr',
      name: 'X1 Cloud DVR',
      category: 'Xfinity Services',
      data: {
        storageUsed: 75,
        storageTotal: 100,
        recordingConflicts: 1,
        upcomingRecordings: [
          { show: 'The Voice', time: '8:00 PM', channel: 'NBC', conflict: false },
          { show: 'This Is Us', time: '9:00 PM', channel: 'NBC', conflict: true },
          { show: 'Yellowstone', time: '9:00 PM', channel: 'Paramount', conflict: true }
        ],
        recentRecordings: 12,
        expiringSoon: 3
      }
    },
    {
      id: 'xfinity-stream',
      type: 'xfinity-stream',
      name: 'Xfinity Stream',
      category: 'Xfinity Services',
      data: {
        downloadPrompts: [
          { title: 'Yellowstone S5E8', size: '1.2GB', expiry: '2 days', downloaded: false },
          { title: 'The Voice - Results', size: '900MB', expiry: '1 day', downloaded: false }
        ],
        currentDownloads: 1,
        availableSpace: '8.4GB',
        recentlyWatched: 'Love Island S2E12',
        continueWatching: true
      }
    }
  ], []);

  // Get currently active widgets based on selection
  const widgets = useMemo(() => {
    return selectedWidgets.map(id => availableWidgets.find(w => w.id === id)).filter(Boolean) as Widget[];
  }, [selectedWidgets, availableWidgets]);

  // TV Remote Navigation - REMOVED (handled by comprehensive handler below)

  // Grid layout - no auto-scroll needed
  // Focus is handled by CSS transforms on individual widgets

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

  // Grid-based navigation mapping for asymmetric layout
  const gridNavigation = {
    // Actual rendered positions in JSX:
    // 0: Weather    1: Featured   3: Sports
    // 2: Music      1: Featured   6: Traffic  
    // 5: Internet   5: Internet   4: Connected
    0: { up: null, down: 2, left: null, right: 1 },      // Weather
    1: { up: null, down: null, left: 0, right: 3 },      // Featured (spans 2x2)
    2: { up: 0, down: 5, left: null, right: 1 },         // Music
    3: { up: null, down: 6, left: 1, right: null },      // Sports
    6: { up: 3, down: 4, left: 1, right: null },         // Traffic
    5: { up: 2, down: null, left: null, right: 4 },      // Internet (strip)
    4: { up: 6, down: null, left: 5, right: null },      // Connected (strip)
  };

  // Auto-focus component on mount and keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Samsung mode - completely separate navigation
      if (samsungLayout) {
        if (event.key === 's' || event.key === 'S') {
          event.preventDefault();
          setSamsungLayout(false);
          setFocusedIndex(0);
          setSamsungPage(0);
          return;
        }
        
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.preventDefault();
          
          let newFocus = focusedIndex;
          let newPage = samsungPage;
          const widgetsOnPage = Math.min(4, widgets.length - samsungPage * 4);
          
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            // Move forward
            if (focusedIndex < widgetsOnPage - 1) {
              newFocus = focusedIndex + 1;
            } else if (samsungPage < Math.ceil(widgets.length / 4) - 1) {
              // Go to next page
              newPage = samsungPage + 1;
              newFocus = 0;
            }
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            // Move backward
            if (focusedIndex > 0) {
              newFocus = focusedIndex - 1;
            } else if (samsungPage > 0) {
              // Go to previous page
              newPage = samsungPage - 1;
              newFocus = Math.min(3, widgets.length - newPage * 4 - 1);
            }
          }
          
          console.log('Samsung nav:', event.key, 'Page:', newPage, 'Focus:', newFocus);
          setSamsungPage(newPage);
          setFocusedIndex(newFocus);
        }
        return; // Exit early for Samsung mode
      }

      // Normal mode navigation
      event.preventDefault(); // Prevent default browser behavior
      
      const currentPos = gridNavigation[focusedIndex as keyof typeof gridNavigation];
      
      if (event.key === 'ArrowLeft' && currentPos?.left !== null) {
        setFocusedIndex(currentPos.left);
      } else if (event.key === 'ArrowRight' && currentPos?.right !== null) {
        setFocusedIndex(currentPos.right);
      } else if (event.key === 'ArrowUp' && currentPos?.up !== null) {
        setFocusedIndex(currentPos.up);
      } else if (event.key === 'ArrowDown' && currentPos?.down !== null) {
        setFocusedIndex(currentPos.down);
      } else if (event.key === 'v' || event.key === 'V') {
        // Toggle video simulation background (for demo purposes)
        setVideoSimulation(prev => {
          if (prev === 'sports') return 'movie';
          if (prev === 'movie') return 'news';
          return 'sports';
        });
      } else if (event.key === 'c' || event.key === 'C') {
        // Open widget customization
        setShowWidgetSelector(true);
      } else if (event.key === 's' || event.key === 'S') {
        // Toggle Samsung layout mode
        setSamsungLayout(prev => !prev);
        setFocusedIndex(0); // Reset focus when switching layouts
        setSamsungPage(0); // Reset pagination when switching layouts

      } else if (event.key === 'Enter' || event.key === ' ') {
        // Simulate interaction with focused widget
        setWeatherUpdating(true);
        setTimeout(() => setWeatherUpdating(false), 1000);
      }
    };

    // Auto-focus the component
    const container = document.querySelector('.samsung-daily-board-real') as HTMLElement;
    if (container) {
      container.focus();
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [focusedIndex, samsungLayout, samsungPage, widgets.length]);

  // Memoized widget components to prevent unnecessary re-renders
  const widgetComponents = useMemo(() => [
    // Weather Widget - Modern Design (Position 0)
    <div key="weather" className={`samsung-widget weather-card modern-weather ${focusedIndex === 0 ? 'focused' : ''}`}>
      {/* Top Section */}
             <div className="weather-top-section">
         <div className="weather-condition-badge">
                     <div className="weather-badge-icon">
            <svg width="20" height="20" viewBox="0 0 30 30" className="weather-icon-svg">
              <path d="M4.64,16.91c0-1.15,0.36-2.17,1.08-3.07c0.73-0.9,1.66-1.56,2.8-1.98c0.21-3.01,1.29-5.56,3.24-7.66 C13.71,2.1,16.1,1.05,18.93,1.05c3.25,0,6.01,1.15,8.29,3.44c2.28,2.29,3.42,5.06,3.42,8.31c0,2.41-0.68,4.58-2.03,6.51 c-0.31,0.44-0.67,0.86-1.08,1.25c-0.41,0.39-0.83,0.73-1.27,1.03c-0.44,0.3-0.89,0.56-1.36,0.78c-0.47,0.22-0.93,0.4-1.39,0.54 c-2.26,0.69-4.65,0.69-7.18,0c-0.46-0.12-0.92-0.3-1.39-0.54c-0.47-0.24-0.92-0.52-1.36-0.84c-0.44-0.32-0.86-0.68-1.27-1.08 s-0.77-0.84-1.08-1.31C5.32,21.49,4.64,19.32,4.64,16.91z" fill="#ffffff" opacity="0.8"/>
              <circle cx="15" cy="9" r="5" fill="#ffffff" stroke="#ffffff" stroke-width="0.5"/>
              <path d="M20.5,18.5c0,0.28-0.22,0.5-0.5,0.5h-10c-0.28,0-0.5-0.22-0.5-0.5s0.22-0.5,0.5-0.5h10C20.28,18,20.5,18.22,20.5,18.5z" fill="#ffffff"/>
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
             <svg width="24" height="24" viewBox="0 0 30 30" className="detail-icon-svg">
               <path d="M7.5,17.22c0-.99,.81-1.8,1.8-1.8s1.8,.81,1.8,1.8-.81,1.8-1.8,1.8-1.8-.81-1.8-1.8Z M12.5,8.88c.33,.51,.25,1.2-.26,1.54-.51,.33-1.2,.25-1.54-.26-.68-1.04-1.84-1.66-3.11-1.66-2.05,0-3.71,1.66-3.71,3.71,0,.66,.54,1.2,1.2,1.2s1.2-.54,1.2-1.2c0-.73,.59-1.31,1.31-1.31,.56,0,1.08,.28,1.39,.74l.52,.8Z" fill="#ffffff"/>
               <path d="M15,7c-4.97,0-9,4.03-9,9c0,.66,.54,1.2,1.2,1.2s1.2-.54,1.2-1.2c0-3.65,2.97-6.6,6.6-6.6s6.6,2.97,6.6,6.6c0,.66,.54,1.2,1.2,1.2s1.2-.54,1.2-1.2c0-4.97-4.03-9-9-9Z" fill="#ffffff" opacity="0.7"/>
               <circle cx="15" cy="16" r="3" fill="#ffffff"/>
             </svg>
           </div>
           <div className="detail-label">Humidity</div>
           <div className="detail-value">65%</div>
         </div>
         <div className="weather-detail-item">
           <div className="detail-icon">
             <svg width="24" height="24" viewBox="0 0 30 30" className="detail-icon-svg">
               <path d="M3.8,11.2c0-.3,.2-.5,.5-.5H12c1.9,0,3.5,1.6,3.5,3.5s-1.6,3.5-3.5,3.5c-.3,0-.5,.2-.5,.5s.2,.5,.5,.5c2.5,0,4.5-2,4.5-4.5s-2-4.5-4.5-4.5H4.3c-.3,0-.5,.2-.5,.5Z" fill="#ffffff"/>
               <path d="M3.8,7.2c0-.3,.2-.5,.5-.5H14c2.8,0,5.2,2.4,5.2,5.2s-2.4,5.2-5.2,5.2c-.3,0-.5,.2-.5,.5s.2,.5,.5,.5c3.4,0,6.2-2.8,6.2-6.2s-2.8-6.2-6.2-6.2H4.3c-.3,0-.5,.2-.5,.5Z" fill="#ffffff" opacity="0.7"/>
               <path d="M3.8,15.2c0-.3,.2-.5,.5-.5H10c1.1,0,2.1,.9,2.1,2.1s-.9,2.1-2.1,2.1c-.3,0-.5,.2-.5,.5s.2,.5,.5,.5c1.7,0,3.1-1.4,3.1-3.1s-1.4-3.1-3.1-3.1H4.3c-.3,0-.5,.2-.5,.5Z" fill="#ffffff" opacity="0.5"/>
             </svg>
           </div>
           <div className="detail-label">Wind</div>
           <div className="detail-value">8 mph</div>
         </div>
         <div className="weather-detail-item">
           <div className="detail-icon">
             <svg width="24" height="24" viewBox="0 0 30 30" className="detail-icon-svg">
               <path d="M15,8.5c-4.14,0-7.77,2.4-10.64,6.5c2.87,4.1,6.5,6.5,10.64,6.5s7.77-2.4,10.64-6.5c-2.87-4.1-6.5-6.5-10.64-6.5Z" fill="#ffffff" opacity="0.6"/>
               <circle cx="15" cy="15" r="4.5" fill="#ffffff"/>
               <circle cx="15" cy="15" r="2.5" fill="#000000" opacity="0.8"/>
               <circle cx="16.5" cy="13.5" r="0.8" fill="#ffffff"/>
             </svg>
           </div>
           <div className="detail-label">Visibility</div>
           <div className="detail-value">10 mi</div>
         </div>
       </div>
    </div>,
    
        // Watching Widget (Position 1) 
    <div key="watching" className={`samsung-widget watching-card ${focusedIndex === 1 ? 'focused' : ''}`}>
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
    
    // Music Widget - Editorial Style (Position 2)
    <div key="music" className={`samsung-widget music-card editorial-music ${focusedIndex === 2 ? 'focused' : ''}`}>
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
    
    // Sports Widget - Editorial Clean Layout (Position 3)
    <div key="sports" className={`samsung-widget sports-card-clean ${focusedIndex === 3 ? 'focused' : ''}`}>
      {/* Sports Category Badge */}
      <div className="sports-category-badge">
        <div className="sports-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M12 3c-2.5 0-4.5 2-4.5 4.5 0 1.5.7 2.8 1.8 3.7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 21c2.5 0 4.5-2 4.5-4.5 0-1.5-.7-2.8-1.8-3.7" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
          </svg>
        </div>
        <span>Sports</span>
        <div className="status-indicator final">Final</div>
      </div>
      
      {/* Main Matchup */}
      <div className="matchup-header">
        <div className="team-matchup">Phillies vs Braves</div>
        <div className="final-score">7-4</div>
        <div className="venue-name">Citizens Bank Park</div>
      </div>
      
      {/* Season Record */}
      <div className="season-stats">
        <div className="season-record">Season Record: 82-65</div>
      </div>
      
      {/* Next Game Info */}
      <div className="next-game-info">
        <div className="calendar-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
        <span>Next: vs Cardinals, Tomorrow 7:05 PM</span>
      </div>
    </div>,
    
    // Connected Home Widget - Visual & Engaging (Position 4)
    <div key="connected-devices" className={`samsung-widget connected-home-card ${focusedIndex === 4 ? 'focused' : ''}`}>
      {/* Gradient Background Pattern */}
      <div className="home-background-pattern">
        <div className="pattern-circle pattern-1"></div>
        <div className="pattern-circle pattern-2"></div>
        <div className="pattern-circle pattern-3"></div>
      </div>
      
      {/* Header */}
      <div className="connected-home-header">
        <div className="home-title">Your connected home</div>
        <div className="home-subtitle">23 devices • all online</div>
      </div>

      {/* Device Ecosystem - Visual Grid */}
      <div className="device-ecosystem-visual">
        <div className="device-category phones-category">
          <div className="category-visual">
            <div className="device-count-large">8</div>
            <div className="device-type-label">phones</div>
          </div>
          <div className="category-icon-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="4" width="14" height="20" rx="3" ry="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
              <rect x="7" y="7" width="10" height="8" rx="1" fill="currentColor" opacity="0.2"/>
            </svg>
          </div>
        </div>
        
        <div className="device-category smart-category">
          <div className="category-visual">
            <div className="device-count-large">6</div>
            <div className="device-type-label">smart home</div>
          </div>
          <div className="category-icon-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <circle cx="12" cy="8" r="2" fill="currentColor"/>
              <circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.6"/>
              <circle cx="16" cy="16" r="1" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>
        </div>
        
        <div className="device-category streaming-category">
          <div className="category-visual">
            <div className="device-count-large">4</div>
            <div className="device-type-label">streaming</div>
          </div>
          <div className="category-icon-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="3" ry="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <polygon points="10,8 10,14 16,11" fill="currentColor"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="1.8"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
          </div>
        </div>
        
        <div className="device-category gaming-category">
          <div className="category-visual">
            <div className="device-count-large">2</div>
            <div className="device-type-label">gaming</div>
          </div>
          <div className="category-icon-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="4" width="12" height="8" rx="3" ry="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <rect x="9" y="16" width="6" height="4" rx="2" ry="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <line x1="12" y1="12" x2="12" y2="16" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="9" cy="8" r="1.5" fill="currentColor"/>
              <circle cx="15" cy="8" r="1.5" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </div>,
    
    // Internet Usage Widget - Clean Circular Progress (Position 5)
    <div key="internet-usage" className={`samsung-widget internet-usage-clean ${focusedIndex === 5 ? 'focused' : ''}`}>
      {/* Header Section */}
      <div className="usage-header">
        <div className="network-badge">
          <div className="wifi-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="12" y1="20" x2="12.01" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span>Network</span>
        </div>
        <div className="usage-stats">333 / 1200 GB</div>
      </div>

      {/* Section Title */}
      <div className="section-title">MONTHLY USAGE</div>

      {/* Circular Progress Center */}
      <div className="circular-progress-container">
        <div className="circular-progress">
          <svg className="progress-ring" width="160" height="160" viewBox="0 0 160 160">
            <circle
              className="progress-ring-background"
              cx="80"
              cy="80"
              r="65"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="10"
            />
            <circle
              className="progress-ring-fill"
              cx="80"
              cy="80"
              r="65"
              fill="transparent"
              stroke="#00BFFF"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="408"
              strokeDashoffset="294"
              transform="rotate(-90 80 80)"
            />
          </svg>
          <div className="progress-content">
            <div className="percentage">28%</div>
            <div className="used-label">used</div>
          </div>
        </div>
      </div>

      {/* Remaining Info */}
      <div className="remaining-badge">867 GB remaining</div>
    </div>,
    
    // Traffic Widget - Clean Editorial Style (Position 6)
    <div key="traffic" className={`samsung-widget traffic-card-premium ${focusedIndex === 6 ? 'focused' : ''}`}>
       {/* Navigation Header */}
       <div className="nav-header">
         <div className="nav-badge">
           <div className="nav-icon">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2"/>
               <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
             </svg>
           </div>
           <span>Navigation</span>
         </div>
         <div className="arrival-time">10:13 AM</div>
       </div>

       {/* Simple Route Display */}
       <div className="route-display">
         <div className="route-icon">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
             <path d="M9 11H7l3-7 3 7h-2l1 4-4-4z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
           </svg>
         </div>
         <div className="route-details">
           <div className="route-name">I-95 North</div>
           <div className="route-status">Light traffic</div>
         </div>
       </div>

       {/* Journey Information */}
       <div className="journey-info">
         <div className="destination-name">Downtown Office</div>
         <div className="route-summary">
           <span className="duration-large">22 min</span>
           <span className="route-meta">8.2 mi • Current route</span>
         </div>
       </div>
     </div>
  ], [focusedIndex, weatherUpdating]); // Re-create when focusedIndex or weatherUpdating changes

  // Widget selection functions
  const toggleWidget = (widgetId: string) => {
    setSelectedWidgets(prev => {
      if (prev.includes(widgetId)) {
        // Don't allow removing all widgets
        if (prev.length === 1) return prev;
        return prev.filter(id => id !== widgetId);
      } else {
        // Limit to 7 widgets to fit grid layout
        if (prev.length >= 7) return prev;
        return [...prev, widgetId];
      }
    });
  };

  const getWidgetIcon = (type: string) => {
    const iconMap: Record<string, ReactElement> = {
      'weather': <path d="M12.5 2C13.3 2 14 2.7 14 3.5S13.3 5 12.5 5 11 4.3 11 3.5 11.7 2 12.5 2M21 13H20L19.8 12.8C19.3 12.4 18.6 12.4 18.1 12.8C17.6 13.3 17.6 14 18.1 14.4L18.3 14.6H18V16H21V13M6.9 7.7L5.5 6.3C4.4 7.4 3.5 8.8 3.1 10.3L4.6 10.7C4.9 9.5 5.7 8.4 6.9 7.7M18.4 7.7C19.6 8.4 20.4 9.5 20.7 10.7L22.2 10.3C21.8 8.8 20.9 7.4 19.8 6.3L18.4 7.7Z" fill="currentColor"/>,
      'watching': <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" fill="currentColor"/>,
      'music': <path d="M12,3V13.55C11.41,13.21 10.73,13 10,13C7.79,13 6,14.79 6,17S7.79,21 10,21 14,19.21 14,17V7H18V3H12Z" fill="currentColor"/>,
      'sports': <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z" fill="currentColor"/>,
      'connected-devices': <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" fill="currentColor"/>,
      'internet-usage': <path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" fill="currentColor"/>,
      'traffic': <path d="M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M19.5,9.5L21.46,6H15.46L17.5,9.5M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M20,8H4V17H6A3,3 0 0,0 9,20A3,3 0 0,0 12,17H12A3,3 0 0,0 15,20A3,3 0 0,0 18,17H20V8Z" fill="currentColor"/>,
      'xfinity-mobile': <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" fill="currentColor"/>,
      'xfinity-home': <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" fill="currentColor"/>,
      'x1-dvr': <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12C2,6.5 6.47,2 12,2M10,16.5L16,12L10,7.5V16.5Z" fill="currentColor"/>,
      'xfinity-stream': <path d="M13,9V15L22,12M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V15M16,15H18V13H16V15M14,11H16V9H14V11M16,11H18V9H16V11Z" fill="currentColor"/>
    };
    
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        {iconMap[type] || <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>}
      </svg>
    );
  };

  return (
    <div className={`samsung-daily-board-real ${samsungLayout ? 'samsung-layout' : ''}`} tabIndex={0}>
      {/* Video Simulation Background */}
      <div className={`video-simulation ${videoSimulation}`}></div>

      {/* Video Simulation Indicator */}
      <div className="video-simulation-indicator">
        Simulating: <span className={`sim-type ${videoSimulation}`}>{videoSimulation}</span>
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

      {/* Widget Grid with Layout Toggle */}
      <div className="widgets-container" ref={scrollContainerRef}>
        {samsungLayout ? (
          /* Samsung Layout: Paginated 4-widget view with correct focus */
          (() => {
            const startIndex = samsungPage * 4;
            const endIndex = startIndex + 4;
            return widgetComponents.slice(startIndex, endIndex).map((component, relativeIndex) => {
              // Clone the component with updated focus class
              const originalClassName = component.props.className;
              const isFocused = relativeIndex === focusedIndex;
              const newClassName = originalClassName.replace(/focused/g, '').trim() + (isFocused ? ' focused' : '');
              
              return React.cloneElement(component, {
                ...component.props,
                className: newClassName,
                key: component.key + '-page-' + samsungPage
              });
            });
          })()
        ) : (
          /* Normal Layout: Asymmetric grid with all widgets */
          <>
            {/* Main grid widgets (first 4, then traffic) */}
            {widgetComponents.slice(0, 4)}
            {/* Traffic Widget in network area */}
            {widgetComponents[6]}
            
            {/* Bottom Strip Container */}
            <div className="bottom-strip">
              {/* Internet Usage Widget */}
              {widgetComponents[5]}
              {/* Connected Devices Widget */}
              {widgetComponents[4]}
            </div>
          </>
        )}
      </div>

      {/* Focus Indicator - Grid Layout */}
      <div className="grid-indicator">
        <div className="grid-dots">
          {/* Row 1 */}
          <div className="grid-row">
            <span className={`grid-dot ${focusedIndex === 0 ? 'active' : ''}`}></span>
            <span className={`grid-dot hero ${focusedIndex === 1 ? 'active' : ''}`}></span>
            <span className={`grid-dot ${focusedIndex === 4 ? 'active' : ''}`}></span>
          </div>
          {/* Row 2 */}
          <div className="grid-row">
            <span className={`grid-dot ${focusedIndex === 2 ? 'active' : ''}`}></span>
            <span className={`grid-dot hero ${focusedIndex === 1 ? 'active' : ''}`}></span>
            <span className={`grid-dot ${focusedIndex === 6 ? 'active' : ''}`}></span>
          </div>
          {/* Row 3 - Strip */}
          <div className="grid-row strip">
            <span className={`grid-dot ${focusedIndex === 5 ? 'active' : ''}`}></span>
            <span className={`grid-dot ${focusedIndex === 7 ? 'active' : ''}`}></span>
          </div>
        </div>
      </div>

      {/* Customization Button */}
      <div className="customization-button" onClick={() => setShowWidgetSelector(true)}>
        <div className="customize-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
        <span className="customize-text">Customize</span>
      </div>

      {/* Widget Selector Overlay */}
      {showWidgetSelector && (
        <div className="widget-selector-overlay">
          <div className="widget-selector">
            <div className="selector-header">
              <h2>Customize Your Dashboard</h2>
              <button className="close-selector" onClick={() => setShowWidgetSelector(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            <div className="selector-content">
              {['Entertainment', 'Lifestyle', 'Network', 'Xfinity Services'].map(category => (
                <div key={category} className="widget-category">
                  <h3 className="category-title">{category}</h3>
                  <div className="widget-options">
                    {availableWidgets
                      .filter(widget => widget.category === category)
                      .map(widget => (
                        <div 
                          key={widget.id} 
                          className={`widget-option ${selectedWidgets.includes(widget.id) ? 'selected' : ''}`}
                          onClick={() => toggleWidget(widget.id)}
                        >
                          <div className="widget-preview">
                            <div className="widget-icon">
                              {getWidgetIcon(widget.type)}
                            </div>
                            <span className="widget-name">{widget.name}</span>
                          </div>
                          <div className="selection-indicator">
                            {selectedWidgets.includes(widget.id) && '✓'}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="selector-footer">
              <div className="selection-count">
                {selectedWidgets.length} of {availableWidgets.length} widgets selected
              </div>
              <button className="apply-selection" onClick={() => setShowWidgetSelector(false)}>
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Samsung Layout - Exact Recreation */}
      {samsungLayout && (
        <>
          {/* Samsung Scroll Dots - Exactly like reference */}
          <div className="samsung-scroll-dots">
            {Array.from({ length: Math.ceil(widgets.length / 4) }, (_, index) => (
              <div 
                key={index} 
                className={`samsung-dot ${index === samsungPage ? 'active' : ''}`}
              />
            ))}
          </div>

          {/* Samsung Voice Prompt - Exactly like reference */}
          <div className="samsung-voice-prompt">
            <div className="microphone-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span className="voice-prompt-text">Try Saying...</span>
            <div className="voice-command">"Move to Daily Board"</div>
          </div>
        </>
      )}

      {/* Instructions - Hidden in Samsung mode */}
      {!samsungLayout && (
        <div className="navigation-hint">
          Use ← → ↑ ↓ to navigate | V: video simulation | C: customize widgets | S: Samsung layout | Focus: {focusedIndex}
        </div>
      )}
    </div>
  );
};

export default SamsungDailyBoard;