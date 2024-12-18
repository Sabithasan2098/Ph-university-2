import { Model, Types } from "mongoose";

export type TUser = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TGender = "male" | "female" | "other";
export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUser;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};

// export interface FacultyModel extends Model<TFaculty> {
//   isUserExists(id: string): Promise<TFaculty | null>;
// }
// isFaculty exists in dataBase purpose
export interface FacultyModel extends Model<TFaculty> {
  isUserExists(id: string): Promise<TFaculty | null>;
}
