import { Institution } from "../models/institutions.model.js";

export const InstitutionService = {
  async create(data) {
    return await Institution.create(data);
  },

  async findAll() {
    return await Institution.find().sort({ createdAt: -1 });
  },

  async findById(id) {
    return await Institution.findById(id);
  },

  async update(id, data) {
    return await Institution.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id) {
    return await Institution.findByIdAndDelete(id);
  },
};
