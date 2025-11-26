import jwt from "jsonwebtoken";

export const createToken = (payload, expiresIn = "2d") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
