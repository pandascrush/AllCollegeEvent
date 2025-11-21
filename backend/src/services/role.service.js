import { Role } from "../models/role.model.js";

export const RoleService = {

    async getRole(){
        const data = await Role.find();
        return data;
    }
};
