import { Router } from "express";
import { InstitutionController } from "../controllers/institution.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/cre", authMiddleware, InstitutionController.create);
router.get("/", authMiddleware, InstitutionController.getAll);
router.get("/:id", authMiddleware, InstitutionController.getOne);
router.put("/:id", authMiddleware, InstitutionController.update);
router.delete("/:id", authMiddleware, InstitutionController.remove);

export default router;
