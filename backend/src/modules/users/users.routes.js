import express from "express";
import { fetchUsers } from "./users.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, fetchUsers);

export default router;
