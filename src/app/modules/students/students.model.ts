import { Schema, model } from "mongoose";
import {
  Gurdian,
  IStudents,
  LoacalGurdian,
  userName,
} from "./students.interface";

const userNameSchema = new Schema<userName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const gurdianSchema = new Schema<Gurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const LoacalGurdianSchema = new Schema<LoacalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentsSchema = new Schema<IStudents>({
  id: { type: String },
  name: userNameSchema,
  gender: ["male", "female"],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  gurdian: gurdianSchema,
  loacalGurdian: LoacalGurdianSchema,
  profileImg: { type: String },
  isActive: ["active", "blocked"],
});

export const StudentModel = model<IStudents>("Student", studentsSchema);
