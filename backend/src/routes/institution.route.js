import { Router } from "express";
import { InstitutionController } from "../controllers/institution.controller.js";

const router = Router();

router.post("/cre",   InstitutionController.create);
router.get("/",    InstitutionController.getAll);
router.get("/:id", InstitutionController.getOne);
router.put("/:id", InstitutionController.update);
router.delete("/:id", InstitutionController.remove);

export default router;
