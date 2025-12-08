import axios from "axios";
import { API_CONFIG } from "../config/constants.js";

/**
 * Service layer for ISS-related API calls
 * Handles all external API communications with error handling
 */

class ISSService {
  /**
   * Fetch current ISS position from Open Notify API
   * @returns {Promise<Object>} ISS position data with timestamp, latitude, and longitude
   * @throws {Error} If API call fails
   */
  async getCurrentPosition() {
    try {
      const response = await axios.get(API_CONFIG.ISS_NOW_URL, {
        timeout: API_CONFIG.REQUEST_TIMEOUT,
      });

      if (response.data.message !== "success") {
        throw new Error("Invalid response from ISS API");
      }

      return {
        timestamp: response.data.timestamp,
        latitude: parseFloat(response.data.iss_position.latitude),
        longitude: parseFloat(response.data.iss_position.longitude),
      };
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        throw new Error("ISS API request timeout");
      }
      if (error.response) {
        throw new Error(`ISS API error: ${error.response.status}`);
      }
      throw new Error(`Failed to fetch ISS position: ${error.message}`);
    }
  }

  /**
   * Fetch ISS pass times for a specific location
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @param {number} alt - Altitude in meters (default: 0)
   * @param {number} n - Number of passes to return (default: 5)
   * @returns {Promise<Object>} Pass times data
   */
  async getPassTimes(lat, lon, alt = 0, n = 5) {
    try {
      const response = await axios.get(API_CONFIG.ISS_PASS_URL, {
        params: { lat, lon, alt, n },
        timeout: API_CONFIG.REQUEST_TIMEOUT,
      });

      if (response.data.message !== "success") {
        throw new Error("Invalid response from ISS Pass API");
      }

      return {
        request: response.data.request,
        passes: response.data.response,
      };
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        throw new Error("ISS Pass API request timeout");
      }
      if (error.response) {
        throw new Error(`ISS Pass API error: ${error.response.status}`);
      }
      throw new Error(`Failed to fetch ISS pass times: ${error.message}`);
    }
  }

  /**
   * Fetch multiple position samples for trajectory calculation
   * @param {number} samples - Number of samples to collect (default: 3)
   * @param {number} interval - Interval between samples in ms (default: 2000)
   * @returns {Promise<Array>} Array of position samples
   */
  async getPositionSamples(samples = 3, interval = 2000) {
    const positions = [];

    for (let i = 0; i < samples; i++) {
      const position = await this.getCurrentPosition();
      positions.push(position);

      // Wait before next sample (except for last iteration)
      if (i < samples - 1) {
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }

    return positions;
  }
}

export default new ISSService();
