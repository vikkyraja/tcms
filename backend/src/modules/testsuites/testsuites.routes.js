import express from "express";
import { fetchTestSuites } from "./testsuites.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * GET /api/testsuites?projectId=uuid
 */
router.get("/", authMiddleware, fetchTestSuites);

export default router;
