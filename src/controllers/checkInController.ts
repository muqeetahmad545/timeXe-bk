import { Request, Response } from "express";
import AttendanceRecordSchema from "../models/checkIn";

export const checkIn = async (req: Request, res: Response): Promise<void> => {
  const checkInTime = new Date();
  const date = new Date().setUTCHours(0, 0, 0, 0); // Set the date to midnight in UTC timezone

  console.log("todays date", new Date(date));
  console.log("checkIn time", checkInTime);
  try {
    const userId = req.user?._id;
    console.log(userId);
    const existingCheckInRecord = await AttendanceRecordSchema.findOne({
      user: userId,
      date: date,
    });

    if (existingCheckInRecord) {
      res.status(201).json({
        success: false,
        checkedIn: false,
        message: "You have already checked in today",
      });
      return;
    }
    console.log("Existing Check-in Record:", existingCheckInRecord);
    const attendanceRecord = new AttendanceRecordSchema({
      user: userId,
      time_in: checkInTime,
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
