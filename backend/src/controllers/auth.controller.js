import jwt from "jsonwebtoken";
import { AuthService } from "../services/auth.service.js";
import { OAuth2Client } from "google-auth-library";

export const AuthController = {
  async register(req, res, next) {
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
      next(err); // <-- FIXED
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password);

      res.cookie("token", data.token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });

      res.json(data);
    } catch (err) {
      res.status(401).json({ message: err.message });
      next(err);
    }
  },

  async forgot(req, res, next) {
    try {
      const email = req.body.email;
      const result = await AuthService.sendResetCode(email);

      res.json(result);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
      next(err);
    }
  },

  async verify(req, res, next) {
    try {
      const { email, otp } = req.body;
      const tempToken = await AuthService.verifyCode(email, otp);
      res.json({ tempToken });
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
      next(err);
    }
  },

  async reset(req, res, next) {
    try {
      const { tempToken, password } = req.body;

      const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);

      if (decoded.purpose !== "reset_password") {
        return res.status(400).json({ message: "Invalid token" });
      }

      await AuthService.resetPassword(decoded.id, password);

      res.json({ message: "Password changed successfully" });
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
      next(err);
    }
  },

  async googleLoginController(req, res, next) {
    try {
      const { googleToken } = req.body;

      if (!googleToken) {
        return res
          .status(400)
          .json({ success: false, message: "Google token missing" });
      }

      const { user, token } = await AuthService.googleLogin(googleToken);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });

      return res.status(200).json({
        success: true,
        user,
        token,
      });
    } catch (err) {
      console.error("Google Login Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Google login failed",
      });
      next(err);
    }
  },

  async logout(req, res, next) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });

      return res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
      next(err);
    }
  },
};
