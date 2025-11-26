import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { Organizer } from "../models/organizer.model.js";
import { sendEmail } from "../utils/mailer.js";
import { createToken } from "../utils/token.js";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { Role } from "../models/role.model.js";

dotenv.config();

export const AuthService = {
  async register({ name, email, password, role, domain }) {
    if (!name || !email || !password || !role) {
      throw new Error("All fields are required");
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // 1️ USER REGISTRATION
    if (role === "user") {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email already registered");

      const user = await User.create({
        name,
        email,
        password: hashedPass,
        roleId: role,
      });

      return {
        success: true,
        message: "User registered successfully",
        user,
      };
    }

    // 2️ ORGANIZER REGISTRATION
    if (role === "organizer") {
      const existingOrganizer = await Organizer.findOne({ email });
      if (existingOrganizer)
        throw new Error("Organizer already registered with this domain");

      if (email.includes("@")) {
        throw new Error("Invalid domain. Do not include '@' symbol");
      }

      if (!email.includes(".")) {
        throw new Error("Invalid domain format");
      }

      const isEducationalDomain =
        email.endsWith(".edu") ||
        email.endsWith(".ac.in") ||
        email.endsWith(".edu.in");

      if (!isEducationalDomain) {
        throw new Error(
          `Only educational institute domains are allowed. Domain '${domain}' is not allowed.`
        );
      }

      const organizer = await Organizer.create({
        name,
        email: email,
        domain: email,
        password: hashedPass,
        roleId: role,
      });

      return {
        success: true,
        message: "Organizer registered successfully",
        organizer,
      };
    }

    throw new Error("Invalid role provided");
  },

  async login(identifier, password) {
    let account = null;
    if (identifier.includes("@")) {
      // First check in User collection
      account = await User.findOne({ email: identifier });

      if (!account) {
        account = await Organizer.findOne({ email: identifier });
      }
    } else {
      account = await Organizer.findOne({ domain: identifier });
    }

    if (!account) {
      throw new Error("Invalid credentials");
    }

    const match = await bcrypt.compare(password, account.password);
    if (!match) throw new Error("Invalid credentials");

    const role = account instanceof User ? "user" : "organizer";

    const token = createToken({
      id: account._id,
      role,
    });

    return {
      success: true,
      message: "Login successful",
      role,
      token,
      user: account,
    };
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

  async googleLogin(googleToken) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    // 1️⃣ Verify token
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    // 2️⃣ Fetch default USER role
    const roleDoc = await Role.findOne({ name: "user" });
    if (!roleDoc) {
      throw new Error("Default role 'user' not found in database");
    }

    // 3️⃣ Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        isGoogleUser: true,
        profileImg: picture,
        password: null,
        roleId: roleDoc._id, // Save role ID
      });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: roleDoc.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { user, token };
  }
};
