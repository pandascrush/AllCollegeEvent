import express from "express";
import perkController from "../controllers/perk.controller.js";

const router = express.Router();

router.post("/c_perk", perkController.create);
router.get("/g_perk", perkController.getAll);
router.get("/:id", perkController.getOne);
router.put("/:id", perkController.update);
router.delete("/:id", perkController.delete);

export default router;
