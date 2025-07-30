import React, { useState, useEffect } from 'react';

interface NewsItem {
  id: string;
  headline: string;
  source: string;
  category: 'tech' | 'business' | 'world' | 'health' | 'science';
  publishedAt: Date;
}

const NewsWidget: React.FC = () => {
  const [news] = useState<NewsItem[]>([
    {
      id: '1',
      headline: 'Tech Giants Report Strong Q4 Earnings',
      source: 'Tech News',
      category: 'tech',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '2',
      headline: 'Global Climate Summit Reaches Agreement',
      source: 'World Report',
      category: 'world',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
    },
    {
      id: '3',
      headline: 'Breakthrough in Renewable Energy Storage',
      source: 'Science Daily',
      category: 'science',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const getCategoryIcon = (category: NewsItem['category']): string => {
    const iconMap = {
      tech: '💻',
      business: '📈',
      world: '🌍',
      health: '🏥',
      science: '🔬'
    };
    return iconMap[category];
  };

  const getCategoryColor = (category: NewsItem['category']): string => {
    const colorMap = {
      tech: '#0066ff',
      business: '#00cc66',
      world: '#ff6600',
      health: '#ff0066',
      science: '#9966ff'
    };
    return colorMap[category];
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    return `${diffInHours} hours ago`;
  };

  // Auto-rotate news every 10 seconds
  useEffect(() => {
    const rotateTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 10000);

    return () => clearInterval(rotateTimer);
  }, [news.length]);

  const currentNews = news[currentIndex];

  return (
    <div className="widget news-widget">
      <div className="widget-title">Latest News</div>
      
      {currentNews && (
        <div style={{
          padding: 'var(--spacing-md)',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: `1px solid ${getCategoryColor(currentNews.category)}`,
          minHeight: '200px',
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
                {getCategoryIcon(currentNews.category)}
              </span>
              <span style={{ 
                color: getCategoryColor(currentNews.category),
                textTransform: 'uppercase',
                fontWeight: '500',
                letterSpacing: '1px'
              }}>
                {currentNews.category}
              </span>
            </div>
            
            <div style={{
              fontSize: 'var(--font-size-md)',
              fontWeight: '400',
              lineHeight: '1.3',
              marginBottom: 'var(--spacing-md)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {currentNews.headline}
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--accent-text)'
          }}>
            <span>📰 {currentNews.source}</span>
            <span>🕐 {formatTimeAgo(currentNews.publishedAt)}</span>
          </div>
        </div>
      )}
      
      {/* News indicator dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--spacing-xs)',
        marginTop: 'var(--spacing-md)'
      }}>
        {news.map((_, index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: index === currentIndex ? 'var(--highlight)' : 'var(--accent-text)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
      
      <div style={{
        textAlign: 'center',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--accent-text)',
        marginTop: 'var(--spacing-sm)'
      }}>
        {news.length} headlines • Auto-updating
      </div>
    </div>
  );
};

export default NewsWidget;