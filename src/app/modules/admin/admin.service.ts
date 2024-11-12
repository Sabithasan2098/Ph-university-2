import mongoose from "mongoose";
import { TAdmin } from "./admin.interface";
import { AdminModelSchema } from "./admin.model";
import { appError } from "../../error/custom.appError";
import { userModelSchema } from "../user/user.model";

// get all admin--------->
export const getAllAdminIntoDB = async () => {
  const result = await AdminModelSchema.find();
  return result;
};

// get single admin------------>
export const getASingleAdminIntoDB = async (id: string) => {
  const result = await AdminModelSchema.findOne({ id });
  return result;
};

// get a single admin and update---------------->
export const updateSingleAdminIntoDB = async (
  payload: Partial<TAdmin>,
  id: string,
) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingAdminData };

  // for name
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await AdminModelSchema.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete admin with user--------------------->
export const deleteAdminIntoDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deleteAdmin = await AdminModelSchema.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteAdmin) {
      throw new appError(400, "Faield to delete admin");
    }
    // delete user----------->
    const deleteUser = await userModelSchema.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new appError(400, "Faield to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteAdmin;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new appError(400, "Invalid Id");
  }
};
