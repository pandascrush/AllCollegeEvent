import jwt from "jsonwebtoken";
import { AuthService } from "../services/auth.service.js";
import { ENV } from "../config/env.js";

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
      res.json(data);
    } catch (err) {
      res.status(401).json({ message: err.message });
      next(err); // <-- ADDED
    }
  },

  async forgot(req, res, next) {
    try {
      const email = req.body.email;
      const result = await AuthService.sendResetCode(email);

      res.json(result);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
      next(err); // <-- ADDED
    }
  },

  async verify(req, res, next) {
    try {
      const { email, otp } = req.body;
      const tempToken = await AuthService.verifyCode(email, otp);
      res.json({ tempToken });
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
      next(err); // <-- ADDED
    }
  },

  async reset(req, res, next) {
    try {
      const { tempToken, password } = req.body;

      const decoded = jwt.verify(tempToken, ENV.JWT_SECRET);

      if (decoded.purpose !== "reset_password") {
        return res.status(400).json({ message: "Invalid token" });
      }

      await AuthService.resetPassword(decoded.id, password);

      res.json({ message: "Password changed successfully" });
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
      next(err); // <-- ADDED
    }
  },

  async googleLogin(googleToken) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    // 1️⃣ Fetch default user role
    const roleDoc = await Role.findOne({ name: "user" });
    if (!roleDoc) {
      throw new Error("Default role 'user' not found in database");
    }

    // 2️⃣ Check if user exists
    let user = await User.findOne({ email });

    // 3️⃣ Create user if not exists
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        isGoogleUser: true,
        profileImg: picture,
        password: null,
        roleId: roleDoc._id, // 👈 Assign USER role
      });
    }

    // 4️⃣ Create auth token
    const token = jwt.sign(
      { id: user._id, role: roleDoc.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { user, token };
  },
};
