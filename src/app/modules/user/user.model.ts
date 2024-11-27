import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    changePassword: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "student", "faculty"],
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: ["in-progress", "blocked"],
      },
      default: "in-progress",
    },
  },
  {
    timestamps: true,
  },
);

// mongoose pre hook middleware---------------------------->
// data save houar age password hash kore debe
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcryptSalt));
  next();
});

// mongoose post hook middleware--------------------------->
// after the save password filed goes empty
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// use static method and add some logic-------------------->
// isUserExists
userSchema.statics.IsUserExists = async function (id: string) {
  return await this.findOne({ id }).select("+password");
};
// check isUserDeleted
userSchema.statics.IsUserDeleted = async function (id: string) {
  const user = await this.findOne({ id }).select("isDeleted");
  if (!user) {
    return null;
  }
  return user.isDeleted;
};
// check isUser blocked or not
userSchema.statics.IsUserBlocked = async function (id: string) {
  const user = await this.findOne({ id }).select("status");
  return user?.status === "blocked";
};

// check change password time if changePassword then the token will refresh
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangeTimestamp: Date,
  JWTIssuedTimestamp: number,
) {
  const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;
  return passwordChangeTime > JWTIssuedTimestamp;
};
// check password
userSchema.statics.IsPasswordMatch = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const userModelSchema = model<TUser, UserModel>("user", userSchema);
