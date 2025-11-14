import mongoose from "mongoose";

const EventTypeCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, lowercase: true },
  },
  { timestamps: true }
);
EventTypeCategorySchema.index({ name: 1 }, { unique: true });

export const EventTypeCategory = mongoose.model(
  "EventTypeCategory",
  EventTypeCategorySchema
);
