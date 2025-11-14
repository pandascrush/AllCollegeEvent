import express from "express";
import { AuthController } from "../controllers/auth.controller.js";

const router = express.Router();

// Auth Routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgot", AuthController.forgot);
router.post("/verify-code", AuthController.verify);
router.post("/reset", AuthController.reset);

export default router;
