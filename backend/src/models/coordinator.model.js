import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const CoordinatorSchema = new mongoose.Schema({
  eventId:     { type: ObjectId, ref: "Event", required: true },
  organizerId: { type: ObjectId, ref: "Organizer", required: true },
  name:        { type: String, required: true },
  phone:       { type: String },
  email:       { type: String }
}, { timestamps: true });
CoordinatorSchema.index({ eventId: 1 });

export const Coordinator = mongoose.model("Coordinator", CoordinatorSchema);
