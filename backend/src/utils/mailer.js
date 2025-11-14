import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

export const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: ENV.SMTP_HOST,
        port: ENV.SMTP_PORT,
        secure: false,
        auth: {
            user: ENV.SMTP_USER,
            pass: ENV.SMTP_PASS,
        },
    });

    if (!ENV.SMTP_HOST) {
        console.log("📧 MOCK EMAIL:", { to, subject });
        return;
    }

    await transporter.sendMail({
        from: ENV.FROM_EMAIL,
        to,
        subject,
        html,
    });
};
