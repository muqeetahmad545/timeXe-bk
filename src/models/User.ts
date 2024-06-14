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
<<<<<<< HEAD
  // userLeaveApplication: [{ type: Schema.Types.ObjectId, ref: "leaveApplication", required: true }],  
=======
>>>>>>> b06a11ed0222b607cc551b9b7c80fd3b33adda5a
}

const userSchema: Schema = new Schema(
  {
<<<<<<< HEAD
    userDetail: {
      fullName: { type: String, required: true },
      fatherName: { type: String },
      email: {
        type: String,
        required: true,
      },
      address: { type: String },
      phone: { type: Number, required: true },
      dob: { type: Date, required: true },
      cnic: { type: String, required: true,  trim: true },
      profileImage: { type: String },
      gender: { type: String },
    },
    jobDetail: {
      employeeId: { type: Number },
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
      confirmPassword: { type: String, required: false },
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
=======
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
>>>>>>> b06a11ed0222b607cc551b9b7c80fd3b33adda5a

export default mongoose.model<IUser>("User", userSchema);
