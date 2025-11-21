import { Router } from "express";
import { CertificationController } from "../controllers/certification.controller.js";

const router = Router();

router.post("/cre", CertificationController.create);
router.get("/", CertificationController.getAll);
router.get("/:id", CertificationController.getOne);
router.put("/:id", CertificationController.update);
router.delete("/:id", CertificationController.remove);

export default router;
