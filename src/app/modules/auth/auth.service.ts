import jwt, { JwtPayload } from "jsonwebtoken";
import { appError } from "../../error/custom.appError";
import { userModelSchema } from "../user/user.model";
import { TChangePassword, TLogin } from "./auth.interface";
import config from "../../config";
import bcrypt from "bcrypt";

export const authLoginService = async (payload: TLogin) => {
  // check user exists or not
  const user = await userModelSchema
    .findOne({ id: payload.id })
    .select("+password");
  if (!(await userModelSchema.IsUserExists(payload.id))) {
    throw new appError(400, "This user not found");
  }
  // check user isDeleted
  if (await userModelSchema.IsUserDeleted(payload.id)) {
    throw new appError(400, "This user is deleted");
  }
  // check user isBlocked
  if (await userModelSchema.IsUserBlocked(payload.id)) {
    throw new appError(400, "This user is blocked");
  }

  // // check is password match

  if (
    !(await userModelSchema.IsPasswordMatch(payload?.password, user?.password))
  ) {
    throw new appError(400, "Wrong password");
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  // accessToken
  const accessToken = jwt.sign(jwtPayload, config.jwt_token as string, {
    expiresIn: config.jwt_access_expire,
  });
  // refresh token
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_token as string,
    {
      expiresIn: config.jwt_refresh_expire,
    },
  );

  return {
    accessToken,
    refreshToken,
    changePassword: user?.changePassword,
  };
};

export const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  // check user exists or not
  const user = await userModelSchema.IsUserExists(userData.userId);

  if (!user) {
    throw new appError(400, "This user not found");
  }
  // check user isDeleted
  if (await userModelSchema.IsUserDeleted(user.id)) {
    throw new appError(400, "This user is deleted");
  }
  // check user isBlocked
  if (await userModelSchema.IsUserBlocked(user.id)) {
    throw new appError(400, "This user is blocked");
  }

  // Check if the old password matches
  const isPasswordMatch = await userModelSchema.IsPasswordMatch(
    payload.oldPassword,
    user.password,
  );
  if (!isPasswordMatch) {
    throw new appError(400, "Old password is wrong which you provided");
  }

  // hash the new password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcryptSalt),
  );

  // Update the password in the database
  await userModelSchema.findOneAndUpdate(
    {
      id: userData.userId,
    },
    {
      password: hashedPassword,
      changePassword: false,
      passwordChangeAt: new Date(),
    },
  );

  return "Password was updated successfully";
};
