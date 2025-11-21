import { Router } from "express";
import { EventTypeCategoryController } from "../controllers/event_type_category.controller.js";

const router = Router();

router.post("/cre", EventTypeCategoryController.create);
router.get("/", EventTypeCategoryController.getAll);

// Get categories by eventTypeId
router.get("/event/:eventTypeId", EventTypeCategoryController.getByEventType);

router.get("/:id", EventTypeCategoryController.getOne);
router.put("/:id", EventTypeCategoryController.update);
router.delete("/:id", EventTypeCategoryController.remove);

export default router;
