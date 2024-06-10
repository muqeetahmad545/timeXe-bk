import { Request, Response } from "express";
import AttendanceRecordSchema from "../models/checkIn";

export const checkIn = async (req: Request, res: Response): Promise<void> => {
  const checkInTime = new Date();
  const date = new Date().setUTCHours(0, 0, 0, 0); 
  try {
    const userId = req.user?._id;
    const firstName = req.user?.firstName;
    const lastName = req.user?.lastName;
    const userName = `${firstName} ${lastName}`;
    const existingCheckInRecord = await AttendanceRecordSchema.findOne({
      user: userId,
      date: date,
      userName: userName 
    });
    if (existingCheckInRecord) {
      res.status(201).json({
        success: false,
        checkedIn: false,
        message: "You have already checked in today",
      });
      return;
    }
    const attendanceRecord = new AttendanceRecordSchema({
      user: userId,
      time_in: checkInTime,
      userName: userName,
      date: date,
      status: "Present",
    });
    await attendanceRecord.save();

    res.status(201).json({
      success: true,
      checkedIn: true,
      message: "Check-in recorded successfully",
    });
  } catch (error) {
    console.error("Check-in failed:", error);
    res.status(500).json({
      success: false,
      checkedIn: false,
      message: "Internal server error",
    });
  }
};



// import { Request, Response } from "express";
// import AttendanceRecordSchema from "../models/checkIn";
// import { startOfDay } from 'date-fns';

// export const checkIn = async (req: Request, res: Response): Promise<void> => {
//   const checkInTime = new Date();
//   const date = startOfDay(checkInTime).getTime(); 
//   console.log("Today's date (UTC start of day):", new Date(date));
//   console.log("Check-in time:", checkInTime);

//   try {
//     const userId = req.user?._id;
//     console.log("User ID:", userId);

//     if (!userId) {
//       res.status(401).json({
//         success: false,
//         message: "Unauthorized: No user ID found",
//       });
//       return;
//     }

//     const existingCheckInRecord = await AttendanceRecordSchema.findOne({
//       user: userId,
//       date: date,
//     });

//     if (existingCheckInRecord) {
//       res.status(200).json({
//         success: false,
//         checkedIn: false,
//         message: "You have already checked in today",
//       });
//       return;
//     }

//     console.log("No existing check-in record found for today.");

//     const attendanceRecord = new AttendanceRecordSchema({
//       user: userId,
//       time_in: checkInTime,
//       date: date,
//       status: "Present",
//     });
//     await attendanceRecord.save();

//     res.status(201).json({
//       success: true,
//       checkedIn: true,
//       message: "Check-in recorded successfully",
//     });
//   } catch (error) {
//     console.error("Check-in failed:", error);
//     res.status(500).json({
//       success: false,
//       checkedIn: false,
//       message: "Internal server error",
//     });
//   }
// };
