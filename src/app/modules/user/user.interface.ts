import { Model } from "mongoose";

export interface TUser {
  id: string;
  password: string;
  changePassword: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  // createdAt and updatedAt mongoose will give us
}

export interface UserModel extends Model<TUser> {
  IsUserExists(id: string): Promise<TUser | null>;
  IsUserDeleted(id: string): Promise<boolean | null>;
  IsUserBlocked(id: string): Promise<boolean | null>;
  IsPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string | undefined,
  ): Promise<boolean | null>;
}
