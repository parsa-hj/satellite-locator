import express from "express";
import {
  getPosition,
  getTrackingData,
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

export default router;
