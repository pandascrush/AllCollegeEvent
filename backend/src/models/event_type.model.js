import mongoose from "mongoose";

const EventTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, lowercase: true, unique: true },
  },
  { timestamps: true }
);

EventTypeSchema.index({ name: 1 });

export const EventType = mongoose.model("EventType", EventTypeSchema);
