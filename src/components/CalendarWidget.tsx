import React, { useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration?: string;
  type: 'meeting' | 'personal' | 'reminder';
}

const CalendarWidget: React.FC = () => {
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Standup',
      time: '9:00 AM',
      duration: '30 min',
      type: 'meeting'
    },
    {
      id: '2',
      title: 'Project Review',
      time: '2:00 PM',
      duration: '1 hr',
      type: 'meeting'
    },
    {
      id: '3',
      title: 'Grocery Shopping',
      time: '6:00 PM',
      type: 'personal'
    }
  ]);

  const getEventIcon = (type: CalendarEvent['type']): string => {
    const iconMap = {
      meeting: '🤝',
      personal: '📝',
      reminder: '⏰'
    };
    return iconMap[type];
  };

  const getEventColor = (type: CalendarEvent['type']): string => {
    const colorMap = {
      meeting: 'var(--highlight)',
      personal: 'var(--success)',
      reminder: 'var(--warning)'
    };
    return colorMap[type];
  };

  const today = new Date();
  const todayStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="widget calendar-widget">
      <div className="widget-title">Today's Schedule</div>
      
      <div style={{ 
        fontSize: 'var(--font-size-md)', 
        fontWeight: '300',
        marginBottom: 'var(--spacing-lg)',
        color: 'var(--secondary-text)'
      }}>
        {todayStr}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {events.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--accent-text)',
            fontSize: 'var(--font-size-sm)',
            padding: 'var(--spacing-lg)'
          }}>
            📅 No events today
          </div>
        ) : (
          events.map((event) => (
            <div 
              key={event.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--spacing-sm)',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${getEventColor(event.type)}`,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ 
                fontSize: 'var(--font-size-md)', 
                marginRight: 'var(--spacing-sm)'
              }}>
                {getEventIcon(event.type)}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: 'var(--font-size-sm)', 
                  fontWeight: '400',
                  marginBottom: '4px'
                }}>
                  {event.title}
                </div>
                <div style={{ 
                  fontSize: 'var(--font-size-xs)', 
                  color: 'var(--secondary-text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)'
                }}>
                  <span>🕐 {event.time}</span>
                  {event.duration && <span>⏱️ {event.duration}</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {events.length > 0 && (
        <div style={{ 
          marginTop: 'var(--spacing-lg)',
          textAlign: 'center',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--accent-text)'
        }}>
          {events.length} event{events.length !== 1 ? 's' : ''} today
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;