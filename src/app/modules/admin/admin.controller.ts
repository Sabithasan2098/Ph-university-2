import { appError } from "../../error/custom.appError";
import { catchAsync } from "../../utils/catchAsync";
import { AdminModelSchema } from "./admin.model";
import {
  deleteAdminIntoDB,
  getAllAdminIntoDB,
  getASingleAdminIntoDB,
  updateSingleAdminIntoDB,
} from "./admin.service";

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

// get a single admin and update-------------->
export const updateAdmin = catchAsync(async (req) => {
  const { adminId } = req.params;
  const adminData = req.body.admin;
  const isAdminExists = await AdminModelSchema.isUserExists(adminId);
  if (!isAdminExists) {
    throw new appError(400, "Invalid Id");
  }
  const updatedAdminData = await updateSingleAdminIntoDB(adminData, adminId);
  if (!updatedAdminData) {
    throw new appError(404, "Admin not found or update failed");
  }
  return updatedAdminData;
}, "Update successful");

// delete admin--------------->
export const deleteAdmin = catchAsync(async (req) => {
  const { adminId } = req.params;
  const isAdminExists = await AdminModelSchema.isUserExists(adminId);
  if (!isAdminExists) {
    throw new appError(400, "Invalid Id");
  }
  const deleteAdminData = await deleteAdminIntoDB(adminId);
  if (!deleteAdminData) {
    throw new appError(400, "try again to delete");
  }
  return deleteAdminData;
}, "Delete admin successful");
