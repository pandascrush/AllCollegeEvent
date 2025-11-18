import { User } from "../models/User.model.js";
import { ENV } from "../config/env.js";

export const UserService = {

    async singleUser(uid){
        const data = await User.findById(uid);
        return data;
    }
};
