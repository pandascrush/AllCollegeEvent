import jwt from "jsonwebtoken";
import { AuthService } from "../services/auth.service.js";
import { ENV } from "../config/env.js";

export const AuthController = {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const data = await AuthService.register({ name, email, password, role });

      res.json(data);
    } catch (err) {
      res.status(err.status || 400).json({
        success: false,
        message: err.message,
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password);
      res.json(data);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },

  async forgot(req, res) {
    try {
      const email = req.body.email;
      const result = await AuthService.sendResetCode(email);

      res.json(result); // { message: "OTP sent successfully" }
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },

  async verify(req, res) {
    try {
      const { email, otp } = req.body;
      const tempToken = await AuthService.verifyCode(email, otp);
      res.json({ tempToken });
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
    }
  },

  async reset(req, res) {
    try {
      const { tempToken, password } = req.body;
      console.log(tempToken);

      const decoded = jwt.verify(tempToken, ENV.JWT_SECRET);

      if (decoded.purpose !== "reset_password") {
        return res.status(400).json({ message: "Invalid token" });
      }

      // call service
      await AuthService.resetPassword(decoded.id, password);

      res.json({ message: "Password changed successfully" });
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
    }
  },

  // GOOGLE LOGIN
  async googleLogin(req, res) {
    try {
      const { googleToken } = req.body;

      const response = await AuthService.googleLogin(googleToken);

      return res.json(response);
    } catch (err) {
      return res.status(err.status || 400).json({ message: err.message });
    }
  }
};
