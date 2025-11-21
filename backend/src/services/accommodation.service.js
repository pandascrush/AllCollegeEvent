import { Accommodation } from "../models/accommadation.model.js";

export const AccommodationService = {
  async create(data) {
    return await Accommodation.create(data);
  },

  async findAll() {
    return await Accommodation.find().sort({ createdAt: -1 });
  },

  async findById(id) {
    return await Accommodation.findById(id);
  },

  async update(id, data) {
    return await Accommodation.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id) {
    return await Accommodation.findByIdAndDelete(id);
  },
};
