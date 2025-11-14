import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: { type: String, required: true },

        role: {
            type: String,
            enum: ["student", "faculty", "professional", "general"],
            required: true,
        },

        resetCode: { type: String, default: null },
        resetCodeExpire: { type: Date, default: null },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
