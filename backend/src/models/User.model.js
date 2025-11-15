import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true, unique: true, lowercase: true },
  password:    { type: String, required: true },
  phone:       { type: String },
  city:        { type: String },
  state:       { type: String },
  country:     { type: String },
  profileImg:  { type: String },
  roleId:      { type: ObjectId, ref: "Role"},
  savedEvents: [{ type: ObjectId, ref: "Event" }],
  isDeleted:   { type: Boolean, default: false },
  passExpiry:  { type: Date }
}, { timestamps: true });
UserSchema.index({ email: 1 });
UserSchema.index({ name: 1 });

export const User = mongoose.model("User", UserSchema);
