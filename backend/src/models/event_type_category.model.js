import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const EventTypeCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, lowercase: true },

    // event type reference
    eventTypeId: {
      type: ObjectId,
      ref: "EventType",
      required: true
    }
  },
  { timestamps: true }
);

EventTypeCategorySchema.index({ name: 1, eventTypeId: 1 }, { unique: true });

export const EventTypeCategory = mongoose.model(
  "EventTypeCategory",
  EventTypeCategorySchema
);
