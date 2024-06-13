import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { password, ...userData } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ ...userData, password: hashedPassword });
    res.status(201).json({ success: true, data: user });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const secret =
      process.env.JWT_SECRET ||
      "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506";
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }
    const token = jwt.sign(
      { userId: user._id, fullName: user.fullName },
      secret,
      { expiresIn: "30d" }
    );
    res.json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
