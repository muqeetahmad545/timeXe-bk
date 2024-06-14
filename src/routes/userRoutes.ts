import express, { Router } from "express";
import { authUser, createUser } from "../controllers/userController";
import { checkIn } from "../controllers/checkInController";
import { getUserDetails } from "../controllers/userDetails";
import { checkOut } from "../controllers/checkOutController";
import { deleteUsers, getAllUsers, updateUsers } from "../controllers/fetchUsersController";
import { authenticateUser } from "../controllers/middleware/AuthMiddelware";
import { getUserAttendance } from "../controllers/userAttendence";
<<<<<<< Updated upstream
import { deleteAttendance, getAllAttendanceRecords } from "../controllers/allUserAttendance";
import { createLeaveApplication, deleteLeaveApplication, getAllRecords, getLeaveApplication, updateLeaveApplication } from "../controllers/leaveApplicationController";
=======
import {
  deleteAttendance,
  getAllAttendanceRecords,
} from "../controllers/allUserAttendance";
import {
  createLeaveApplication,
  deleteLeaveApplication,
  getAllRecords,
  getLeaveApplication,
  updateLeaveApplication,
} from "../controllers/leaveApplicationController";
import { uploadRouter } from "./uploadRouter";
>>>>>>> Stashed changes

const router: Router = express.Router();

router.post("/login", authUser);

// router.use(authenticateUser);
router.post("/users", createUser);


router.post("/attendance/check-in", checkIn);
router.post("/attendance/check-out", checkOut);

router.get("/userDetails", getUserDetails);

router.get("/fetchusers", getAllUsers);
router.delete("/delete", deleteUsers);
router.patch("/update", updateUsers);

// Attandace
router.get("/userattendance", getUserAttendance);
router.get("/allusersattendance", getAllAttendanceRecords);
router.delete("/attendance/delete", deleteAttendance);

//LeaveApplication
router.get('/leaveapplication',getAllRecords)
router.get('/leaveapplication/user',getLeaveApplication)
router.post("/leaveapplication", createLeaveApplication);
router.patch("/leaveapplication", updateLeaveApplication);
router.delete("/leaveapplication", deleteLeaveApplication);


//Upload

router.get

export default router;
