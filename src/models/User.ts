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
  // userLeaveApplication: [{ type: Schema.Types.ObjectId, ref: "leaveApplication", required: true }],  
}

const userSchema: Schema = new Schema(
  {
    userDetail: {
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
      dob: { type: Date, required: true },
      cnic: { type: String, required: true, unique: true, trim: true },
      profileImage: { type: String },
      gender: { type: String },
    },
    jobDetail: {
      employeeId: { type: Number, unique: true },
      companyName: { type: String },
      department: { type: String },
      jobPosition: { type: String },
      manager: { type: String },
      designation: { type: String },
      joiningDate: { type: Date },
      dropZone: { type: String },
      role: { type: String },
      salary: { type: String },
      Skills: { type: String },
      status: {
        type: String,
        enum: ["Active", "InActive"],
        default: "Active",
      },
    },
    signInDetail: {
      userName: { type: String, required: true },
      signInEmail: { type: String, required: true },
      password: { type: String, required: true, minlength: 8 },
      confirmPassword: { type: String, required: true, minlength: 8 },
    },
  },
  { timestamps: true }
);

// Pre-save middleware to auto-increment userID
// userSchema.pre<IUser>("save", async function (next) {
//   if (!this.isNew) {
//     next();
//     return;
//   }

//   try {
//     const UserModel = this.constructor as Model<IUser>;
//     const lastUser = await UserModel.findOne(
//       {},
//       {},
//       { sort: { "jobDetail.employeeId": -1 } }
//     );
//     if (!lastUser) {
//       this.jobDetail.employeeId = 1;
//     } else {
//       this.jobDetail.employeeId = (lastUser.jobDetail.employeeId as number) + 1;
//     }
//     next();
//   } catch (error) {
//     console.log("error", error);
//   }
// });

export default mongoose.model<IUser>("User", userSchema);
