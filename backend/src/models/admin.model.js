import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const AdminSchema = new mongoose.Schema({
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  roleId:    { type: ObjectId, ref: "Role", required: true },
  name:      { type: String },
  lastLogin: { type: Date }
}, { timestamps: true });
AdminSchema.index({ email: 1 });

export const Admin = mongoose.model("Admin", AdminSchema);
