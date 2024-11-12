import { appError } from "../../error/custom.appError";
import { catchAsync } from "../../utils/catchAsync";
import { AdminModelSchema } from "./admin.model";
import { getAllAdminIntoDB, getASingleAdminIntoDB } from "./admin.service";

// get all admin--------->
export const getAllAdmin = catchAsync(async () => {
  return await getAllAdminIntoDB();
}, "Get all admin successfully");

// get a single admin---------------->
export const getASingleAdmin = catchAsync(async (req) => {
  const adminId = req.params.adminId;
  const isAdminExists = await AdminModelSchema.isUserExists(adminId);
  if (isAdminExists) {
    return await getASingleAdminIntoDB(adminId);
  } else {
    throw new appError(400, "Invalid Id");
  }
}, "Get admin successfully");
