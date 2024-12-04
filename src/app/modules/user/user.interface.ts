import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  email: string;
  password: string;
  changePassword: boolean;
  passwordChangeAt?: Date;
  role: "superAdmin" | "admin" | "student" | "faculty";
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
  isJWTIssuedBeforePasswordChanged(
    passwordChangeTimestamp: Date,
    JWTIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
