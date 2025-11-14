import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: 'mongodb://localhost:27017/allcollegeevent',
    JWT_SECRET: 'allcollegeevent',
    SMTP_HOST: 'prabavathi3898@gmail.com',
    SMTP_USER: 'prabavathi3898@gmail.com',
    SMTP_PASS: 'prabavathi3898@gmail.com',
    SMTP_PORT:  587,
    FROM_EMAIL: process.env.FROM_EMAIL,
    CLIENT_URL:  "http://localhost:3000",
};
