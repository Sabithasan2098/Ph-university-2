import { appError } from "../../error/custom.appError";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";

export const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // first check academic semester exists or not
  const isAcademicSemesterExists =
    await academicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new appError(400, "This academic semester not found");
  }

  // check semester registration exists or not
  const isSemesterRegisterExists = await SemesterRegistrationModel.findOne({
    academicSemester: academicSemester,
  });
  if (isSemesterRegisterExists) {
    throw new appError(400, "This semester registration is already exists");
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

// get-all-semesterRegistration--------------------->

export const getAllSemesterRegistrationIntoDB = async (
  query: Record<string, unknown>,
) => {
  try {
    // create searchable field--------------->
    const searchAbleField = [
      "academicSemester",
      "status",
      "minCredit",
      "maxCredit",
    ];

    // সার্চ টার্ম সেটআপ করা----------------------------->
    //ata partial search
    const searchTerm = query.searchTerm ? (query.searchTerm as string) : "";

    // সার্চ কন্ডিশন তৈরি করা----------------------------->
    const searchQuery =
      searchTerm.trim() !== ""
        ? {
            $or: searchAbleField.map((field) => ({
              [field]: { $regex: searchTerm, $options: "i" },
            })),
          }
        : {};

    // create sort method------------------------------>
    const sortBy = query.sortBy ? (query.sortBy as string) : "updatedAt";
    const sortOrder = query.sortOrder === "desc" ? -1 : 1;
    // http://localhost:5000/api/v1/students/get-all-course-data?sortBy=updatedAt&sortOrder=desc   //you have use this to sort

    //   set limit & pagination-------------------------->
    const limit = query.limit ? parseInt(query.limit as string, 10) : 10;
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const skip = (page - 1) * limit;

    //field limiting----------------------------------->
    const fields = query.fields
      ? (query.fields as string).replace(/,/g, " ")
      : " ";

    // query filtering--------------------------------->
    const queryObj = { ...query };
    const excludeFields = [
      "searchTerm",
      "sortBy",
      "sortOrder",
      "fields",
      "limit",
      "page",
    ];

    excludeFields.forEach((el) => delete queryObj[el]);

    //   combine filter condition---------------------->
    const filterCondition = {
      ...searchQuery,
      ...queryObj,
    };

    const result = await SemesterRegistrationModel.find(filterCondition)
      .populate("academicSemester")
      .select(fields)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new appError(400, "Faield to find please try again");
  }
};

// get-single-semesterRegister------------------------>
export const getSingleSemesterRegistrationIntoDB = async (id: string) => {
  const result =
    await SemesterRegistrationModel.findById(id).populate("academicSemester");
  return result;
};
