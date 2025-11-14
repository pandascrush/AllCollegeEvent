import mongoose from "mongoose";

const AccommodationSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  details: { type: String }
}, { timestamps: true });
AccommodationSchema.index({ name: 1 });


export const Accommodation = mongoose.model("Accommodation", AccommodationSchema);
