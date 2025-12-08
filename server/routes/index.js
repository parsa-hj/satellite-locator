import express from "express";
import issRoutes from "./issRoutes.js";

const router = express.Router();

/**
 * Main API router
 * Aggregates all route modules
 */

// ISS routes
router.use("/iss", issRoutes);

// Health check for API
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
