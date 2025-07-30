import React, { useState, useEffect } from 'react';

interface LifestyleContent {
  id: string;
  type: 'quote' | 'tip' | 'fact';
  content: string;
  author?: string;
  category: string;
}

const LifestyleWidget: React.FC = () => {
  const [lifestyleContent] = useState<LifestyleContent[]>([
    {
      id: '1',
      type: 'quote',
      content: 'The best time to plant a tree was 20 years ago. The second best time is now.',
      author: 'Chinese Proverb',
      category: 'Motivation'
    },
    {
      id: '2',
      type: 'tip',
      content: 'Take a 5-minute walk every hour to boost creativity and reduce stress.',
      category: 'Wellness'
    },
    {
      id: '3',
      type: 'fact',
      content: 'Drinking water first thing in the morning kickstarts your metabolism by up to 30%.',
      category: 'Health'
    },
    {
      id: '4',
      type: 'quote',
      content: 'Progress, not perfection, is the goal.',
      author: 'Unknown',
      category: 'Growth'
    },
    {
      id: '5',
      type: 'tip',
      content: 'Use the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.',
      category: 'Digital Wellness'
    },
    {
      id: '6',
      type: 'fact',
      content: 'Studies show that plants in your workspace can increase productivity by 15%.',
      category: 'Productivity'
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
      quote: '💭',
      tip: '💡',
      fact: '🧠'
    };
    return iconMap[type];
  };

  const getTypeColor = (type: LifestyleContent['type']): string => {
    const colorMap = {
      quote: '#9966ff',
      tip: '#ffaa00',
      fact: '#00ccff'
    };
    return colorMap[type];
  };

  const getCategoryIcon = (category: string): string => {
    const iconMap: { [key: string]: string } = {
      'Motivation': '🚀',
      'Wellness': '🌱',
      'Health': '💚',
      'Growth': '📈',
      'Digital Wellness': '💻',
      'Productivity': '⚡'
    };
    return iconMap[category] || '✨';
  };

  const currentContent = lifestyleContent[currentIndex];

  return (
    <div className="widget lifestyle-widget">
      <div className="widget-title">Daily Inspiration</div>
      
      {currentContent && (
        <div style={{
          padding: 'var(--spacing-md)',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: `1px solid ${getTypeColor(currentContent.type)}`,
          minHeight: '180px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 'var(--spacing-sm)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--secondary-text)'
            }}>
              <span style={{ marginRight: 'var(--spacing-xs)' }}>
                {getTypeIcon(currentContent.type)}
              </span>
              <span style={{ 
                color: getTypeColor(currentContent.type),
                textTransform: 'uppercase',
                fontWeight: '500',
                letterSpacing: '1px'
              }}>
                {currentContent.type}
              </span>
            </div>
            
            <div style={{
              fontSize: currentContent.type === 'quote' ? 'var(--font-size-sm)' : 'var(--font-size-sm)',
              fontWeight: currentContent.type === 'quote' ? '300' : '400',
              lineHeight: '1.4',
              marginBottom: 'var(--spacing-md)',
              fontStyle: currentContent.type === 'quote' ? 'italic' : 'normal'
            }}>
              {currentContent.type === 'quote' && '"'}{currentContent.content}{currentContent.type === 'quote' && '"'}
            </div>
            
            {currentContent.author && (
              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--secondary-text)',
                fontWeight: '300',
                marginBottom: 'var(--spacing-sm)'
              }}>
                — {currentContent.author}
              </div>
            )}
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--accent-text)'
          }}>
            <span>
              {getCategoryIcon(currentContent.category)} {currentContent.category}
            </span>
            <span>
              {currentIndex + 1}/{lifestyleContent.length}
            </span>
          </div>
        </div>
      )}
      
      {/* Progress indicator */}
      <div style={{
        marginTop: 'var(--spacing-md)',
        height: '3px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${((currentIndex + 1) / lifestyleContent.length) * 100}%`,
          background: 'linear-gradient(90deg, var(--highlight), var(--success))',
          borderRadius: '2px',
          transition: 'width 0.3s ease'
        }} />
      </div>
      
      <div style={{
        textAlign: 'center',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--accent-text)',
        marginTop: 'var(--spacing-sm)'
      }}>
        Updates every 15 seconds
      </div>
    </div>
  );
};

export default LifestyleWidget;