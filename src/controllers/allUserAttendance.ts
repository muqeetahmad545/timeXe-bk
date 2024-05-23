import { Request, Response } from "express";
import AttendanceRecordSchema, { IAttendanceRecord } from "../models/checkIn";

export const getAllAttendanceRecords = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all attendance records from the database
    const allAttendanceRecords: IAttendanceRecord[] = await AttendanceRecordSchema.find();

    res.status(200).json({ success: true, data: allAttendanceRecords });
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
