export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type userName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type LoacalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudents = {
  id: string;
  name: userName;
  gender: "male" | "female"|"other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  gurdian: Gurdian;
  loacalGurdian: LoacalGurdian;
  profileImg?: string;
  isActive: "active" | "blocked";
};
