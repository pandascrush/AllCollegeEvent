import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true, unique: true, lowercase: true },
  password:    { type: String },
  phone:       { type: String },
  city:        { type: String },
  state:       { type: String },
  country:     { type: String },
  profileImg:  { type: String },
  roleId:      { type: ObjectId, ref: "Role" },
  savedEvents: [{ type: ObjectId, ref: "Event" }],
  isDeleted:   { type: Boolean, default: false },
  passExpiry:  { type: Date },

    // 👉 Add these
  googleId: { type: String, default: null },
  isGoogleUser: { type: Boolean, default: false },

  resetOtp: { type: Number, default: null },
  resetOtpExpires: { type: Date, default: null }
}, { timestamps: true });
UserSchema.index({ email: 1 });
UserSchema.index({ name: 1 });
UserSchema.index({ googleId: 1 });

export const User = mongoose.model("User", UserSchema);
