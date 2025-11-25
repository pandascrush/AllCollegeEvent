import { Router } from "express";
import { AccommodationController } from "../controllers/accommodation.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/cre",authMiddleware ,AccommodationController.create);
router.get("/", authMiddleware,AccommodationController.getAll);
router.get("/:id", authMiddleware,AccommodationController.getOne);
router.put("/:id", authMiddleware,AccommodationController.update);
router.delete("/:id", authMiddleware,AccommodationController.remove);

export default router;
