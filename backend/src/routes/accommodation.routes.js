import { Router } from "express";
import { AccommodationController } from "../controllers/accommodation.controller.js";

const router = Router();

router.post("/cre", AccommodationController.create);
router.get("/", AccommodationController.getAll);
router.get("/:id", AccommodationController.getOne);
router.put("/:id", AccommodationController.update);
router.delete("/:id", AccommodationController.remove);

export default router;
