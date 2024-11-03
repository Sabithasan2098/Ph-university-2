import mongoose from "mongoose";
import { StudentModelSchema } from "./students.model";
import { appError } from "../../error/custom.appError";
import { userModelSchema } from "../user/user.model";

// get all students------------------------------------->
export const getAllStudentsFromDB = async () => {
  const result = await StudentModelSchema.find().populate("admissionSemester");
  return result;
};

// get a single student data---------------------------->
export const getAStudentDataByIdFromDB = async (id: string) => {
  const result = await StudentModelSchema.findOne({ id }).populate(
    "admissionSemester",
  );
  // const result = await StudentModelSchema.aggregate([{ $match: { id: id } }]);
  return result;
};

// get a single student data---------------------------->
// actually we don't delete data just update a field
export const deleteAStudentDataByIdFromDB = async (id: string) => {
  const session =
    await mongoose.startSession(); /*start session to transection*/
  try {
    session.startTransaction(); /*start transection */
    const deleteStudent = await StudentModelSchema.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      } /*session phathano holo update er jonno e rokom vabe phathate hbe */,
    );

    if (!deleteStudent) {
      throw new appError(400, "faield to delete student");
    }

    // delete user---------------------->
    const deleteUser = await userModelSchema.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      } /*session phathano holo update er jonno e rokom vabe phathate hbe */,
    );

    if (!deleteUser) {
      throw new appError(400, "faield to delete user");
    }

    await session.commitTransaction(); /*successful hole commit kora*/
    await session.endSession(); /*session send kora*/
    return deleteStudent;
  } catch (error) {
    await session.abortTransaction(); /*faield hole transection off kora*/
    await session.endSession(); /*session send kora*/
  }
};
