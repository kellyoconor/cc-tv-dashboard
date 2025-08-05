import React, { useState, useEffect, useCallback } from 'react';

interface ContentTile {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  bgGradient: string;
  bgImage: string;
  section: string;
  accentColor: string;
}

const PremiumCarousel: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tiles: ContentTile[] = [
    {
      id: 'weather-hero',
      title: "GOLDEN HOUR",
      subtitle: "Perfect 72° conditions • Zero precipitation • UV index optimal for outdoor activities",
      category: "LIVE WEATHER",
      bgGradient: 'linear-gradient(145deg, #FF4E50 0%, #F9CA24 30%, #FF6B35 70%, #E74C3C 100%)',
      bgImage: `
        radial-gradient(ellipse 800px 600px at 20% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 60%),
        radial-gradient(ellipse 400px 300px at 80% 70%, rgba(255, 193, 7, 0.6) 0%, transparent 50%),
        radial-gradient(circle 200px at 60% 20%, rgba(255, 87, 34, 0.5) 0%, transparent 60%),
        conic-gradient(from 45deg at 30% 80%, #FF6B35 0deg, transparent 120deg),
        url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWluKSIvPjwvc3ZnPg==')
      `,
      section: 'Weather',
      accentColor: '#FF4E50'
    },
    {
      id: 'commute-pulse',
      title: 'RUSH DYNAMICS',
      subtitle: 'Downtown corridor: 18 minutes via intelligent routing • Traffic density optimal',
      category: "LIVE TRAFFIC",
      bgGradient: 'linear-gradient(145deg, #667eea 0%, #764ba2 50%, #4834d4 100%)',
      bgImage: `
        linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 30%),
        linear-gradient(135deg, rgba(102,126,234,0.3) 0%, transparent 50%),
        repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.03) 1px, transparent 2px, transparent 20px),
        repeating-linear-gradient(0deg, transparent 0px, rgba(255,255,255,0.02) 1px, transparent 2px, transparent 15px),
        radial-gradient(ellipse 600px 400px at 70% 30%, rgba(118,75,162,0.4) 0%, transparent 70%)
      `,
      section: 'Commute',
      accentColor: '#667eea'
    },
    {
      id: 'calendar-urgency',
      title: 'STANDUP IMMINENT',
      subtitle: 'T-minus 42 minutes • Conference Room Alpha • 12 attendees confirmed',
      category: "URGENT CALENDAR",
      bgGradient: 'linear-gradient(145deg, #f093fb 0%, #f5576c 30%, #e056fd 70%, #8e44ad 100%)',
      bgImage: `
        radial-gradient(ellipse 500px 300px at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%),
        radial-gradient(circle 300px at 75% 75%, rgba(240,147,251,0.4) 0%, transparent 60%),
        conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(245,87,108,0.2) 90deg, transparent 180deg),
        linear-gradient(60deg, rgba(255,255,255,0.08) 0%, transparent 40%)
      `,
      section: 'Schedule',
      accentColor: '#f093fb'
    },
    {
      id: 'market-surge',
      title: 'MARKET SURGE',
      subtitle: 'Technology sector: +3.7% • AI stocks leading rally • Volume exceeding daily average by 240%',
      category: "BREAKING MARKETS",
      bgGradient: 'linear-gradient(145deg, #4facfe 0%, #00f2fe 40%, #0abde3 80%, #006ba6 100%)',
      bgImage: `
        radial-gradient(ellipse 600px 400px at 80% 20%, rgba(255,255,255,0.25) 0%, transparent 60%),
        linear-gradient(30deg, rgba(79,172,254,0.3) 0%, transparent 50%),
        conic-gradient(from 45deg at 30% 70%, rgba(0,242,254,0.2) 0deg, transparent 120deg),
        repeating-linear-gradient(15deg, transparent 0px, rgba(255,255,255,0.02) 1px, transparent 2px, transparent 30px)
      `,
      section: 'Markets',
      accentColor: '#4facfe'
    },
    {
      id: 'home-nexus',
      title: 'NEXUS OPTIMAL',
      subtitle: 'All systems synchronized • Energy optimization: -18% • Security perimeter active',
      category: "SMART HOME",
      bgGradient: 'linear-gradient(145deg, #43e97b 0%, #38f9d7 50%, #00d2d3 100%)',
      bgImage: `
        radial-gradient(ellipse 700px 500px at 40% 60%, rgba(255,255,255,0.2) 0%, transparent 50%),
        radial-gradient(circle 250px at 20% 20%, rgba(67,233,123,0.3) 0%, transparent 60%),
        linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%),
        conic-gradient(from 90deg at 80% 40%, rgba(56,249,215,0.2) 0deg, transparent 180deg)
      `,
      section: 'Home Intelligence',
      accentColor: '#43e97b'
    },
    {
      id: 'sonic-discovery',
      title: 'SONIC CURATION',
      subtitle: 'Neural audio matching: 47 tracks discovered • Acoustic DNA analysis complete',
      category: "AI MUSIC",
      bgGradient: 'linear-gradient(145deg, #fa709a 0%, #fee140 30%, #ff6b9d 70%, #c44569 100%)',
      bgImage: `
        radial-gradient(ellipse 800px 600px at 60% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
        radial-gradient(circle 400px at 20% 80%, rgba(254,225,64,0.4) 0%, transparent 60%),
        conic-gradient(from 30deg at 70% 30%, rgba(250,112,154,0.3) 0deg, transparent 150deg),
        linear-gradient(45deg, rgba(255,255,255,0.06) 0%, transparent 50%)
      `,
      section: 'Audio Intelligence',
      accentColor: '#fa709a'
    }
  ];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Navigation handlers
  const navigate = useCallback((direction: 'left' | 'right') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => {
      if (direction === 'right') {
        return prev === tiles.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? tiles.length - 1 : prev - 1;
      }
    });
    
    setTimeout(() => setIsTransitioning(false), 600);
  }, [tiles.length, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate('left');
      if (e.key === 'ArrowRight') navigate('right');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  // Mouse wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaX > 0 || e.deltaY > 0) navigate('right');
      if (e.deltaX < 0 || e.deltaY < 0) navigate('left');
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate]);

  const currentTile = tiles[currentIndex];
  const currentWeather = "72°"; // Mock weather for HUD

  return (
    <div className="premium-carousel">
      {/* Fixed HUD - Clock and Weather */}
      <div className="fixed-hud">
        <div className="hud-time">
          {currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        </div>
        <div className="hud-weather">
          <span className="weather-temp">{currentWeather}</span>
        </div>
      </div>

      {/* Dynamic Section Header */}
      <div className="section-header">
        <h1 className="section-title">{currentTile.section}</h1>
        <div className="section-indicator">
          {currentIndex + 1} of {tiles.length}
        </div>
      </div>

      {/* Premium Card Display */}
      <div className="card-viewport">
        <div 
          className="tile-container"
          style={{
            transform: `translateX(-${currentIndex * 1072}px)`, // 1000px tile + 72px gap = 1072px per tile
            transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'none'
          }}
        >
          {tiles.map((tile, index) => (
            <div
              key={tile.id}
              className={`content-tile ${index === currentIndex ? 'active' : ''}`}
              style={{ 
                background: `${tile.bgImage}, ${tile.bgGradient}`,
                backgroundSize: 'auto, cover',
                backgroundPosition: 'center, center',
                backgroundBlendMode: 'overlay, normal'
              }}
            >
              <div className="tile-overlay" />
              <div className="tile-background-elements">
                <div className="floating-orb orb-1" style={{ background: tile.accentColor }} />
                <div className="floating-orb orb-2" style={{ background: `${tile.accentColor}40` }} />
              </div>
              <div className="tile-header">
                <div className="category-badge" style={{ borderColor: tile.accentColor }}>
                  {tile.category}
                </div>
              </div>
              <div className="tile-content">
                <h2 className="tile-title">{tile.title}</h2>
                <p className="tile-subtitle">{tile.subtitle}</p>
              </div>
              <div className="tile-accent" style={{ background: tile.accentColor }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PremiumCarousel;