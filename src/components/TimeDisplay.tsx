import React, { useState, useEffect } from 'react';

const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const getTimeOfDay = (date: Date) => {
    const hour = date.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="widget time-display">
      <div style={{ 
        fontSize: 'var(--font-size-3xl)', 
        fontWeight: '100',
        letterSpacing: '-2px',
        lineHeight: '1',
        marginBottom: 'var(--spacing-sm)'
      }}>
        {formatTime(currentTime)}
      </div>
      
      <div style={{ 
        fontSize: 'var(--font-size-lg)', 
        color: 'var(--secondary-text)',
        fontWeight: '300',
        marginBottom: 'var(--spacing-xs)'
      }}>
        {formatDate(currentTime)}
      </div>
      
      <div style={{ 
        fontSize: 'var(--font-size-md)', 
        color: 'var(--accent-text)',
        fontWeight: '300'
      }}>
        {getTimeOfDay(currentTime)}
      </div>
    </div>
  );
};

export default TimeDisplay;