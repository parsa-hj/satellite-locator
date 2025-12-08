import express from "express";
import {
  getPosition,
  getTrackingData,
  getPassTimes,
  healthCheck,
} from "../controllers/issController.js";

const router = express.Router();

/**
 * ISS API Routes
 * Base path: /api/iss
 */

// Health check
router.get("/health", healthCheck);

// Get current position only
router.get("/position", getPosition);

// Get full tracking data (position + velocity + trajectory)
router.get("/tracking", getTrackingData);

// Get pass times for a location
router.get("/passes", getPassTimes);

export default router;
