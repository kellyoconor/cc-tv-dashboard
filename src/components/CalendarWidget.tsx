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
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
        {events.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--accent-text)',
            fontSize: 'var(--font-size-sm)',
            padding: 'var(--spacing-lg)',
            fontWeight: '300'
          }}>
            No events today
          </div>
        ) : (
          events.slice(0, 2).map((event) => (
            <div 
              key={event.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--spacing-lg)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ 
                fontSize: 'var(--font-size-lg)', 
                minWidth: '48px',
                opacity: 0.7
              }}>
                {getEventIcon(event.type)}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: 'var(--font-size-md)', 
                  fontWeight: '300',
                  marginBottom: 'var(--spacing-xs)',
                  color: 'var(--primary-text)'
                }}>
                  {event.title}
                </div>
                <div style={{ 
                  fontSize: 'var(--font-size-sm)', 
                  color: 'var(--secondary-text)',
                  fontWeight: '300'
                }}>
                  {event.time}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;