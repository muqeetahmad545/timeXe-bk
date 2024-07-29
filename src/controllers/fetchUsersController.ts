import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { isValidObjectId } from "mongoose";
import bcrypt from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.query.userId as string;
  const updateData = req.body;

  try {
    if (!userId) {
      res
        .status(400)
        .json({ success: false, message: "Missing userId in request query" });
      return;
    }

    // Extract data from the request body
    const { signInDetail, userDetail, jobDetail } = updateData;

    // Check for required fields in userDetail
    if (userDetail) {
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
          error: "Email is required.",
        });
        return;
      }
      if (!userDetail.phone) {
        res.status(400).json({
          success: false,
          error: "Phone Number is required.",
        });
        return;
      }

      if (!userDetail.cnic) {
        res.status(400).json({
          success: false,
          error: "CNIC Number is required.",
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
          error: "Gender is required.",
        });
        return;
      }
      if (!userDetail.dob) {
        res.status(400).json({
          success: false,
          error: "Date of Birth is required.",
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

      // Check for unique email in userDetail
      const existingUserDetailUser = await User.findOne({
        "userDetail.email": userDetail.email,
        _id: { $ne: userId },
      });
      if (existingUserDetailUser) {
        res.status(400).json({
          success: false,
          error: "Email in userDetail is already in use.",
        });
        return;
      }
    }

    // Check for required fields in jobDetail
    if (jobDetail) {
      if (!jobDetail.jobType) {
        res.status(400).json({
          success: false,
          error: "Job Type is required.",
        });
        return;
      }
      if (!jobDetail.role) {
        res.status(400).json({
          success: false,
          error: "Role is required.",
        });
        return;
      }
      if (!jobDetail.joiningDate) {
        res.status(400).json({
          success: false,
          error: "Joining Date is required.",
        });
        return;
      }
    }

    // Check for required fields in signInDetail
    if (signInDetail) {
      if (!signInDetail.userName) {
        res.status(400).json({
          success: false,
          error: "User Name is required.",
        });
        return;
      }
      if (!signInDetail.signInEmail) {
        res.status(400).json({
          success: false,
          error: "Sign In Email is required.",
        });
        return;
      }

      // Check for unique email in signInDetail
      const existingSignInUser = await User.findOne({
        "signInDetail.signInEmail": signInDetail.signInEmail,
        _id: { $ne: userId },
      });
      if (existingSignInUser) {
        res.status(400).json({
          success: false,
          error: "Email in signInDetail is already in use.",
        });
        return;
      }

      // Check password and confirm password
      if (signInDetail.password || signInDetail.confirmPassword) {
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

        // Hash the new password
        signInDetail.password = await bcrypt.hash(signInDetail.password, 10);
      }
    }

    const updateObject: any = {};
    for (const key in userDetail) {
      updateObject[`userDetail.${key}`] = userDetail[key];
    }
    for (const key in jobDetail) {
      updateObject[`jobDetail.${key}`] = jobDetail[key];
    }
    for (const key in signInDetail) {
      updateObject[`signInDetail.${key}`] = signInDetail[key];
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateObject },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// export const updateUsers = async (req: Request, res: Response): Promise<void> => {
//   const userId = req.query.userId as string;
//   const updateData = req.body;

//   try {
//     if (!userId) {
//       res.status(400).json({ success: false, message: "Missing userId in request query" });
//       return;
//     }

//     const updateObject: any = {};
//     for (const key in updateData.userDetail) {
//       updateObject[`userDetail.${key}`] = updateData.userDetail[key];
//     }
//     for (const key in updateData.jobDetail) {
//       updateObject[`jobDetail.${key}`] = updateData.jobDetail[key];
//     }
//     for (const key in updateData.signInDetail) {
//       updateObject[`signInDetail.${key}`] = updateData.signInDetail[key];
//     }
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: updateObject },
//       { new: true }
//     );

//     if (!updatedUser) {
//       res.status(404).json({ success: false, message: "User not found" });
//       return;
//     }

//     res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

export const updateStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.query.userId as string;
  const updateData = req.body;

  try {
    if (!userId) {
      res
        .status(400)
        .json({ success: false, message: "Missing userId in request query" });
      return;
    }

    const updateObject: any = {};
    const { jobDetail } = updateData;
    for (const key in jobDetail) {
      updateObject[`jobDetail.${key}`] = jobDetail[key];
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateObject },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.query.userId;
  try {
    if (!userId || !isValidObjectId(userId)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid userId provided" });
      return;
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
