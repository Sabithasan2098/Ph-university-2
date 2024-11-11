export type TUser = {
  id: string;
  password: string;
  changePassword: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  // createdAt and updatedAt mongoose will give us
};
