# ISS Locator API

A RESTful API for tracking the International Space Station (ISS) in real-time, providing position, velocity, altitude, and trajectory data.

## Features

- Real-time ISS position tracking
- Velocity and trajectory calculations
- Clean RESTful API design
- Modular architecture (routes, controllers, services, utils)
- Proper error handling

## Architecture

```
server/
├── config/          # Configuration and constants
├── controllers/     # Request handlers
├── services/        # Business logic and external API calls
├── routes/          # API route definitions
├── middleware/      # Custom middleware (error handling, logging)
├── utils/           # Helper functions and calculations
└── index.js         # Entry point
```

## API Endpoints

### Base URL: `http://localhost:5000/api`

### ISS Tracking Endpoints

#### 1. Get Current Position

```http
GET /api/iss/position
```

**Response:**

```json
{
  "success": true,
  "data": {
    "timestamp": 1733587200,
    "datetime": "2025-12-07T12:00:00.000Z",
    "position": {
      "latitude": 45.1234,
      "longitude": -93.5678
    }
  }
}
```

#### 2. Get Full Tracking Data

```http
GET /api/iss/tracking
```

Returns position, velocity, altitude, and predicted trajectory.

**Response:**

```json
{
  "success": true,
  "data": {
    "timestamp": 1733587200,
    "datetime": "2025-12-07T12:00:00.000Z",
    "position": {
      "latitude": 45.1234,
      "longitude": -93.5678
    },
    "velocity": {
      "speed": 7.66,
      "speedKmh": 27576,
      "direction": 85.3
    },
    "altitude": 408,
    "trajectory": [
      { "latitude": 45.5, "longitude": -92.3, "step": 1 },
      { "latitude": 46.2, "longitude": -91.1, "step": 2 }
    ]
  }
}
```


#### 4. Health Check

```http
GET /api/iss/health
```

Check if the ISS API service is operational.

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create environment file:**

   ```bash
   cp .env
   ```

3. **Start the server:**

   ```bash
   nodemon index.js or npm start
   ```

   The API will be available at `http://localhost:5000`

## Development

The server uses `nodemon` for automatic restart on file changes:

## Technologies

- **Express.js** - Web framework
- **Axios** - HTTP client for external API calls
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## External APIs

This service uses the [Open Notify API](http://open-notify.org/):

- ISS Position: `http://api.open-notify.org/iss-now.json`

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

HTTP Status Codes:

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable (external API error)

## Calculations

The API includes several utility functions for ISS tracking:

- **Distance Calculation**: Haversine formula for accurate distance between coordinates
- **Bearing Calculation**: Direction of travel in degrees (0-360)
- **Velocity Calculation**: Speed from multiple position samples
- **Trajectory Prediction**: Future positions based on current bearing and orbital speed
