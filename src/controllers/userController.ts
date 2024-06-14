import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    const { password, ...userData } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
=======
=======
>>>>>>> Stashed changes
    const {signInDetail, userData } = req.body;

    const body = req.body

    if (!signInDetail.password || !signInDetail.confirmPassword || signInDetail.password !== signInDetail.confirmPassword) {
      res.status(400).json({ success: false, error: "Passwords do not match or are missing." });
      return;
    }
    const hashedPassword = await bcrypt.hash(signInDetail.password, 10);

    body.signInDetail.password = hashedPassword
<<<<<<< Updated upstream
=======


    console.log("body" , body);
    

    const user = await User.create(body);
>>>>>>> Stashed changes


    console.log("body" , body);
    

    const user = await User.create(body);
>>>>>>> Stashed changes

    const user = await User.create({ ...userData, password: hashedPassword });
    res.status(201).json({ success: true, data: user });
  } catch (err: any) {

    console.log(err);
    

    res.status(400).json({ success: false, error: err.message });
  }
};

export const authUser = async (req: Request, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
=======
=======
>>>>>>> Stashed changes
  const { signInEmail, password } = req.body; 

  try {
    const user = await User.findOne({ "signInDetail.signInEmail": signInEmail });
>>>>>>> Stashed changes
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
=======
=======
>>>>>>> Stashed changes
    const isPasswordValid = await bcrypt.compare(password, user.signInDetail.password);
>>>>>>> Stashed changes
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
    // Generate JWT token
    const secret =
      process.env.JWT_SECRET ||
      "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506";
=======
    const secret = process.env.JWT_SECRET || "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506";
>>>>>>> Stashed changes
=======
    const secret = process.env.JWT_SECRET || "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506";
>>>>>>> Stashed changes
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
