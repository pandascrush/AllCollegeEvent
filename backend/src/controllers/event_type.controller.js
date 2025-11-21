import { EventTypeService } from "../services/event_type.service.js";

export const EventTypeController = {
  async create(req, res, next) {
    try {
      const data = await EventTypeService.create(req.body);
      res.status(201).json({ message: "Event Type created", data });
      return next();
    } catch (err) {
      res.status(400).json({ error: err.message });
      return next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const data = await EventTypeService.findAll();
      res.json(data);
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const data = await EventTypeService.findById(req.params.id);
      if (!data) {
        res.status(404).json({ error: "Event Type not found" });
        return next(new Error("Event Type not found"));
      }
      res.json(data);
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = await EventTypeService.update(req.params.id, req.body);
      if (!data) {
        res.status(404).json({ error: "Event Type not found" });
        return next(new Error("Event Type not found"));
      }
      res.json({ message: "Event Type updated", data });
      return next();
    } catch (err) {
      res.status(400).json({ error: err.message });
      return next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const data = await EventTypeService.delete(req.params.id);
      if (!data) {
        res.status(404).json({ error: "Event Type not found" });
        return next(new Error("Event Type not found"));
      }
      res.json({ message: "Event Type deleted" });
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },
};
