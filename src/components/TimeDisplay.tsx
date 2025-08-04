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

  const getPersonalGreeting = (date: Date) => {
    const hour = date.getHours();
    const name = 'Sarah'; // Could be dynamic
    if (hour < 12) return `Good morning, ${name}`;
    if (hour < 17) return `Good afternoon, ${name}`;
    return `Good evening, ${name}`;
  };

  const getContextualInfo = (date: Date) => {
    const hour = date.getHours();
    if (hour < 8) return 'Early start today';
    if (hour < 12) return 'Great day ahead';
    if (hour < 17) return 'Hope your day is going well';
    if (hour < 20) return 'Time to unwind';
    return 'Enjoy your evening';
  };

  return (
    <div className="widget time-display">
      {/* Large time display */}
      <div className="heading-xl mb-md">
        {formatTime(currentTime)}
      </div>
      
      {/* Personal greeting */}
      <div className="body-lg mb-sm">
        {getPersonalGreeting(currentTime)}
      </div>
      
      {/* Date */}
      <div className="body-base mb-sm">
        {formatDate(currentTime)}
      </div>
      
      {/* Contextual message */}
      <div className="body-sm">
        {getContextualInfo(currentTime)}
      </div>
    </div>
  );
};

export default TimeDisplay;