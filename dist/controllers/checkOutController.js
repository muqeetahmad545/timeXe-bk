"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOut = void 0;
const checkIn_1 = __importDefault(require("../models/checkIn"));
const checkOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // const token = req.headers.authorization?.split(" ")[1];
    const checkOutTime = new Date();
    const date = new Date().setUTCHours(0, 0, 0, 0);
    // if (!token) {
    //   res.status(401).json({ success: false, message: "No token provided" });
    //   return; 
    // }
    try {
        // if (!process.env.JWT_SECRET) {
        //   throw new Error("JWT_SECRET environment variable is not defined");
        // }
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
        //   userId: string;
        // };
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const existingCheckInRecord = yield checkIn_1.default.findOne({
            user: userId,
            date: date,
        });
        if (!existingCheckInRecord) {
            res
                .status(400)
                .json({
                success: false,
                message: "No check-in record found for today",
            });
            return;
        }
        existingCheckInRecord.time_out = checkOutTime;
        existingCheckInRecord.working_hours =
            (checkOutTime.getTime() - existingCheckInRecord.time_in.getTime()) /
                (1000 * 60 * 60);
        yield existingCheckInRecord.save();
        res
            .status(200)
            .json({ success: true, message: "Check-out recorded successfully" });
    }
    catch (error) {
        console.error("Check-out failed:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.checkOut = checkOut;
