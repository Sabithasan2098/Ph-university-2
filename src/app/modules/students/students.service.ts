import mongoose from "mongoose";
import { StudentModelSchema } from "./students.model";
import { appError } from "../../error/custom.appError";
import { userModelSchema } from "../user/user.model";
import { TStudent } from "./students.interface";

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

  // সার্চ টার্ম সেটআপ করা----------------------------->
  //ata partial search
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  // সার্চ কন্ডিশন তৈরি করা----------------------------->
  const searchQuery = searchAbleField.map((field) => ({
    [field]: { $regex: searchTerm, $options: "i" },
  }));
  // --------------------------------------->

  // create sort method--------------------->
  const sortBy = query.sortBy ? (query.sortBy as string) : "id";
  const sortOrder = query.sortOrder === "desc" ? -1 : 1;
  // http://localhost:5000/api/v1/students/get-all-students-data?sortBy=id&sortOrder=desc   //you have use this to sort

  // set limit & pagination------------------------------>
  const limit = query.limit ? parseInt(query.limit as string, 10) : 10;
  // pagination------------------------------------------>
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const skip = (page - 1) * limit;

  // field limiting-------------------------------------->
  const fields = query.fields
    ? (query.fields as string).replace(/,/g, " ")
    : " ";

  // query filtering------------------------>
  const queryObj = { ...query };
  const excludeFields = [
    "searchTerm",
    "sortBy",
    "sortOrder",
    "limit",
    "page",
    "fields",
  ];
  excludeFields.forEach((el) => delete queryObj[el]);
  // --------------------------------------->

  const result = await StudentModelSchema.find({
    $and: [{ $or: searchQuery }, queryObj],
  })
    .select(fields)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .populate("admissionSemester");
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction(); /*faield hole transection off kora*/
    await session.endSession(); /*session send kora*/
    throw new appError(400, "Student not create");
  }
};
