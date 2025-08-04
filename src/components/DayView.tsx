import React, { useState, useEffect } from 'react';
import HeroBand from './HeroBand';
import NowNextStrip from './NowNextStrip';
import AmbientGrid from './AmbientGrid';
import PersonalSpotlight from './PersonalSpotlight';

const DayView: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userPresence, setUserPresence] = useState(false);
  const [gridOpacity, setGridOpacity] = useState(0.3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Simulate presence detection (would use actual sensors)
  useEffect(() => {
    const presenceTimer = setInterval(() => {
      setUserPresence(prev => !prev);
    }, 30000);

    return () => clearInterval(presenceTimer);
  }, []);

  // Adjust grid opacity based on presence
  useEffect(() => {
    setGridOpacity(userPresence ? 0.7 : 0.3);
  }, [userPresence]);

  return (
    <div className="dayview-container">
      {/* Hero Band - Always visible anchor */}
      <div className="hero-zone">
        <HeroBand currentTime={currentTime} />
      </div>

      {/* Now-Next Strip - Imminent user demands */}
      <div className="now-next-zone">
        <NowNextStrip />
      </div>

      {/* Ambient Grid - Passive awareness */}
      <div 
        className="ambient-zone" 
        style={{ 
          opacity: gridOpacity,
          transition: 'opacity 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <AmbientGrid userPresence={userPresence} />
      </div>

      {/* Personal Spotlight - Human touch */}
      <div className="spotlight-zone">
        <PersonalSpotlight currentTime={currentTime} />
      </div>

      {/* Subtle presence indicator */}
      {userPresence && (
        <div className="presence-glow" />
      )}
    </div>
  );
};

export default DayView;