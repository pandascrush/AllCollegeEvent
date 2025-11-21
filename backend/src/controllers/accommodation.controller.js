import { AccommodationService } from "../services/accommodation.service.js";

export const AccommodationController = {
  async create(req, res, next) {
    try {
      const data = await AccommodationService.create(req.body);
      return res.status(201).json({ message: "Accommodation created", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const data = await AccommodationService.findAll();
      return res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const data = await AccommodationService.findById(req.params.id);
      if (!data)
        return res.status(404).json({ error: "Accommodation not found" });

      return res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = await AccommodationService.update(req.params.id, req.body);
      if (!data)
        return res.status(404).json({ error: "Accommodation not found" });

      return res.json({ message: "Accommodation updated", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const data = await AccommodationService.delete(req.params.id);
      if (!data)
        return res.status(404).json({ error: "Accommodation not found" });

      return res.json({ message: "Accommodation deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
      next(err);
    }
  },
};
