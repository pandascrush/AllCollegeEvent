import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const createToken = (payload, expiresIn = "7d") => {
    return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn });
};
