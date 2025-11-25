import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/sin_usr/:uid", authMiddleware, UserController.singleUser);

export default router;
