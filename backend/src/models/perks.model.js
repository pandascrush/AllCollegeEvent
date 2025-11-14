import mongoose from "mongoose";

const PerkSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String }
}, { timestamps: true });
PerkSchema.index({ name: 1 });

export const Perk = mongoose.model("Perk", PerkSchema);
