import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { sendEmail } from "../utils/mailer.js";
import { createToken } from "../utils/token.js";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import {Role} from "../models/role.model.js";

dotenv.config();

export const AuthService = {
  async register({ name, email, password }) {
    if (!password) {
      throw new Error("Password is missing");
    }

    // check if email exists
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already registered");

    // default role = user
    const roleDoc = await Role.findOne({ name: "user" });
    if (!roleDoc) throw new Error("Default role 'user' not found in DB");

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create user with roleId
    const user = await User.create({
      name,
      email,
      password: hash,
      roleId: roleDoc._id, // assign user role
    });

    // sign token
    const token = createToken({
      id: user._id,
      email: user.email,
      role: "user", // optional
    });

    return { user, token };
  },

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = createToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  },

  async sendResetCode(email) {
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const html = `
    <div style="font-size:16px;">
      <p>Your OTP code is:</p>
      <h2 style="letter-spacing:3px;">${otp}</h2>
      <p>This code will expire in <strong>5 minutes</strong>.</p>
    </div>
  `;

    await sendEmail({
      to: email,
      subject: "Your Password Reset OTP",
      html,
    });

    return { message: "OTP sent successfully" };
  },

  async verifyCode(email, otp) {
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    if (!user.resetOtp || !user.resetOtpExpires) {
      const err = new Error("OTP not generated");
      err.status = 400;
      throw err;
    }

    if (user.resetOtpExpires < Date.now()) {
      const err = new Error("OTP expired");
      err.status = 400;
      throw err;
    }

    if (user.resetOtp !== parseInt(otp)) {
      const err = new Error("Invalid OTP");
      err.status = 400;
      throw err;
    }

    // Success → generate a temporary token
    const tempToken = createToken({
      id: user._id,
      purpose: "reset_password",
      time: Date.now(),
    });

    return tempToken;
  },

  async resetPassword(userId, newPassword) {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    // Save new password
    user.password = await bcrypt.hash(newPassword, 10);

    // Clear OTP
    user.resetOtp = null;
    user.resetOtpExpires = null;

    await user.save();

    return true;
  },

  // GOOGLE LOGIN SERVICE
  async googleLogin(googleToken) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    console.log(client);

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload; // get user details here

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        isGoogleUser: true,
        profileImg: picture,
        password: null,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return { user, token };
  },
};
