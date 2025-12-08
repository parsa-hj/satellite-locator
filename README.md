# ISS Locator

A modern, real-time tracking application for the International Space Station (ISS). Track the ISS position, velocity, altitude, and predicted trajectory on an interactive map.

## 🚀 Quick Start

This application consists of two parts: a backend API server and a frontend React app. **Both need to be running simultaneously.**

### 1. Start the Backend Server

Open a terminal and run:

```bash
cd server
npm install
npm start
```

You should see:

```
🚀 ISS Locator API listening on port 5000
📍 Environment: development
🌐 API available at: http://localhost:5000/api
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

## 📋 Features

- 🛰️ Real-time ISS position tracking
- 🗺️ Interactive world map with ISS marker (Leaflet)
- 📊 Live orbital data: speed, altitude, direction
- 🎯 Predicted trajectory visualization
- 📱 Responsive design (mobile + desktop)
- 🎨 Clean UI built with Ant Design
- 🔄 Manual refresh (no auto-refresh)

## 🛠️ Tech Stack

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

## 📁 Project Structure

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

## 🔧 Troubleshooting

### Error: "Failed to fetch ISS tracking data"

**Cause:** The backend server is not running.

**Solution:** Make sure you've started the backend server:

```bash
cd server
npm start
```

Check that you see the "ISS Locator API listening on port 5000" message.

### Port Already in Use

**Backend (port 5000):**

- Stop any other process using port 5000
- Or change the port in `server/.env`:
  ```
  PORT=5001
  ```
  Then update `client/.env`:
  ```
  VITE_API_URL=http://localhost:5001/api
  ```

**Frontend (port 5173):**

- Vite will automatically try the next available port

## 🌐 API Endpoints

**Base URL:** `http://localhost:5000/api`

- `GET /api/iss/position` - Current ISS position (lat/lon)
- `GET /api/iss/tracking` - Full tracking data (position + velocity + trajectory)
- `GET /api/iss/health` - API health check

## 📖 Documentation

- [Backend API Documentation](server/API_DOCUMENTATION.md)
- [Frontend Documentation](client/CLIENT_README.md)

## 🎯 Usage Notes

- **Manual refresh only**: Data updates only when you click the "Refresh" button
- **Trajectory prediction**: Shows 10 predicted future positions based on current orbital path
- **Map controls**: Zoom, pan, and click on the ISS marker for details

## 📄 License

ISC

## 🙏 Credits

ISS position data provided by [Open Notify API](http://open-notify.org/)
