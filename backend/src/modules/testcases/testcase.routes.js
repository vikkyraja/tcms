import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import {
  getAllTestCases,
  getTestCase,
  addTestCase,
  editTestCase,
  removeTestCase,
} from "./testcase.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getAllTestCases);
router.get("/:id", authMiddleware, getTestCase);

router.post(
  "/",
  authMiddleware,
  allowRoles("ADMIN", "TEST_LEAD"),
  addTestCase
);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN", "TEST_LEAD"),
  editTestCase
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN", "TEST_LEAD"),
  removeTestCase
);

export default router;
