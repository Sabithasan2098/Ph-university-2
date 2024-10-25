import { Schema, model } from "mongoose";
import {
  Gurdian,
  IStudents,
  LoacalGurdian,
  userName,
} from "./students.interface";

const userNameSchema = new Schema<userName>({
  firstName: { type: String, required: [true, "first name is required"] },
  middleName: { type: String },
  lastName: { type: String, required: [true, "last name is required"] },
});
const gurdianSchema = new Schema<Gurdian>({
  fatherName: { type: String, required: [true, "father name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "father occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "father contact no is required"],
  },
  motherName: { type: String, required: [true, "mother name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "mother occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "mother contact no is required"],
  },
});
const LoacalGurdianSchema = new Schema<LoacalGurdian>({
  name: { type: String, required: [true, "local gurdian name is required"] },
  occupation: {
    type: String,
    required: [true, "local gurdian ocupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "local gurdian contact no is required"],
  },
  address: {
    type: String,
    required: [true, "local gurdian address is required"],
  },
});

const studentsSchema = new Schema<IStudents>({
  id: { type: String,required:true,unique:true },
  name: {
    type: userNameSchema,
    required: [true, "name field is required"],
  },
  gender: {
    type: String,
    enum: {
      values:["male", "female", "other"],
      message:"{VALUE} is not currect"
    },
    required:true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, "email is required"],unique:true },
  contactNo: { type: String, required: [true, "contact no is required"] },
  emergencyContactNo: {
    type: String,
    required: [true, "emergency contact no is required"],
  },
  presentAddress: {
    type: String,
    required: [true, "present address is required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  gurdian: {
    type: gurdianSchema,
    required: [true, "gurdian  field is required"],
  },
  loacalGurdian: {
    type: LoacalGurdianSchema,
    required: [true, "local gurdian field is required"],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
});

export const StudentModel = model<IStudents>("Student", studentsSchema);
