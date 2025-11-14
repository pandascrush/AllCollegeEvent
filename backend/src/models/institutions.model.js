import mongoose from "mongoose";

const InstitutionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String },
  },
  { timestamps: true }
);
InstitutionSchema.index({ name: 1 });

export const Institution = mongoose.model("Institution", InstitutionSchema);
