import { catchAsync } from "../../utils/catchAsync";
import { createAdminIntoDB } from "./admin.service";

export const createAdmin = catchAsync(async (req) => {
  const adminData = req.body;
  return await createAdminIntoDB(adminData);
}, "Create admin successfully");
