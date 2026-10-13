import userModel from "../models/userModel.js";
import {
  comparePassword,
  hashPassword,
} from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// REGISTER
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name?.trim() || !email?.trim() || !password || !phone?.trim() || !address?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await userModel.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone.trim(),
      address: address.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please login.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await comparePassword(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from environment variables");

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error",
      });
    }

    const token = JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

// TEST PROTECTED ROUTE
export const testController = (req, res) => {
  return res.status(200).send("Protected Routes");
};