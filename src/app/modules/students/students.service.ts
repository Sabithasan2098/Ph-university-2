import mongoose from "mongoose";
import { StudentModelSchema } from "./students.model";
import { appError } from "../../error/custom.appError";
import { userModelSchema } from "../user/user.model";
import { TStudent } from "./students.interface";
import { handleQuery } from "../../utils/handleQuery";

// get all students------------------------------------->
export const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const searchAbleField = [
    "name.firstName",
    "name.middleName",
    "name.lastName",
    "gender",
    "email",
    "contactNumber",
    "emergencyContactNumber",
    "presentAddress",
    "bloodGroup",
    "guardians.fatherName",
    "guardians.fatherOccupation",
    "guardians.fatherContactNumber",
    "guardians.motherName",
    "guardians.motherOccupation",
    "guardians.motherOccupation",
    "localGuardians.name",
    "localGuardians.occupation",
    "localGuardians.contactNumber",
    "localGuardians.address",
  ];

  // handleQuery ফাংশন ব্যবহার
  return await handleQuery(StudentModelSchema, query, searchAbleField);
};

// get a single student data---------------------------->
export const getAStudentDataByIdFromDB = async (id: string) => {
  const result = await StudentModelSchema.findOne({ id }).populate(
    "admissionSemester",
  );
  // const result = await StudentModelSchema.aggregate([{ $match: { id: id } }]);
  return result;
};

// update a single student data---------------------------->
export const updateAStudentDataByIdFromDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardians, localGuardians, ...remainingStudentData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingStudentData };

  // for name
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  // for guardian
  if (guardians && Object.keys(guardians).length) {
    for (const [key, value] of Object.entries(guardians)) {
      modifiedData[`guardians.${key}`] = value;
    }
  }

  // for localGuardians
  if (localGuardians && Object.keys(localGuardians).length) {
    for (const [key, value] of Object.entries(localGuardians)) {
      modifiedData[`localGuardians.${key}`] = value;
    }
  }

  const result = await StudentModelSchema.findOneAndUpdate(
    { id },
    modifiedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// get a single student data---------------------------->
// actually we don't delete data just update a field
export const deleteAStudentDataByIdFromDB = async (id: string) => {
  const session =
    await mongoose.startSession(); /*start session to transaction*/
  try {
    session.startTransaction(); /*start transaction */
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction(); /*faield hole transaction off kora*/
    await session.endSession(); /*session send kora*/
    throw new appError(400, "Student not create");
  }
};
