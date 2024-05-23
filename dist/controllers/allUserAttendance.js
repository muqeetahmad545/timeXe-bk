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
exports.getAllAttendanceRecords = void 0;
const checkIn_1 = __importDefault(require("../models/checkIn"));
const getAllAttendanceRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all attendance records from the database
        const allAttendanceRecords = yield checkIn_1.default.find();
        res.status(200).json({ success: true, data: allAttendanceRecords });
    }
    catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.getAllAttendanceRecords = getAllAttendanceRecords;
