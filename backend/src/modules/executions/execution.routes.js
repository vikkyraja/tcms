import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { execute } from "./execution.controller.js";

const router = Router();

/**
 * @swagger
 * /api/executions:
 *   post:
 *     summary: Execute a test case
 *     tags: [Executions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [test_case_id, status]
 *             properties:
 *               test_case_id:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PASS, FAIL, BLOCKED, SKIPPED]
 *     responses:
 *       201:
 *         description: Test executed
 */
router.post("/", auth, execute);

export default router;
