import { Schema, model } from "mongoose";
import {
  Guardian,
  IStudent, 
  LocalGuardian,
  UserName,
} from "./students.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation is required"],
    trim: true,
  },
  fatherContactNumber: {
    type: String,
    required: [true, "Father contact number is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother name is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"],
    trim: true,
  },
  motherContactNumber: {
    type: String,
    required: [true, "Mother contact number is required"],
    trim: true,
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "Local guardian occupation is required"],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Local guardian contact number is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local guardian address is required"],
    trim: true,
  },
});

// Update the studentSchema to reflect the IStudents structure
const studentSchema = new Schema<IStudent>({
  id: { type: String, required: true, unique: true, trim: true },
    name: {
      type: userNameSchema,
      required: [true, "Name field is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not correct",
      },
      required: true,
      trim: true,
    },
    dateOfBirth: { type: String, trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    emergencyContactNumber: {
      type: String,
      required: [true, "Emergency contact number is required"],
      trim: true,
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      trim: true,
    },
    guardians: {
      type: guardianSchema,
      required: [true, "Guardian field is required"],
    },
    localGuardians: {
      type: localGuardianSchema,
      required: [true, "Local guardian field is required"],
    },
    profilePicture: { type: String, trim: true },
    isActive: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
      trim: true,
    },
  
});

export const StudentModel = model<IStudent>("Student", studentSchema);
