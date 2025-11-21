import { Certification } from "../models/certification.model.js";

export const CertificationService = {
  async create(data) {
    return await Certification.create(data);
  },

  async findAll() {
    return await Certification.find().sort({ createdAt: -1 });
  },

  async findById(id) {
    return await Certification.findById(id);
  },

  async update(id, data) {
    return await Certification.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id) {
    return await Certification.findByIdAndDelete(id);
  }
};
