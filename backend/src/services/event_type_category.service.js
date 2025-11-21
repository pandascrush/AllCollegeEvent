import { EventTypeCategory } from "../models/event_type_category.model.js";

export const EventTypeCategoryService = {
  async create(data) {
    return await EventTypeCategory.create(data);
  },

  async findAll() {
    return await EventTypeCategory.find().populate("eventTypeId");
  },

  async findByEventType(eventTypeId) {
    return await EventTypeCategory.find({ eventTypeId }).populate(
      "eventTypeId"
    );
  },

  async findById(id) {
    return await EventTypeCategory.findById(id).populate("eventTypeId");
  },

  async update(id, data) {
    return await EventTypeCategory.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id) {
    return await EventTypeCategory.findByIdAndDelete(id);
  },
};
