import express from "express";
import crewController from "../controllers/crewController.js";

const router = express.Router();

/**
 * @route GET /api/crew
 * @desc Get current ISS crew members
 * @access Public
 */
router.get("/", crewController.getISSCrew);

export default router;
