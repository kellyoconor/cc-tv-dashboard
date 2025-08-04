import React, { useState, useEffect } from 'react';

interface AmbientWidget {
  id: string;
  type: 'news' | 'sports' | 'stocks' | 'photos' | 'energy' | 'smart-home' | 'health' | 'social';
  title: string;
  content: string;
  icon: string;
  priority: number;
  lastUpdated: Date;
}

interface AmbientGridProps {
  userPresence: boolean;
}

const AmbientGrid: React.FC<AmbientGridProps> = ({ userPresence }) => {
  const [currentWidgets, setCurrentWidgets] = useState<AmbientWidget[]>([]);
  const [allWidgets] = useState<AmbientWidget[]>([
    {
      id: 'news-1',
      type: 'news',
      title: 'Breaking',
      content: 'Tech earnings exceed expectations across sector',
      icon: '📰',
      priority: 8,
      lastUpdated: new Date()
    },
    {
      id: 'sports-1',
      type: 'sports',
      title: 'Warriors',
      content: '118-112 vs Lakers • Live',
      icon: '🏀',
      priority: 6,
      lastUpdated: new Date()
    },
    {
      id: 'stocks-1',
      type: 'stocks',
      title: 'Portfolio',
      content: '+2.4% • $127k',
      icon: '📈',
      priority: 5,
      lastUpdated: new Date()
    },
    {
      id: 'energy-1',
      type: 'energy',
      title: 'Home Energy',
      content: '2.4 kWh today • Solar peak at 1pm',
      icon: '⚡',
      priority: 3,
      lastUpdated: new Date()
    },
    {
      id: 'health-1',
      type: 'health',
      title: 'Steps',
      content: '8,247 of 10,000 • 76% to goal',
      icon: '👟',
      priority: 4,
      lastUpdated: new Date()
    },
    {
      id: 'smart-1',
      type: 'smart-home',
      title: 'Home',
      content: 'All systems normal • 72° inside',
      icon: '🏠',
      priority: 2,
      lastUpdated: new Date()
    }
  ]);

  // Rotate widgets based on presence and priority
  useEffect(() => {
    const rotateWidgets = () => {
      const sortedWidgets = [...allWidgets].sort((a, b) => b.priority - a.priority);
      const displayCount = userPresence ? 6 : 4; // Show more when user is present
      
      // Randomly select from top priority widgets with some variation
      const topWidgets = sortedWidgets.slice(0, displayCount * 2);
      const selectedWidgets = topWidgets
        .sort(() => Math.random() - 0.5)
        .slice(0, displayCount);
      
      setCurrentWidgets(selectedWidgets);
    };

    rotateWidgets();
    
    // Rotate every 15-60 seconds based on presence
    const interval = setInterval(rotateWidgets, userPresence ? 15000 : 45000);
    
    return () => clearInterval(interval);
  }, [userPresence, allWidgets]);

  return (
    <div className="ambient-grid">
      {currentWidgets.map((widget, index) => (
        <div
          key={widget.id}
          className={`ambient-widget widget-${widget.type}`}
          style={{
            animationDelay: `${index * 200}ms`,
            animationDuration: '1s'
          }}
        >
          <div className="widget-header">
            <span className="widget-icon">{widget.icon}</span>
            <span className="widget-label">{widget.title}</span>
          </div>
          
          <div className="widget-content">
            {widget.content}
          </div>
          
          {/* Subtle freshness indicator */}
          <div className="widget-freshness">
            <div className="freshness-dot" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AmbientGrid;