import issService from "../services/issService.js";
import {
  calculateVelocity,
  predictTrajectory,
  formatTimestamp,
} from "../utils/calculations.js";
import { HTTP_STATUS } from "../config/constants.js";

/**
 * Get current ISS position
@route GET /api/iss/position
 */
export const getPosition = async (req, res) => {
  try {
    const position = await issService.getCurrentPosition();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        timestamp: position.timestamp,
        datetime: formatTimestamp(position.timestamp),
        position: {
          latitude: position.latitude,
          longitude: position.longitude,
        },
      },
    });
  } catch (error) {
    res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Get current ISS position with velocity and trajectory data
 * @route GET /api/iss/tracking
 */
export const getTrackingData = async (req, res) => {
  try {
    // Collect multiple position samples for velocity calculation
    const positions = await issService.getPositionSamples(3, 2000);

    if (positions.length === 0) {
      throw new Error("No position data available");
    }

    const currentPosition = positions[positions.length - 1];
    const velocity = calculateVelocity(positions);
    const trajectory = predictTrajectory(
      currentPosition.latitude,
      currentPosition.longitude,
      velocity.direction,
      10
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        timestamp: currentPosition.timestamp,
        datetime: formatTimestamp(currentPosition.timestamp),
        position: {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
        },
        velocity: {
          speed: velocity.speed,
          speedKmh: velocity.speedKmh,
          direction: velocity.direction,
        },
        altitude: velocity.altitude,
        trajectory,
      },
    });
  } catch (error) {
    res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Health check endpoint
 * @route GET /api/iss/health
 */
export const healthCheck = async (req, res) => {
  try {
    // Test if we can reach the ISS API
    await issService.getCurrentPosition();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "ISS API is operational",
      timestamp: Math.floor(Date.now() / 1000),
    });
  } catch (error) {
    res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({
      success: false,
      message: "ISS API is unavailable",
      error: error.message,
    });
  }
};
