import { Model, Types } from "mongoose";

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};

export type UserName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
  address: string;
};

export type TStudent = {
  id: string;
  user:Types.ObjectId
  password: string;
  name: UserName;
  email: string;
  gender: "male" | "female" | "other";
  dateOfBirth?: Date;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?:
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-"
    | undefined;
  presentAddress: string;
  permanentAddress: string;
  guardians: Guardian;
  localGuardians: LocalGuardian;
  profilePicture?: string | undefined;
  isDeleted:boolean
};

// create student instance method-------------------------->
export type StudentMethod = {
  isUserExists(id:string):Promise<TStudent | null>
}

export type StudentModel = Model<TStudent, Record<string,never>, StudentMethod>;
