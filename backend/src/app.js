import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import routes from "./routes/index.js";

const app = express();

dotenv.config();
app.use(cors(process.env.CLIENT_URL));
app.use(express.json());
app.use("/api", routes);

app.get("/test", (req, res) => {
  res.send("Backend is working!");
});

app.use(errorHandler);

export default app;
