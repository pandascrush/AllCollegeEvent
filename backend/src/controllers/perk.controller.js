import perkService from "../services/perk.service.js";

class PerkController {
  async create(req, res, next) {
    try {
      const perk = await perkService.createPerk(req.body);
      return res.json({ success: true, perk });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
      next(err);
    }
  }

  async getAll(req, res) {
    try {
      const perks = await perkService.getAllPerks();
      return res.json({ success: true, perks });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const perk = await perkService.getPerkById(req.params.id);
      if (!perk)
        return res
          .status(404)
          .json({ success: false, message: "Perk not found" });

      return res.json({ success: true, perk });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const perk = await perkService.updatePerk(req.params.id, req.body);
      if (!perk)
        return res
          .status(404)
          .json({ success: false, message: "Perk not found" });

      return res.json({ success: true, perk });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await perkService.deletePerk(req.params.id);
      if (!deleted)
        return res
          .status(404)
          .json({ success: false, message: "Perk not found" });

      return res.json({ success: true, message: "Perk deleted" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
      next(err);
    }
  }
}

export default new PerkController();
