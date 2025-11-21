import { Perk } from '../models/perks.model.js';

class PerkService {
  
  async createPerk(data) {
    return await Perk.create(data);
  }

  async getAllPerks() {
    return await Perk.find().sort({ createdAt: -1 });
  }

  async getPerkById(id) {
    return await Perk.findById(id);
  }

  async updatePerk(id, data) {
    return await Perk.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePerk(id) {
    return await Perk.findByIdAndDelete(id);
  }
}

export default new PerkService();
