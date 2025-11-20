import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    PORT: 5000 || 5000,
    MONGO_URI: 'mongodb://localhost:27017/allcollegeevent',
    JWT_SECRET: 'allcollegeevent',
    SMTP_HOST: 'prabavathi3898@gmail.com',
    SMTP_USER: 'prabavathi3898@gmail.com',
    SMTP_PASS: 'lhts duio zfjl uwpa',
    SMTP_PORT:  587,
    FROM_EMAIL: process.env.FROM_EMAIL,
    CLIENT_URL:  "http://localhost:3000",
};
