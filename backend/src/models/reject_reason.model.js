import mongoose from "mongoose";

const RejectReasonSchema = new mongoose.Schema({
  reason: { type: String, required: true },
  code:   { type: String }
}, { timestamps: true });
RejectReasonSchema.index({ reason: 1 });

export const RejectReason = mongoose.model("RejectReason", RejectReasonSchema);
