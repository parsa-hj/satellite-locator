import axios from "axios";

/**
 * Fetch astronauts currently in space from Open Notify API
 * Filters to return only ISS crew members
 */
const getISSCrew = async () => {
  try {
    const response = await axios.get("http://api.open-notify.org/astros.json");

    if (response.data.message !== "success") {
      throw new Error("Failed to fetch astronaut data");
    }

    // Filter to only include astronauts on the ISS
    const issCrew = response.data.people.filter(
      (person) => person.craft === "ISS"
    );

    return {
      crew: issCrew,
      total: issCrew.length,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Open Notify API Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      throw new Error("No response from Open Notify API");
    } else {
      throw new Error(`Error fetching crew data: ${error.message}`);
    }
  }
};

export default {
  getISSCrew,
};
