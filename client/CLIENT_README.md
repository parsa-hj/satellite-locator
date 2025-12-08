# ISS Locator - Frontend

A modern React application for tracking the International Space Station in real-time.

## Features

- Real-time ISS position tracking with auto-refresh (every 5 seconds)
- Interactive world map with ISS marker and trajectory visualization
- Live orbital data: speed, altitude, direction, and predicted path
- Responsive design for mobile and desktop
- Clean UI built with Ant Design

## Tech Stack

- **React 19** - UI framework
- **Ant Design** - Component library
- **Leaflet** - Interactive maps
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

## Project Structure

```
client/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ISSMap.jsx
│   │   └── ISSStats.jsx
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Tracking.jsx
│   │   └── About.jsx
│   ├── services/        # API communication
│   │   └── issService.js
│   ├── hooks/          # Custom React hooks
│   │   └── useISSTracking.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── .env                # Environment variables
└── package.json        # Dependencies
```

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your API URL:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`