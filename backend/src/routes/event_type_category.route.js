import { Router } from "express";
import { EventTypeCategoryController } from "../controllers/event_type_category.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/cre", authMiddleware, EventTypeCategoryController.create);
router.get("/", authMiddleware, EventTypeCategoryController.getAll);

// Get categories by eventTypeId
router.get(
  "/event/:eventTypeId",
  authMiddleware,
  EventTypeCategoryController.getByEventType
);

router.get("/:id", authMiddleware, EventTypeCategoryController.getOne);
router.put("/:id", authMiddleware, EventTypeCategoryController.update);
router.delete("/:id", authMiddleware, EventTypeCategoryController.remove);

export default router;
