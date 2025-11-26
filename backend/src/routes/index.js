import express from "express";
const router = express.Router();

import authRoutes from "./auth.routes.js";
import roleRoutes from "./role.routes.js";
import vibeRoutes from "./vibe.routes.js";
import userRoutes from "./user.routes.js";
import perkRoute from "./perk.routes.js";
import accommRoute from "./accommodation.routes.js";
import certRoute from "./certification.route.js";
import eveTypeRoute from "./event_type.route.js";
import eveTypeCatRoute from "./event_type_category.route.js";
import institutionRoute from "./institution.route.js";
import eventRoute from "./event.routes.js";

router.use("/auth", authRoutes);
router.use("/role", roleRoutes);
router.use("/vibe", vibeRoutes);
router.use("/user", userRoutes);
router.use("/perk", perkRoute);
router.use("/accomm", accommRoute);
router.use("/cert", certRoute);
router.use("/eve-type", eveTypeRoute);
router.use("/eve-type-cat", eveTypeCatRoute);
router.use("/institute", institutionRoute);
router.use("/event", eventRoute);

export default router;
