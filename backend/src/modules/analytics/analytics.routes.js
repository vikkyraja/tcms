import { Router } from "express";
import authMiddleware  from "../../middlewares/auth.middleware.js";
import { getSummary } from "./analytics.controller.js";

const router = Router();

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get dashboard analytics summary
 *     tags: [Analytics]
 *     security:
 *       - bearerauthMiddleware: []
 *     responses:
 *       200:
 *         description: Dashboard analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalTestCases:
 *                   type: number
 *                 totalExecutions:
 *                   type: number
 *                 passed:
 *                   type: number
 *                 failed:
 *                   type: number
 *                 blocked:
 *                   type: number
 *                 skipped:
 *                   type: number
 */
router.get("/summary", authMiddleware, getSummary);

export default router;
