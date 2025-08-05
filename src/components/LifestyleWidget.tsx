import React, { useState, useEffect } from 'react';

interface LifestyleContent {
  id: string;
  type: 'goal' | 'achievement' | 'inspiration' | 'wellness';
  content: string;
  author?: string;
  category: string;
  imageUrl?: string;
  progress?: number;
  personalNote?: string;
}

const LifestyleWidget: React.FC = () => {
  const [lifestyleContent] = useState<LifestyleContent[]>([
    {
      id: '1',
      type: 'goal',
      content: 'Read 24 books this year',
      category: 'Personal Growth',
      progress: 65,
      personalNote: 'Currently reading "Atomic Habits" - loving it so far!',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=240&fit=crop'
    },
    {
      id: '2',
      type: 'achievement',
      content: 'Completed 30-day meditation streak',
      category: 'Mindfulness',
      personalNote: 'Feeling more centered and focused each morning',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop'
    },
    {
      id: '3',
      type: 'wellness',
      content: 'Stay hydrated with 8 glasses of water daily',
      category: 'Health',
      progress: 75,
      personalNote: 'Using my new smart water bottle to track intake',
      imageUrl: 'https://images.unsplash.com/photo-1550317138-10000687d72b?w=400&h=240&fit=crop'
    },
    {
      id: '4',
      type: 'inspiration',
      content: 'Your potential is endless',
      author: 'Sarah (to herself)',
      category: 'Daily Affirmation',
      personalNote: 'Reminder to trust in my abilities',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate content every 15 seconds
  useEffect(() => {
    const rotateTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % lifestyleContent.length);
    }, 15000);

    return () => clearInterval(rotateTimer);
  }, [lifestyleContent.length]);

  const getTypeIcon = (type: LifestyleContent['type']): string => {
    const iconMap = {
      goal: '🎯',
      achievement: '🏆',
      inspiration: '✨',
      wellness: '🌱'
    };
    return iconMap[type];
  };

  const getTypeColor = (type: LifestyleContent['type']): string => {
    const colorMap = {
      goal: 'var(--accent-primary)',
      achievement: '#FFD700',
      inspiration: '#FF6B9D',
      wellness: '#00C851'
    };
    return colorMap[type];
  };

  const currentContent = lifestyleContent[currentIndex];

  return (
    <div className="widget lifestyle-widget">
      {/* Category with icon */}
      <div className="flex items-center gap-xs mb-xs">
        <span>{getTypeIcon(currentContent.type)}</span>
        <div className="label">{currentContent.category}</div>
      </div>
      
      {/* Main content */}
      <div className="heading-md mb-sm" style={{ lineHeight: 1.3 }}>
        {currentContent.content}
      </div>
      
      {/* Progress */}
      {currentContent.progress !== undefined && (
        <div className="mb-sm">
          <div className="flex justify-between items-center mb-xs">
            <span className="body-sm">Progress</span>
            <span className="body-sm text-accent" style={{ fontWeight: 600 }}>
              {currentContent.progress}%
            </span>
          </div>
          <div style={{
            height: '3px',
            background: 'var(--border)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${currentContent.progress}%`,
              background: 'var(--blue)',
              borderRadius: '2px',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
      )}
      
      {/* Personal note */}
      {currentContent.personalNote && (
        <div className="body-sm" style={{ fontStyle: 'italic', lineHeight: 1.4 }}>
          "{currentContent.personalNote}"
        </div>
      )}
    </div>
  );
};

export default LifestyleWidget;