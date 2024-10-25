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

export type IStudent = {
  id: string;
  name: UserName;
  email: string;
  gender: "male" | "female" | "other";
  dateOfBirth?: string | undefined;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | undefined;
  presentAddress: string;
  permanentAddress: string;
  guardians: Guardian;
  localGuardians: LocalGuardian;
  profilePicture?: string | undefined;
  isActive: "active" | "blocked";
};
