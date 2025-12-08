import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * Fetch current ISS crew members
 */
export const getISSCrew = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/crew`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch ISS crew data"
    );
  }
};
