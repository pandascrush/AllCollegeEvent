import { VibeService } from "../services/vibe.service.js";
import { logger } from "../config/logger.js";

export const VibeController = {
  
  async getVibe(req, res, next) {
    try {
      const data = await VibeService.getVibe();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async createVibe(req, res, next) {
    try {
      const { name, icon, color } = req.body;

      if (!name) {
        const error = new Error("Name is required");
        error.status = 400;
        throw error;
      }

      // Convert SVG to Base64
      let base64Icon = "";
      if (icon) {
        const cleanedSvg = icon.replace(/\n/g, "").trim();
        base64Icon = `data:image/svg+xml;base64,${Buffer.from(cleanedSvg).toString("base64")}`;
      }

      const newVibe = await VibeService.createVibe({
        name,
        icon: base64Icon,
        color,
      });

      res.status(201).json({
        message: "Vibe created successfully",
        data: newVibe,
      });
    } catch (err) {
      next(err);
    }
  },

  async updateVibe(req, res, next) {
    try {
      const { id } = req.params;
      const { name, icon, color } = req.body;

      let base64Icon = undefined;

      // Only convert if icon provided
      if (icon) {
        const cleanedSvg = icon.replace(/\n/g, "").trim();
        base64Icon = `data:image/svg+xml;base64,${Buffer.from(cleanedSvg).toString("base64")}`;
      }

      const updatedVibe = await VibeService.updateVibe(id, {
        name,
        icon: base64Icon,
        color,
      });

      if (!updatedVibe) {
        const error = new Error("Vibe not found");
        error.status = 404;
        throw error;
      }

      res.json({
        message: "Vibe updated successfully",
        data: updatedVibe,
      });
    } catch (err) {
      next(err);
    }
  },

};
