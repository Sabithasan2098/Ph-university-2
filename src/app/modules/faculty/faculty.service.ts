import mongoose from "mongoose";
import { TFaculty } from "./faculty.interface";
import { FacultyModelSchema } from "./faculty.model";
import { appError } from "../../error/custom.appError";
import { userModelSchema } from "../user/user.model";

// get faculty------------------>
export const getAllFacultyIntoDB = async () => {
  const result = await FacultyModelSchema.find();
  return result;
};

// get a single faculty------------------>
export const getASingleFacultyIntoDB = async (id: string) => {
  const result = await FacultyModelSchema.findOne({ id });
  return result;
};

// get a single faculty and update------------------>
export const updateFacultyIntoDB = async (
  payload: Partial<TFaculty>,
  id: string,
) => {
  const result = await FacultyModelSchema.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

// get a single faculty and delete------------------>
export const deleteFacultyIntoDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteFaculty = await FacultyModelSchema.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteFaculty) {
      throw new appError(400, "Faield to delete student");
    }
    // delete-user--------------------->
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
    return deleteFaculty;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new appError(400, "Faculty not create");
  }
};
