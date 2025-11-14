import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String },
    image: { type: String },
    eventTypeId: { type: ObjectId, ref: "EventTypeCategory" },
  },
  { timestamps: true }
);
CategorySchema.index({ name: 1 }, { unique: true });

export const Category = mongoose.model("Category", CategorySchema);
