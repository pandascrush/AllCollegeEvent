import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import roleRoutes from "./routes/role.routes.js";
import vibeRoutes from "./routes/vibe.routes.js";
import userRoutes from "./routes/user.routes.js";
import perkRoute from "./routes/perk.routes.js";
import accommRoute from "./routes/accommodation.routes.js";
import certRoute from "./routes/certification.route.js";
import eveTypeRoute from "./routes/event_type.route.js";
import eveTypeCatRoute from "./routes/event_type_category.route.js";
import institutionRoute from "./routes/institution.route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(cors(process.env.CLIENT_URL));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/vibe", vibeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/perk", perkRoute);
app.use("/api/accomm", accommRoute);
app.use("/api/cert", certRoute);
app.use("/api/eve-type", eveTypeRoute);
app.use("/api/eve-type-cat", eveTypeCatRoute);
app.use("/api/institute", institutionRoute);

app.use(errorHandler);

export default app;
