import express from "express";
import { EventController } from "../controllers/event.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware ,EventController.createEvent);

export default router;
