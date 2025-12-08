import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * ISS API Service
 * Handles all communication with the ISS tracking backend
 */

const issApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Get current ISS position
 * @returns {Promise<Object>} Position data with timestamp and coordinates
 */
export const getISSPosition = async () => {
  try {
    const response = await issApi.get("/iss/position");
    return response.data;
  } catch (error) {
    console.error("Error fetching ISS position:", error);
    throw new Error(
      error.response?.data?.error || "Failed to fetch ISS position"
    );
  }
};

/**
 * Get full ISS tracking data (position + velocity + trajectory)
 * @returns {Promise<Object>} Complete tracking data
 */
export const getISSTracking = async () => {
  try {
    const response = await issApi.get("/iss/tracking");
    return response.data;
  } catch (error) {
    console.error("Error fetching ISS tracking data:", error);
    throw new Error(
      error.response?.data?.error || "Failed to fetch ISS tracking data"
    );
  }
};

/**
 * Check ISS API health
 * @returns {Promise<Object>} Health status
 */
export const checkISSHealth = async () => {
  try {
    const response = await issApi.get("/iss/health");
    return response.data;
  } catch (error) {
    console.error("Error checking ISS API health:", error);
    throw new Error(
      error.response?.data?.error || "Failed to check ISS API health"
    );
  }
};

export default {
  getISSPosition,
  getISSTracking,
  checkISSHealth,
};
