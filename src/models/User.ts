import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  cnic: string;
  designation: string;
  salary: number;
  dob: Date;
  joiningDate: Date;
  role: string;
  userLeaveApplication: [{ type: Schema.Types.ObjectId, ref: "leaveApplication", required: true }],
}

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, minlength: 8 },
  confirmPassword: { type: String, required: true, minlength: 8 },
  cnic: { type: String, required: true, unique: true, trim: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true },
  dob: { type: Date, required: true },
  joiningDate: { type: Date, required: true },
  role: { type: String, required: true },
  userLeaveApplication: [{ type: Schema.Types.ObjectId, ref: "leaveApplication", required: true }],
});

export default mongoose.model<IUser>("User", userSchema);
