# Premium Ambient TV Dashboard

A beautiful, minimalist ambient TV dashboard designed for glanceable viewing from across the room. Built with React, TypeScript, and optimized for Android TV design principles.

## Features

### 🕐 Time & Date Display
- Large, readable typography optimized for 10ft viewing
- Dynamic greeting messages (Good Morning/Afternoon/Evening)
- Clean, minimalist time format with prominent display

### 🌤️ Weather Widget
- Current temperature and conditions with emoji icons
- High/low temperatures and humidity
- Location display with clean, glanceable information
- Simulated real-time updates

### 📅 Calendar Integration
- Today's schedule with event categorization
- Color-coded event types (meetings, personal, reminders)
- Time and duration display for easy scanning
- Event counter and status indicators

### 📰 News Feed
- Auto-rotating news headlines optimized for minimal reading
- Category-based organization (Tech, Business, World, Health, Science)
- Clean presentation with source attribution and timestamps
- Progress indicators and auto-refresh functionality

### 📈 Stock Market Ticker
- Real-time stock price simulation
- Auto-cycling through major stocks (AAPL, GOOGL, TSLA, MSFT)
- Visual indicators for price changes (📈/📉)
- Market status and mini-overview of other stocks

### ✨ Lifestyle Content
- Rotating inspirational quotes, wellness tips, and interesting facts
- Categorized content (Motivation, Wellness, Health, Growth, etc.)
- Auto-updating every 15 seconds with progress indicators
- Beautiful typography optimized for easy reading

## Design Principles

### Android TV Optimized
- **10ft UI Design**: Large fonts, high contrast, simple layouts
- **Glanceable Information**: Minimal reading requirements
- **High Contrast**: Optimized for various TV displays and lighting conditions
- **Responsive Grid**: Adapts to different TV screen sizes

### Typography & Spacing
- Extra-large font sizes (18px - 120px) for distance viewing
- Generous spacing between elements
- Clean, modern typography with excellent readability
- Optimized line heights and letter spacing

### Color Palette
- Deep black background with subtle gradients
- High-contrast white text for maximum readability
- Color-coded categories and status indicators
- Elegant accent colors for visual hierarchy

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Usage
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

1. Open http://localhost:5173 in your browser
2. For TV display, connect your computer to a TV via HDMI
3. Set browser to fullscreen mode (F11)
4. Enjoy your ambient TV dashboard!

## Technical Details

### Built With
- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS Custom Properties** for consistent theming
- **CSS Grid & Flexbox** for responsive layouts

### Key Features
- Optimized for 4K, 1080p, and 720p displays
- Real-time auto-updating widgets
- High contrast design for accessibility
- Responsive layout for different TV sizes
- Lightweight and performant

## Customization
- **Colors**: Modify CSS custom properties in `src/styles/global.css`
- **Content**: Update widget data in respective component files
- **Layout**: Adjust grid template in `.tv-dashboard` CSS class
- **Timing**: Modify auto-rotation intervals in component useEffect hooks

---

*Designed for the modern smart home experience - bringing elegance and functionality to your ambient display.*
