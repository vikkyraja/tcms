import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  getAllTestCases,
  getTestCase,
  addTestCase,
  editTestCase,
  removeTestCase,
} from "./testcase.controller.js";

const router = Router();

/**
 * @swagger
 * /api/testcases:
 *   get:
 *     summary: Get all test cases (paginated)
 *     tags: [TestCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of test cases
 */

/**
 * @swagger
 * /api/testcases/{id}:
 *   put:
 *     summary: Update a test case
 *     tags: [TestCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - project_id
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               type:
 *                 type: string
 *               pre:
 *                 type: string
 *               post:
 *                 type: string
 *               steps:
 *                 type: array
 *               tags:
 *                 type: string
 *               project_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       400:
 *         description: Bad request
 */

router.get("/", authMiddleware, getAllTestCases);
router.get("/:id", authMiddleware, getTestCase);
router.post("/", authMiddleware, addTestCase);
router.put("/:id", authMiddleware, editTestCase);
router.delete("/:id", authMiddleware, removeTestCase);

export default router;

