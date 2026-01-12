import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { getSummary } from "./analytics.controller.js";

const router = Router();

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get dashboard analytics summary
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard analytics data
 */
router.get("/summary", authMiddleware, getSummary);

export default router;
