import express from "express";
import { VibeController } from "../controllers/vibe.controller.js";

const router = express.Router();

router.get("/get_vibe", VibeController.getVibe);
router.post("/create_vibe", VibeController.createVibe);
router.put("/update_vibe/:id", VibeController.updateVibe);

export default router;
