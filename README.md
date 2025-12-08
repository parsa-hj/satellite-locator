# ISS Locator

A real-time tracking application for the International Space Station (ISS). Track the ISS position, velocity, and altitude on an interactive map.

## Quick Start

This application consists of two parts: a backend API server and a frontend React app. **Both need to be running simultaneously.**

### 1. Start the Backend Server

Open a terminal and run:

```bash
cd server
npm install
npm start or nodemon start
```

You should see:

```
ISS Locator API listening on port 5000
Environment: development
API available at: http://localhost:5000/api
```

### 2. Start the Frontend App

Open a **second terminal** (keep the backend running) and run:

```bash
cd client
npm install
npm run dev
```

You should see:

```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 3. Open Your Browser

Navigate to `http://localhost:5173` to use the ISS Locator.

## Features

- Real-time ISS position tracking
- Interactive world map with ISS marker (Leaflet)
- Live orbital data: speed, altitude, direction
- Responsive design (mobile + desktop)

## Tech Stack

### Backend

- Node.js & Express
- Axios (HTTP client)
- Modular architecture (routes, controllers, services, utils)
- Open Notify API for ISS data

### Frontend

- React 19
- Ant Design (UI components)
- Leaflet & React Leaflet (maps)
- React Router (navigation)
- Axios (API communication)
- Vite (build tool)

## Project Structure

```
satellite-locator/
├── server/               # Backend API (Node.js + Express)
│   ├── config/          # Constants and configuration
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic & external APIs
│   ├── routes/          # API route definitions
│   ├── middleware/      # Error handling & logging
│   ├── utils/           # Helper functions (calculations)
│   └── index.js         # Entry point
│
└── client/               # Frontend (React + Vite)
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Page components
    │   ├── services/    # API communication
    │   ├── hooks/       # Custom React hooks
    │   └── App.jsx      # Main app component
    └── public/          # Static assets
```

## API Endpoints

**Base URL:** `http://localhost:5000/api`

- `GET /api/iss/position` - Current ISS position (lat/lon)
- `GET /api/iss/tracking` - Full tracking data (position + velocity + trajectory)
- `GET /api/iss/health` - API health check
- `GET /api/crew` - Current ISS crew members

## Documentation

- [Backend API Documentation](server/API_DOCUMENTATION.md)
- [Frontend Documentation](client/CLIENT_README.md)
