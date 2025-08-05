import React, { useState, useEffect } from 'react';

interface NowNextItem {
  id: string;
  type: 'calendar' | 'show' | 'commute' | 'reminder';
  title: string;
  subtitle: string;
  timeInfo: string;
  urgency: 'low' | 'medium' | 'high';
  icon: string;
}

const NowNextStrip: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items] = useState<NowNextItem[]>([
    {
      id: '1',
      type: 'calendar',
      title: 'Team Standup',
      subtitle: 'Product Meeting',
      timeInfo: 'in 15 min',
      urgency: 'high',
      icon: '👥'
    },
    {
      id: '2',
      type: 'show',
      title: 'The Bear S3E8',
      subtitle: 'Next Episode',
      timeInfo: 'starts 8:00 PM',
      urgency: 'low',
      icon: '📺'
    },
    {
      id: '3',
      type: 'commute',
      title: 'Traffic Alert',
      subtitle: 'I-280 Delays',
      timeInfo: '+12 min',
      urgency: 'medium',
      icon: '🚗'
    }
  ]);

  // Cycle through items every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[currentIndex];
  
  if (!currentItem) return null;

  const getUrgencyClass = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'urgency-high';
      case 'medium': return 'urgency-medium';
      default: return 'urgency-low';
    }
  };

  return (
    <div className="now-next-strip">
      <div className={`now-next-item ${getUrgencyClass(currentItem.urgency)}`}>
        {/* Icon */}
        <div className="item-icon">
          {currentItem.icon}
        </div>
        
        {/* Content */}
        <div className="item-content">
          <div className="item-title">
            {currentItem.title}
          </div>
          <div className="item-subtitle">
            {currentItem.subtitle}
          </div>
        </div>
        
        {/* Time Info */}
        <div className="item-time">
          {currentItem.timeInfo}
        </div>
      </div>
      
      {/* Subtle progress indicator */}
      <div className="strip-progress">
        {items.map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NowNextStrip;