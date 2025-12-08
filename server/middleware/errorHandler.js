import { HTTP_STATUS } from "../config/constants.js";

/**
 * Global error handling middleware
 * Catches all errors and returns consistent error responses
 */
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * 404 Not Found middleware
 * Handles requests to non-existent routes
 */
export const notFoundHandler = (req, res, next) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
};

/**
 * Request logger middleware
 * Logs incoming requests in development mode
 */
export const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  }
  next();
};
