import jwt from "jsonwebtoken";
import { appError } from "../../error/custom.appError";
import { userModelSchema } from "../user/user.model";
import { TLogin } from "./auth.interface";
import config from "../../config";
// import bcrypt from "bcrypt";

export const authLoginService = async (payload: TLogin) => {
  // check user exists or not
  const user = await userModelSchema.findOne({ id: payload.id });
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
    userId: user,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_token as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    changePassword: user?.changePassword,
  };

  console.log(payload);
};
