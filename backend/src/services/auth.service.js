import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/User.model.js";
import { sendEmail } from "../utils/mailer.js";
import { createToken } from "../utils/token.js";
import { ENV } from "../config/env.js";

export const AuthService = {
    async register(email, password, role) {
        const existing = await User.findOne({ email });
        if (existing) throw new Error("Email already registered");

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            passwordHash: hash,
            role,
        });

        const token = createToken({
            id: user._id,
            email: user.email,
            role: user.role,
        });

        return { user, token };
    },

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid credentials");

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) throw new Error("Invalid credentials");

        const token = createToken({
            id: user._id,
            email: user.email,
            role: user.role,
        });

        return { user, token };
    },

    async sendResetCode(email) {
        const user = await User.findOne({ email });
        if (!user) return true; // soft fail

        const code = crypto.randomInt(1000, 9999).toString();

        user.resetCode = code;
        user.resetCodeExpire = Date.now() + 15 * 60 * 1000;
        await user.save();

        await sendEmail({
            to: email,
            subject: "Password Reset Code",
            html: `<p>Your reset code is <b>${code}</b></p>`,
        });

        return true;
    },

    async verifyCode(email, code) {
        const user = await User.findOne({ email });

        if (
            !user ||
            user.resetCode !== code ||
            user.resetCodeExpire < Date.now()
        ) {
            throw new Error("Invalid or expired code");
        }

        return createToken({ id: user._id, action: "reset" }, "15m");
    },

    async resetPassword(tempToken, newPassword, userId) {
        const hash = await bcrypt.hash(newPassword, 10);

        const user = await User.findById(userId);
        user.passwordHash = hash;
        user.resetCode = null;
        user.resetCodeExpire = null;

        await user.save();
        return true;
    },
};
