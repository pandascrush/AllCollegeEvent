import { CertificationService } from "../services/certification.service.js";

export const CertificationController = {
  async create(req, res, next) {
    try {
      const data = await CertificationService.create(req.body);
      return res.status(201).json({ message: "Certification created", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
      return next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const data = await CertificationService.findAll();
      return res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const data = await CertificationService.findById(req.params.id);
      if (!data) {
        res.status(404).json({ error: "Certification not found" });
        return next(new Error("Certification not found"));
      }
      return res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = await CertificationService.update(req.params.id, req.body);
      if (!data) {
        res.status(404).json({ error: "Certification not found" });
        return next(new Error("Certification not found"));
      }
      return res.json({ message: "Certification updated", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
      return next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const data = await CertificationService.delete(req.params.id);
      if (!data) {
        res.status(404).json({ error: "Certification not found" });
        return next(new Error("Certification not found"));
      }
      return res.json({ message: "Certification deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
      return next(err);
    }
  },
};
