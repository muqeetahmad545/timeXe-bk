import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// Update the path as per your project structure

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { signInDetail, userDetail, jobDetail } = req.body;

    // Check for required fields
    if (!userDetail.fullName) {
      res.status(400).json({
        success: false,
        error: "Full name is required.",
      });
      return;
    }
    if (!userDetail.email) {
      res.status(400).json({
        success: false,
        error: "Email  is required",
      });
      return;
    }
    if (!userDetail.phone) {
      res.status(400).json({
        success: false,
        error: "phone Number  is required",
      });
      return;
    }
    if (!userDetail.cnic) {
      res.status(400).json({
        success: false,
        error: "CNIC Number  is required",
      });
      return;
    }
    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
    if (!cnicRegex.test(userDetail.cnic)) {
      res.status(400).json({
        success: false,
        error:
          "Invalid CNIC Number format. Please use the format: 12345-1234567-1",
      });
      return;
    }
    if (!userDetail.gender) {
      res.status(400).json({
        success: false,
        error: "Gender is required",
      });
      return;
    }
    if (!userDetail.dob) {
      res.status(400).json({
        success: false,
        error: "Date of Birth is required",
      });
      return;
    }
    if (!jobDetail.jobType) {
      res.status(400).json({
        success: false,
        error: "Job jobType is required",
      });
      return;
    }
    if (!jobDetail.role) {
      res.status(400).json({
        success: false,
        error: "Role is required",
      });
      return;
    }
    if (!jobDetail.joiningDate) {
      res.status(400).json({
        success: false,
        error: "joiningDate is required",
      });
      return;
    }
    if (!signInDetail.userName) {
      res.status(400).json({
        success: false,
        error: "User Name is required",
      });
      return;
    }
    if (!signInDetail.signInEmail) {
      res.status(400).json({
        success: false,
        error: "signInEmail is required",
      });
      return;
    }
    if (!signInDetail.password) {
      res.status(400).json({
        success: false,
        error: "password is required",
      });
      return;
    }
    if (!signInDetail.confirmPassword) {
      res.status(400).json({
        success: false,
        error: "confirmPassword is required",
      });
      return;
    }

    const existingSignInUser = await User.findOne({
      "signInDetail.signInEmail": signInDetail.signInEmail,
    });
    if (existingSignInUser) {
      res.status(400).json({
        success: false,
        error: "Email in signInDetail is already in use.",
      });
      return;
    }

    const existingUserDetailUser = await User.findOne({
      "userDetail.email": userDetail.email,
    });
    if (existingUserDetailUser) {
      res.status(400).json({
        success: false,
        error: "Email in userDetail is already in use.",
      });
      return;
    }
    // Validate email format
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(userDetail.email)) {
    //   res.status(400).json({
    //     success: false,
    //     error: "Invalid email format.",
    //   });
    //   return;
    // }

    // Check password and confirm password
    if (
      !signInDetail.password ||
      !signInDetail.confirmPassword ||
      signInDetail.password !== signInDetail.confirmPassword
    ) {
      res.status(400).json({
        success: false,
        error: "Passwords do not match or are missing.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(signInDetail.password, 10);

    const latestUser: IUser | null = await User.findOne(
      {},
      {},
      { sort: { "jobDetail.employeeId": -1 } }
    );

    let employeeId = "00001";
    if (latestUser) {
      const latestEmployeeId = parseInt(
        latestUser.jobDetail.employeeId.toString(),
        10
      );
      employeeId = (latestEmployeeId + 1).toString().padStart(5, "0");
    }

    const user = new User({
      userDetail,
      jobDetail: {
        ...jobDetail,
        employeeId,
      },
      signInDetail: {
        userName: signInDetail.userName,
        signInEmail: signInDetail.signInEmail,
        password: hashedPassword,
      },
    });

    await user.save();

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// export const createUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { signInDetail, ...userData } = req.body;
//     if (
//       !signInDetail.password ||
//       !signInDetail.confirmPassword ||
//       signInDetail.password !== signInDetail.confirmPassword
//     ) {
//       res.status(400).json({
//         success: false,
//         error: "Passwords do not match or are missing.",
//       });
//       return;
//     }
//     const hashedPassword = await bcrypt.hash(signInDetail.password, 10);
//     const hashedConfirmPassword = await bcrypt.hash(
//       signInDetail.confirmPassword,
//       10
//     );
//     const latestUser: IUser | null = await User.findOne(
//       {},
//       {},
//       { sort: { "jobDetail.employeeId": -1 } }
//     );
//     let employeeId = "00001";
//     if (latestUser) {
//       const latestEmployeeId = parseInt(
//         latestUser.jobDetail.employeeId.toString(),
//         10
//       );
//       employeeId = (latestEmployeeId + 1).toString().padStart(5, "0");
//     }
//     const user = await User.create({
//       ...userData,
//       jobDetail: {
//         ...userData.jobDetail,
//         employeeId,
//       },
//       signInDetail: {
//         userName: signInDetail.userName,
//         signInEmail: signInDetail.signInEmail,
//         password: hashedPassword,
//         // confirmPassword: hashedConfirmPassword,
//       },
//     });

//     res.status(201).json({ success: true, data: user });
//   } catch (err: any) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

export const authUser = async (req: Request, res: Response) => {
  const { signInEmail, password } = req.body;

  try {
    const user = await User.findOne({
      "signInDetail.signInEmail": signInEmail,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.signInDetail.password
    );
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
      { userId: user._id, userName: user.signInDetail.userName },
      secret,
      { expiresIn: "30d" }
    );
    res.json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
