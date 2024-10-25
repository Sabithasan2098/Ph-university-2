import { Schema, model } from "mongoose";
import {
  Gurdian,
  IStudents,
  LoacalGurdian,
  userName,
} from "./students.interface";

const userNameSchema = new Schema<userName>({
  firstName: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "last name is required"],
    trim: true,
  },
});

const gurdianSchema = new Schema<Gurdian>({
  fatherName: {
    type: String,
    required: [true, "father name is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "father occupation is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "father contact no is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "mother name is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "mother occupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "mother contact no is required"],
    trim: true,
  },
});

const LoacalGurdianSchema = new Schema<LoacalGurdian>({
  name: {
    type: String,
    required: [true, "local gurdian name is required"],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "local gurdian ocupation is required"],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "local gurdian contact no is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "local gurdian address is required"],
    trim: true,
  },
});

const studentsSchema = new Schema<IStudents>({
  id: { type: String, required: true, unique: true, trim: true },
  name: {
    type: userNameSchema,
    required: [true, "name field is required"],
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
    required: [true, "email is required"],
    unique: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "contact no is required"],
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    required: [true, "emergency contact no is required"],
    trim: true,
  },
  presentAddress: {
    type: String,
    required: [true, "present address is required"],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    trim: true,
  },
  gurdian: {
    type: gurdianSchema,
    required: [true, "gurdian field is required"],
  },
  loacalGurdian: {
    type: LoacalGurdianSchema,
    required: [true, "local gurdian field is required"],
  },
  profileImg: { type: String, trim: true },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
    trim: true,
  },
});

export const StudentModel = model<IStudents>("Student", studentsSchema);
