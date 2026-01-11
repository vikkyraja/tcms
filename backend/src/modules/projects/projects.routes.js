import express from "express";
import { fetchProjects } from "./projects.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * GET /api/projects
 * All authenticated users
 */
router.get("/", authMiddleware, fetchProjects);

export default router;
