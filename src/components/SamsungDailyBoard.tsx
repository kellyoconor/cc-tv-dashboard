import React, { useState, useEffect } from 'react';

interface Widget {
  id: string;
  type: 'weather' | 'smartthings' | 'notes' | 'music' | 'camera' | 'energy';
  size: '1x1' | '2x1' | '2x2';
  position: { row: number; col: number };
  data?: any;
}

const SamsungDailyBoard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const widgets: Widget[] = [
    {
      id: 'weather-main',
      type: 'weather',
      size: '2x2',
      position: { row: 0, col: 0 },
      data: {
        temperature: '72°',
        condition: 'Sunny',
        location: 'San Francisco',
        icon: 'sunny'
      }
    },
    {
      id: 'smartthings-lights',
      type: 'smartthings',
      size: '2x1',
      position: { row: 0, col: 2 },
      data: {
        deviceType: 'Lights',
        status: '3 on, 2 off',
        devices: [
          { name: 'Living Room', status: 'on' },
          { name: 'Kitchen', status: 'on' },
          { name: 'Bedroom', status: 'off' }
        ]
      }
    },
    {
      id: 'notes-memo',
      type: 'notes',
      size: '2x1',
      position: { row: 1, col: 2 },
      data: {
        notes: [
          'Pick up groceries',
          'Call mom at 3pm',
          'Meeting with team tomorrow'
        ]
      }
    },
    {
      id: 'music-player',
      type: 'music',
      size: '2x1',
      position: { row: 2, col: 0 },
      data: {
        isPlaying: false,
        track: 'Not playing',
        artist: '',
        service: 'Spotify'
      }
    },
    {
      id: 'energy-usage',
      type: 'energy',
      size: '2x1',
      position: { row: 2, col: 2 },
      data: {
        usage: '245 kWh',
        comparison: '-12% vs last month',
        trend: 'down'
      }
    }
  ];

  const WeatherWidget = ({ widget }: { widget: Widget }) => (
    <div className="widget weather-widget">
      <div className="widget-header">
        <div className="weather-icon">☀️</div>
        <div className="widget-title">Weather</div>
      </div>
      <div className="weather-content">
        <div className="temperature">{widget.data.temperature}</div>
        <div className="condition">{widget.data.condition}</div>
        <div className="location">{widget.data.location}</div>
      </div>
    </div>
  );

  const SmartThingsWidget = ({ widget }: { widget: Widget }) => (
    <div className="widget smartthings-widget">
      <div className="widget-header">
        <div className="smartthings-icon">🏠</div>
        <div className="widget-title">SmartThings</div>
      </div>
      <div className="smartthings-content">
        <div className="device-type">{widget.data.deviceType}</div>
        <div className="device-status">{widget.data.status}</div>
      </div>
    </div>
  );

  const NotesWidget = ({ widget }: { widget: Widget }) => (
    <div className="widget notes-widget">
      <div className="widget-header">
        <div className="notes-icon">📝</div>
        <div className="widget-title">Notes</div>
      </div>
      <div className="notes-content">
        {widget.data.notes.slice(0, 2).map((note: string, index: number) => (
          <div key={index} className="note-item">{note}</div>
        ))}
        {widget.data.notes.length > 2 && (
          <div className="note-more">+{widget.data.notes.length - 2} more</div>
        )}
      </div>
    </div>
  );

  const MusicWidget = ({ widget }: { widget: Widget }) => (
    <div className="widget music-widget">
      <div className="widget-header">
        <div className="music-icon">🎵</div>
        <div className="widget-title">Music</div>
      </div>
      <div className="music-content">
        <div className="track-info">
          <div className="track-name">{widget.data.track}</div>
          <div className="artist-name">{widget.data.artist}</div>
        </div>
        <div className="music-controls">
          <button className="play-pause">
            {widget.data.isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>
    </div>
  );

  const EnergyWidget = ({ widget }: { widget: Widget }) => (
    <div className="widget energy-widget">
      <div className="widget-header">
        <div className="energy-icon">⚡</div>
        <div className="widget-title">Energy</div>
      </div>
      <div className="energy-content">
        <div className="usage-amount">{widget.data.usage}</div>
        <div className={`usage-comparison ${widget.data.trend}`}>
          {widget.data.comparison}
        </div>
      </div>
    </div>
  );

  const renderWidget = (widget: Widget) => {
    const baseProps = {
      key: widget.id,
      className: `widget-container size-${widget.size}`,
      style: {
        gridRow: `${widget.position.row + 1} / span ${widget.size === '2x2' ? 2 : 1}`,
        gridColumn: `${widget.position.col + 1} / span ${widget.size.startsWith('2') ? 2 : 1}`
      }
    };

    switch (widget.type) {
      case 'weather':
        return <div {...baseProps}><WeatherWidget widget={widget} /></div>;
      case 'smartthings':
        return <div {...baseProps}><SmartThingsWidget widget={widget} /></div>;
      case 'notes':
        return <div {...baseProps}><NotesWidget widget={widget} /></div>;
      case 'music':
        return <div {...baseProps}><MusicWidget widget={widget} /></div>;
      case 'energy':
        return <div {...baseProps}><EnergyWidget widget={widget} /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="samsung-daily-board">
      {/* Ambient Background */}
      <div className="ambient-background" />
      
      {/* Widget Grid */}
      <div className="widget-grid">
        {widgets.map(renderWidget)}
      </div>

      {/* Edit Button */}
      <button 
        className="edit-button"
        onClick={() => setIsEditMode(!isEditMode)}
      >
        Edit
      </button>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="current-time">
          {currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        </div>
      </div>
    </div>
  );
};

export default SamsungDailyBoard;