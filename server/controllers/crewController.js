import crewService from "../services/crewService.js";

/**
 * Get current ISS crew members
 * @route GET /api/crew
 */
const getISSCrew = async (req, res, next) => {
  try {
    const crewData = await crewService.getISSCrew();

    res.status(200).json({
      success: true,
      data: crewData,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getISSCrew,
};
