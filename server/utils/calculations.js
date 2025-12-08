import { ISS_CONSTANTS } from "../config/constants.js";

/**
 * Utility functions for ISS calculations
 */

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const R = ISS_CONSTANTS.EARTH_RADIUS;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Calculate bearing (direction) between two coordinates
 * @param {number} lat1 - Start latitude
 * @param {number} lon1 - Start longitude
 * @param {number} lat2 - End latitude
 * @param {number} lon2 - End longitude
 * @returns {number} Bearing in degrees (0-360)
 */
export const calculateBearing = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const toDegrees = (radians) => radians * (180 / Math.PI);

  const dLon = toRadians(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
  const x =
    Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
    Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);

  const bearing = toDegrees(Math.atan2(y, x));
  return (bearing + 360) % 360;
};

/**
 * Calculate velocity from position samples
 * @param {Array} positions - Array of position objects with timestamp, latitude, longitude
 * @returns {Object} Velocity data including speed and direction
 */
export const calculateVelocity = (positions) => {
  // Return default values if insufficient data
  if (positions.length < 2) {
    return {
      speed: ISS_CONSTANTS.ORBITAL_SPEED,
      speedKmh: ISS_CONSTANTS.ORBITAL_SPEED * 3600,
      direction: null, // Changed from 0 to null to indicate unknown
      altitude: ISS_CONSTANTS.ORBITAL_ALTITUDE,
    };
  }

  const first = positions[0];
  const last = positions[positions.length - 1];

  const timeDiff = last.timestamp - first.timestamp; // in seconds

  // If time difference is too small (< 1 second), use default values
  if (timeDiff < 1) {
    return {
      speed: ISS_CONSTANTS.ORBITAL_SPEED,
      speedKmh: ISS_CONSTANTS.ORBITAL_SPEED * 3600,
      direction: null,
      altitude: ISS_CONSTANTS.ORBITAL_ALTITUDE,
    };
  }

  const distance = calculateDistance(
    first.latitude,
    first.longitude,
    last.latitude,
    last.longitude
  );

  const speed = distance / timeDiff; // km/s
  const speedKmh = speed * 3600; // km/h

  const direction = calculateBearing(
    first.latitude,
    first.longitude,
    last.latitude,
    last.longitude
  );

  return {
    speed: parseFloat(speed.toFixed(2)),
    speedKmh: parseFloat(speedKmh.toFixed(2)),
    direction: parseFloat(direction.toFixed(2)),
    altitude: ISS_CONSTANTS.ORBITAL_ALTITUDE,
  };
};

/**
 * Predict future positions based on current trajectory
 * @param {number} lat - Current latitude
 * @param {number} lon - Current longitude
 * @param {number} bearing - Current bearing in degrees
 * @param {number} steps - Number of future positions to predict
 * @returns {Array} Array of predicted positions
 */
export const predictTrajectory = (lat, lon, bearing, steps = 10) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const toDegrees = (radians) => radians * (180 / Math.PI);

  const trajectory = [];
  const R = ISS_CONSTANTS.EARTH_RADIUS;

  // Distance per step (approximate based on orbital period)
  const distancePerStep = (ISS_CONSTANTS.ORBITAL_SPEED * 60) / steps; // km per step

  for (let i = 1; i <= steps; i++) {
    const distance = distancePerStep * i;
    const angularDistance = distance / R;

    const lat1Rad = toRadians(lat);
    const lon1Rad = toRadians(lon);
    const bearingRad = toRadians(bearing);

    const lat2Rad = Math.asin(
      Math.sin(lat1Rad) * Math.cos(angularDistance) +
        Math.cos(lat1Rad) * Math.sin(angularDistance) * Math.cos(bearingRad)
    );

    const lon2Rad =
      lon1Rad +
      Math.atan2(
        Math.sin(bearingRad) * Math.sin(angularDistance) * Math.cos(lat1Rad),
        Math.cos(angularDistance) - Math.sin(lat1Rad) * Math.sin(lat2Rad)
      );

    trajectory.push({
      latitude: parseFloat(toDegrees(lat2Rad).toFixed(4)),
      longitude: parseFloat(toDegrees(lon2Rad).toFixed(4)),
      step: i,
    });
  }

  return trajectory;
};

/**
 * Format timestamp to ISO string
 * @param {number} timestamp - Unix timestamp
 * @returns {string} ISO formatted date string
 */
export const formatTimestamp = (timestamp) => {
  return new Date(timestamp * 1000).toISOString();
};

/**
 * Validate latitude and longitude
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {boolean} True if valid
 */
export const validateCoordinates = (lat, lon) => {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  return (
    !isNaN(latitude) &&
    !isNaN(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};
