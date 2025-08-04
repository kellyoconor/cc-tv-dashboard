import React, { useState, useEffect } from 'react';

interface Card {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  bgColor: string;
}

const CardCarousel: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const cards: Card[] = [
    {
      id: 'weather-today',
      title: "Today's Weather",
      subtitle: "72° • Sunny • UV Index 6",
      icon: '☀️',
      bgColor: '#7FB3D3'
    },
    {
      id: 'weather-tomorrow',
      title: 'Tomorrow',
      subtitle: '68° • Partly Cloudy',
      icon: '🌤️',
      bgColor: '#95A5A6'
    },
    {
      id: 'air-quality',
      title: 'Air Quality',
      subtitle: 'Good • AQI 42',
      icon: '🌡️',
      bgColor: '#85C1E9'
    },
    {
      id: 'commute',
      title: 'Home to Work',
      subtitle: '23 min • Light traffic',
      icon: '🚗',
      bgColor: '#B2BABB'
    },
    {
      id: 'metro',
      title: 'Metro Status',
      subtitle: 'On time • Next train 8 min',
      icon: '🚇',
      bgColor: '#A8D8B9'
    },
    {
      id: 'flight',
      title: 'Flight AA127',
      subtitle: 'On time • Gate A12',
      icon: '✈️',
      bgColor: '#D4EDDA'
    },
    {
      id: 'calendar',
      title: 'Next Meeting',
      subtitle: '2:30 PM • Team Standup',
      icon: '📅',
      bgColor: '#F8D7DA'
    },
    {
      id: 'stocks',
      title: 'Portfolio',
      subtitle: '+2.4% • $127k',
      icon: '📈',
      bgColor: '#D1ECF1'
    }
  ];

  return (
    <div className="carousel-container">
      {/* Simple header */}
      <div className="carousel-header">
        <div className="current-time">
          {currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        </div>
        <div className="current-date">
          {currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Card carousel */}
      <div className="cards-scroll">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className="info-card"
            style={{ backgroundColor: card.bgColor }}
          >
            <div className="card-icon">
              {card.icon}
            </div>
            <div className="card-content">
              <div className="card-title">
                {card.title}
              </div>
              <div className="card-subtitle">
                {card.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;