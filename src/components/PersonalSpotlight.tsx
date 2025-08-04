import React, { useState, useEffect } from 'react';

interface SpotlightContent {
  type: 'memory' | 'streak' | 'achievement' | 'reflection';
  title: string;
  content: string;
  visual: string;
  date?: string;
}

interface PersonalSpotlightProps {
  currentTime: Date;
}

const PersonalSpotlight: React.FC<PersonalSpotlightProps> = ({ currentTime }) => {
  const [spotlightContent, setSpotlightContent] = useState<SpotlightContent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const spotlightItems: SpotlightContent[] = [
    {
      type: 'memory',
      title: 'On This Day',
      content: '3 years ago: Your first day at the new office',
      visual: '📸',
      date: '2021'
    },
    {
      type: 'streak',
      title: 'Meditation Streak',
      content: '21 days in a row • New personal record',
      visual: '🧘‍♂️'
    },
    {
      type: 'achievement',
      title: 'Goal Reached',
      content: 'Read 24 books this year • Completed yesterday',
      visual: '📚'
    },
    {
      type: 'reflection',
      title: 'Today\'s Intention',
      content: 'Focus on deep work • Be present in meetings',
      visual: '💫'
    }
  ];

  useEffect(() => {
    // Show spotlight content occasionally (every 2-3 minutes)
    const showSpotlight = () => {
      const randomItem = spotlightItems[Math.floor(Math.random() * spotlightItems.length)];
      setSpotlightContent(randomItem);
      setIsVisible(true);
      
      // Hide after 15 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 15000);
    };

    // Initial delay, then periodic showing
    const initialTimeout = setTimeout(showSpotlight, 30000);
    const interval = setInterval(showSpotlight, 180000); // Every 3 minutes

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!spotlightContent || !isVisible) {
    return null;
  }

  return (
    <div className="personal-spotlight">
      <div className="spotlight-content">
        <div className="spotlight-visual">
          {spotlightContent.visual}
        </div>
        
        <div className="spotlight-text">
          <div className="spotlight-title">
            {spotlightContent.title}
          </div>
          <div className="spotlight-body">
            {spotlightContent.content}
          </div>
          {spotlightContent.date && (
            <div className="spotlight-date">
              {spotlightContent.date}
            </div>
          )}
        </div>
      </div>
      
      {/* Gentle glow effect */}
      <div className="spotlight-glow" />
    </div>
  );
};

export default PersonalSpotlight;