import React, { useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration?: string;
  type: 'meeting' | 'personal' | 'reminder';
  location?: string;
  attendees?: string[];
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

const CalendarWidget: React.FC = () => {
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Morning workout',
      time: '7:00 AM',
      duration: '45 min',
      type: 'personal',
      location: 'Home gym',
      priority: 'high',
      description: 'Strength training session'
    },
    {
      id: '2',
      title: 'Client presentation',
      time: '10:30 AM',
      duration: '1 hr',
      type: 'meeting',
      location: 'Conference Room A',
      attendees: ['Sarah', 'Michael', 'Client Team'],
      priority: 'high',
      description: 'Q4 project review and next steps'
    },
    {
      id: '3',
      title: 'Lunch with mom',
      time: '12:30 PM',
      duration: '1.5 hr',
      type: 'personal',
      location: 'Café Luna',
      priority: 'medium',
      description: 'Catch up and birthday planning'
    },
    {
      id: '4',
      title: 'Team sync',
      time: '3:00 PM',
      duration: '30 min',
      type: 'meeting',
      attendees: ['Dev Team'],
      priority: 'medium',
      description: 'Sprint planning discussion'
    }
  ]);

  const getEventIcon = (type: CalendarEvent['type']): string => {
    const iconMap = {
      meeting: '💼',
      personal: '🌟',
      reminder: '⏰'
    };
    return iconMap[type];
  };
  
  const getPriorityColor = (priority: CalendarEvent['priority']): string => {
    const colorMap = {
      high: 'var(--accent-primary)',
      medium: 'var(--gray-400)',
      low: 'var(--gray-500)'
    };
    return colorMap[priority];
  };
  
  const getNextEvent = (events: CalendarEvent[]) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    return events.find(event => {
      const [time, period] = event.time.split(' ');
      const [hour, minute] = time.split(':').map(Number);
      let eventHour = hour;
      if (period === 'PM' && hour !== 12) eventHour += 12;
      if (period === 'AM' && hour === 12) eventHour = 0;
      
      return eventHour > currentHour || (eventHour === currentHour && minute > currentMinute);
    }) || events[0];
  };


  const today = new Date();
  const todayStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const nextEvent = getNextEvent(events);
  
  return (
    <div className="widget calendar-widget">
      {/* Label */}
      <div className="label mb-xs">Today's Schedule</div>
      
      {/* Next event */}
      {nextEvent && (
        <div className="mb-md">
          <div className="heading-md mb-xs">
            {nextEvent.title}
          </div>
          <div className="body-base mb-xs">
            {nextEvent.time} • {nextEvent.duration}
          </div>
          {nextEvent.location && (
            <div className="body-sm">
              📍 {nextEvent.location}
            </div>
          )}
        </div>
      )}
      
      {/* Event count */}
      <div className="body-sm" style={{ 
        textAlign: 'center', 
        paddingTop: 'var(--space-sm)', 
        borderTop: '1px solid var(--border)' 
      }}>
        {events.length} events today
      </div>
    </div>
  );
};

export default CalendarWidget;