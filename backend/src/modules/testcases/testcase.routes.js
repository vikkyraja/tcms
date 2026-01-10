import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { getAll, create } from "./testcase.controller.js";

const router = Router();

/**
 * @swagger
 * /api/testcases:
 *   get:
 *     summary: Get all test cases
 *     tags: [TestCases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of test cases
 */
router.get("/", auth, getAll);

/**
 * @swagger
 * /api/testcases:
 *   post:
 *     summary: Create a test case
 *     tags: [TestCases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, priority, type]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH, CRITICAL]
 *               type:
 *                 type: string
 *                 enum: [FUNCTIONAL, REGRESSION, SMOKE, API, UI]
 *     responses:
 *       201:
 *         description: Test case created
 */
router.post("/", auth, allowRoles("ADMIN", "TEST_LEAD"), create);

export default router;
