import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgot", AuthController.forgot);
router.post("/verify-code", AuthController.verify);
router.post("/reset", AuthController.reset);
router.post("/google-login", AuthController.googleLoginController);
router.post("/logout", AuthController.logout);

export default router;
