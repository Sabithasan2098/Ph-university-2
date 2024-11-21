import { catchAsync } from "../../utils/catchAsync";
import { authLoginService } from "./auth.service";

export const authLogin = catchAsync(async (req) => {
  return await authLoginService(req.body);
}, "Login confirm");
