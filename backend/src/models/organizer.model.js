import mongoose from "mongoose";

const OrganizerSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  domain:      { type: String, unique: true, sparse: true },
  email:       { type: String, required: true, unique: true, lowercase: true },
  password:    { type: String, required: true },
  city:        { type: String },
  state:       { type: String },
  country:     { type: String },
  profileImg:  { type: String },
  whatsapp:    { type: String },
  instagram:   { type: String },
  linkedin:    { type: String },
  eventCount:  { type: Number, default: 0 },
  isDeleted:   { type: Boolean, default: false },
  passExpiry:  { type: Date },
  roleId:      { type: String, ref: "Role" },

  paymentAccount: {
    provider: String,
    accountId: String
  }
}, { timestamps: true });
OrganizerSchema.index({ email: 1 });
OrganizerSchema.index({ domain: 1 });

export const Organizer = mongoose.model("Organizer", OrganizerSchema);
