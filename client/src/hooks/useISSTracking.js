import { useState, useEffect, useRef } from "react";
import { getISSTracking } from "../services/issService";

/**
 * Custom hook to fetch and auto-refresh ISS tracking data
 * @param {number} refreshInterval - Refresh interval in milliseconds (default: 5000ms)
 * @returns {Object} { data, loading, error, refetch }
 */
export const useISSTracking = (refreshInterval = 5000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const fetchData = async () => {
    try {
      setError(null);
      const response = await getISSTracking();
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval for auto-refresh
    if (refreshInterval > 0) {
      intervalRef.current = setInterval(fetchData, refreshInterval);
    }

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refreshInterval]);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};
