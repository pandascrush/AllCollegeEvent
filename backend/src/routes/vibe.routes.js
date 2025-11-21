import express from "express";
import { VibeController } from "../controllers/vibe.controller.js";

const router = express.Router();

router.get("/g_vibe", VibeController.getVibe);
router.post("/c_vibe", VibeController.createVibe);
router.put("/up_vibe/:id", VibeController.updateVibe);

export default router;
