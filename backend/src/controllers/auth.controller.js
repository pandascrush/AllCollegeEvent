import jwt from "jsonwebtoken";
import { AuthService } from "../services/auth.service.js";
import { ENV } from "../config/env.js";

export const AuthController = {
    async register(req, res) {
        try {
            const { email, password, role } = req.body;
            const data = await AuthService.register(email, password, role);
            res.json(data);
        } catch (err) {
            res.status(400).json({ message: err });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await AuthService.login(email, password);
            res.json(data);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    },

    async forgot(req, res) {
        try {
            await AuthService.sendResetCode(req.body.email);
            res.json({ message: "If email exists, a code has been sent" });
        } catch {
            res.status(500).json({ message: "Server error" });
        }
    },

    async verify(req, res) {
        try {
            const { email, code } = req.body;
            const tempToken = await AuthService.verifyCode(email, code);
            res.json({ tempToken });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    async reset(req, res) {
        try {
            const { tempToken, password } = req.body;
            const decoded = jwt.verify(tempToken, ENV.JWT_SECRET);

            if (decoded.action !== "reset")
                return res.status(400).json({ message: "Invalid token" });

            await AuthService.resetPassword(tempToken, password, decoded.id);
            res.json({ message: "Password changed" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
};
