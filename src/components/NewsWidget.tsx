import React, { useState, useEffect } from 'react';

interface NewsItem {
  id: string;
  headline: string;
  source: string;
  category: 'tech' | 'business' | 'world' | 'health' | 'science';
  publishedAt: Date;
  imageUrl: string;
  summary: string;
  readTime: string;
}

const NewsWidget: React.FC = () => {
  const [news] = useState<NewsItem[]>([
    {
      id: '1',
      headline: 'College football recruiting class rankings update',
      source: 'ESPN',
      category: 'business',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=240&fit=crop',
      summary: 'Updated rankings show major shifts in top recruiting classes across Division I football programs.',
      readTime: '3 min read'
    },
    {
      id: '2',
      headline: 'Market Analysis: Tech Sector Momentum',
      source: 'Financial Times',
      category: 'tech',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop',
      summary: 'Technology stocks continue their upward trajectory with strong quarterly earnings reports.',
      readTime: '5 min read'
    },
    {
      id: '3',
      headline: 'Breakthrough in Renewable Energy Storage',
      source: 'Science Daily',
      category: 'science',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=240&fit=crop',
      summary: 'New battery technology promises to revolutionize how we store and distribute clean energy.',
      readTime: '4 min read'
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
      {/* Source */}
      <div className="label mb-xs">{currentNews.source}</div>
      
      {/* Headline */}
      <div className="heading-md mb-sm" style={{ lineHeight: 1.3 }}>
        {currentNews.headline}
      </div>
      
      {/* Summary */}
      <div className="body-base mb-md" style={{ lineHeight: 1.4 }}>
        {currentNews.summary}
      </div>
      
      {/* Metadata */}
      <div className="flex justify-between items-center body-sm">
        <span>{formatTimeAgo(currentNews.publishedAt)}</span>
        <span>{currentNews.readTime}</span>
      </div>
    </div>
  );
};

export default NewsWidget;