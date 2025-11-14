import mongoose from "mongoose";

const VibeSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  icon:     { type: String },
  color:    { type: String }
}, { timestamps: true });
VibeSchema.index({ name: 1 }, { unique: true });

export const Vibe = mongoose.model("Vibe", VibeSchema);
