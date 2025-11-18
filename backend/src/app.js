import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import roleRoutes from "./routes/role.routes.js";
import vibeRoutes from "./routes/vibe.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(cors("http://localhost:5000"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/vibe", vibeRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

export default app;
