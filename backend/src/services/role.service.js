import { Role } from "../models/role.model.js";
import { ENV } from "../config/env.js";

export const RoleService = {

    async getRole(){
        const data = await Role.find();
        return data;
    }
};
