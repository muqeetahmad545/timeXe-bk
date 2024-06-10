import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    // if (!process.env.JWT_SECRET) {
    //   throw new Error("JWT_SECRET environment variable is not defined");
    // }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506"
    ) as {
      userId: string;
      firstName: string;
      lastName: string;
    };
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.sendStatus(401);
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.sendStatus(401);
  }
};
