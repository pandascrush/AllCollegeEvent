import { RoleService } from "../services/role.service.js";
import { ENV } from "../config/env.js";

export const RoleController = {

    async getRole(req,res,next){
        try{
            const data = await RoleService.getRole();
            res.json(data);
        }
        catch(e){
            res.status(400).json({ message: err.message });
            res.next(e)
        }
    }
};
