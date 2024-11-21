import { appError } from "../../error/custom.appError";
import { userModelSchema } from "../user/user.model";
import { TLogin } from "./auth.interface";
import bcrypt from "bcrypt";

export const authLoginService = async (payload: TLogin) => {
  // check user exists or not
  const isUserExists = await userModelSchema.findOne({ id: payload.id });
  if (!isUserExists) {
    throw new appError(400, "This user not found");
  }
  const isUserDeleted = isUserExists.isDeleted;
  if (isUserDeleted) {
    throw new appError(400, "This user is deleted");
  }
  const isUserBlocked = isUserExists.status;
  if (isUserBlocked === "blocked") {
    throw new appError(400, "This user is blocked");
  }

  // check is password match
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  if (!isPasswordMatch) {
    throw new appError(400, "Wrong password");
  }

  console.log(payload);
};
