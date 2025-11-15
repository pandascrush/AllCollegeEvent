import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

export const sendEmail = async ({ to, subject, html }) => {
    console.log("======email------", to, subject, html)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "prabavathi3898@gmail.com",
            pass: "lhts duio zfjl uwpa",
        },
    });

    console.log("email:",transporter)

    await transporter.sendMail({
        from: ENV.FROM_EMAIL,
        to,
        subject,
        html,
    });
};
