import { EventType } from "../models/event_type.model.js";

export const EventTypeService = {
  async create(data) {
    return await EventType.create(data);
  },

  async findAll() {
    return await EventType.find().sort({ createdAt: -1 });
  },

  async findById(id) {
    return await EventType.findById(id);
  },

  async update(id, data) {
    return await EventType.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id) {
    return await EventType.findByIdAndDelete(id);
  },
};
