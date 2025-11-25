import { Router } from "express";
import { CertificationController } from "../controllers/certification.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/cre", authMiddleware, CertificationController.create);
router.get("/get", CertificationController.getAll);
router.get("/:id", authMiddleware, CertificationController.getOne);
router.put("/:id", authMiddleware, CertificationController.update);
router.delete("/:id", authMiddleware, CertificationController.remove);

export default router;
