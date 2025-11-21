import { EventTypeCategoryService } from "../services/event_type_category.service.js";

export const EventTypeCategoryController = {
  async create(req, res, next) {
    try {
      const data = await EventTypeCategoryService.create(req.body);
      res.status(201).json({ message: "Category created", data });
      return next();
    } catch (err) {
      res.status(400).json({ error: err.message });
      return next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const data = await EventTypeCategoryService.findAll();
      res.json(data);
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },

  async getByEventType(req, res, next) {
    try {
      const { eventTypeId } = req.params;
      const data = await EventTypeCategoryService.findByEventType(eventTypeId);

      res.json(data);
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const data = await EventTypeCategoryService.findById(req.params.id);

      if (!data) {
        res.status(404).json({ error: "Category not found" });
        return next(new Error("Category not found"));
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
      const data = await EventTypeCategoryService.update(
        req.params.id,
        req.body
      );

      if (!data) {
        res.status(404).json({ error: "Category not found" });
        return next(new Error("Category not found"));
      }

      res.json({ message: "Category updated", data });
      return next();
    } catch (err) {
      res.status(400).json({ error: err.message });
      return next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const data = await EventTypeCategoryService.delete(req.params.id);

      if (!data) {
        res.status(404).json({ error: "Category not found" });
        return next(new Error("Category not found"));
      }

      res.json({ message: "Category deleted" });
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },
};
