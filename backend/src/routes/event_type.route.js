import { Router } from "express";
import { EventTypeController } from "../controllers/event_type.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/cre", authMiddleware, EventTypeController.create);
router.get("/", authMiddleware, EventTypeController.getAll);
router.get("/:id", authMiddleware, EventTypeController.getOne);
router.put("/:id", authMiddleware, EventTypeController.update);
router.delete("/:id", authMiddleware, EventTypeController.remove);

export default router;
