import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const TicketTypeSchema = new mongoose.Schema({
  eventId:       { type: ObjectId, ref: "Event", required: true },
  organizerId:   { type: ObjectId, ref: "Organizer" },

  name:          { type: String, required: true },
  description:   { type: String },

  sellFrom:      { type: Date, default: Date.now },
  sellUpto:      { type: Date },

  isPaid:        { type: Boolean, default: true },
  price:         { type: Number, default: 0 },

  totalCount:    { type: Number, default: 0 },
  minCount:      { type: Number, default: 1 },
  maxCount:      { type: Number, default: 10 },

  remainingCount:{ type: Number, default: 0 }
}, { timestamps: true });

TicketTypeSchema.index({ eventId: 1 });
TicketTypeSchema.index({ eventId: 1, name: 1 }, { unique: true, sparse: true });


export const TicketType = mongoose.model("TicketType", TicketTypeSchema);
