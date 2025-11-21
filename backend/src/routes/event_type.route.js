import { Router } from "express";
import { EventTypeController } from "../controllers/event_type.controller.js";

const router = Router();

router.post("/cre", EventTypeController.create);
router.get("/", EventTypeController.getAll);
router.get("/:id", EventTypeController.getOne);
router.put("/:id", EventTypeController.update);
router.delete("/:id", EventTypeController.remove);

export default router;
