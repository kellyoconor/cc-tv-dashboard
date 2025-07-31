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
        fontFamily: 'var(--font-primary)',
        fontSize: 'var(--font-size-3xl)', 
        fontWeight: 'var(--weight-semibold)',
        letterSpacing: '-1px',
        lineHeight: '1.1',
        marginBottom: 'var(--spacing-xs)',
        color: 'var(--primary-text)'
      }}>
        {formatTime(currentTime)}
      </div>
      
      <div style={{ 
        fontSize: 'var(--font-size-lg)', 
        color: 'var(--secondary-text)',
        fontWeight: 'var(--weight-regular)',
        marginBottom: 'var(--spacing-xs)',
        letterSpacing: '0.5px'
      }}>
        {formatDate(currentTime)}
      </div>
      
      <div style={{ 
        fontSize: 'var(--font-size-sm)', 
        color: 'var(--muted-text)',
        fontWeight: 'var(--weight-medium)',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        {getTimeOfDay(currentTime)}
      </div>
    </div>
  );
};

export default TimeDisplay;