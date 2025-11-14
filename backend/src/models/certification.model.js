import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    details: { type: String },
  },
  { timestamps: true }
);
CertificationSchema.index({ name: 1 });

export const Certification = mongoose.model(
  "Certification",
  CertificationSchema
);
