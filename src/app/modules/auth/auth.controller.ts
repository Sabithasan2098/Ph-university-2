import { catchAsync } from "../../utils/catchAsync";
import { authLoginService, changePasswordIntoDB } from "./auth.service";

export const authLogin = catchAsync(async (req) => {
  return await authLoginService(req.body);
}, "Login confirm");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const changePassword = catchAsync(async (req: any) => {
  const user = req.user;
  const { ...password } = req.body;
  return await changePasswordIntoDB(user, password);
}, "Login confirm");
