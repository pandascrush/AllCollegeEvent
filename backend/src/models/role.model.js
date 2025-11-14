import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name:        { type: String, required: true, unique: true },
  permissions: [{ type: String }]
}, { timestamps: true });
RoleSchema.index({ name: 1 });

export const Role = mongoose.model("Role", RoleSchema);
