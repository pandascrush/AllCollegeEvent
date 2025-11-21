import { InstitutionService } from "../services/institution.service.js";

export const InstitutionController = {
  async create(req, res, next) {
    try {
      const data = await InstitutionService.create(req.body);
      res.status(201).json({ message: "Institution created", data });
      return next();
    } catch (err) {
      res.status(400).json({ error: err.message });
      return next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const data = await InstitutionService.findAll();
      res.json(data);
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const data = await InstitutionService.findById(req.params.id);

      if (!data) {
        res.status(404).json({ error: "Institution not found" });
        return next(new Error("Institution not found"));
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
      const data = await InstitutionService.update(req.params.id, req.body);

      if (!data) {
        res.status(404).json({ error: "Institution not found" });
        return next(new Error("Institution not found"));
      }

      res.json({ message: "Institution updated", data });
      return next();
    } catch (err) {
      res.status(400).json({ error: err.message });
      return next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const data = await InstitutionService.delete(req.params.id);

      if (!data) {
        res.status(404).json({ error: "Institution not found" });
        return next(new Error("Institution not found"));
      }

      res.json({ message: "Institution deleted" });
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },
};
