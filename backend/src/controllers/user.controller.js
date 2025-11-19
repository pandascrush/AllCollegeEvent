import { UserService } from "../services/user.service.js";

export const UserController = {
  async singleUser(req, res, next) {
    try {
      const { uid } = req.params;
      console.log(uid);
      
      if (!uid) {
        return res.status(400).json({ message: "ID fields is required" });
      }

      const data = await UserService.singleUser(uid);

      res.json(data);
    } catch (err) {
      res.status(err.status || 400).json({
        success: false,
        message: err.message,
      });
      next(err); 
    }
  }
};
