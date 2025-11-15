import express from "express";
import { RoleController } from "../controllers/role.controller.js";

const router = express.Router();

router.get("/get_role", RoleController.getRole);

export default router;
