import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import apiRoutes from "./routes/index.js";
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
} from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Security and parsing middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(requestLogger);

// Static files
app.use(express.static("public"));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "ISS Locator API is running!",
    version: "1.0.0",
    endpoints: {
      api: "/api",
      health: "/api/health",
      iss: {
        position: "/api/iss/position",
        tracking: "/api/iss/tracking",
        passes: "/api/iss/passes?lat=<LAT>&lon=<LON>",
        health: "/api/iss/health",
      },
    },
  });
});

// API routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`ISS Locator API listening on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`API available at: http://localhost:${port}/api`);
});
