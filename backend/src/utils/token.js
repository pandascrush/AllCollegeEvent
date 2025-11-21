import jwt from "jsonwebtoken";

export const createToken = (payload, expiresIn = "7d") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
