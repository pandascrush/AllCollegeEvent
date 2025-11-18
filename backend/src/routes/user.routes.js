import express from "express";
import { UserController } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/sin_usr/:uid", UserController.singleUser);

export default router;
