import express from "express";
import perkController from "../controllers/perk.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/c_perk", authMiddleware, perkController.create);
router.get("/g_perk", perkController.getAll);
router.get("/:id", authMiddleware, perkController.getOne);
router.put("/:id", authMiddleware, perkController.update);
router.delete("/:id", authMiddleware, perkController.delete);

export default router;
