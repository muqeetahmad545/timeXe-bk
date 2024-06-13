import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  fatherName: string;
  email: string;
  address: string;
  phone: number;
  companyName: string;
  department: string;
  jobPosition: string;
  manager: string;
  profileImage: string;
  password: string;
  confirmPassword: string;
  cnic: string;
  designation: string;
  dob: Date;
  joiningDate: Date;
  role: string;
  // userLeaveApplication: [{ type: Schema.Types.ObjectId, ref: "leaveApplication", required: true }],
}

const userSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    fatherName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: { type: String },
    phone: { type: Number, required: true },
    companyName: { type: String },
    department: { type: String },
    jobPosition: { type: String },
    manager: { type: String },
    profileImage: { type: String },
    password: { type: String, required: true, minlength: 8 },
    confirmPassword: { type: String, required: true, minlength: 8 },
    cnic: { type: String, required: true, unique: true, trim: true },
    designation: { type: String, required: true },
    dob: { type: Date, required: true },
    joiningDate: { type: Date, required: true },
    role: { type: String, required: true },
    // userLeaveApplication: [{ type: Schema.Types.ObjectId, ref: "leaveApplication", required: true }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
