import { Vibe } from "../models/vibe.model.js";

export const VibeService = {

    async getVibe() {
        return await Vibe.find();
    },

    async createVibe(data) {
        const existing = await Vibe.findOne({ name: data.name });
        if (existing) throw new Error("Vibe name already exists");

        const vibe = new Vibe(data);
        return await vibe.save();
    },

    async updateVibe(id, data) {
        return await Vibe.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        );
    }
};
