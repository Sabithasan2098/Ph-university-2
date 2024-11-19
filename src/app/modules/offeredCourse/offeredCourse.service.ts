import { appError } from "../../error/custom.appError";
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { academicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { CourseModel } from "../courses/course.model";
import { FacultyModelSchema } from "../faculty/faculty.model";
import { SemesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";

export const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  //   check semesterRegistration exists or not
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new appError(300, "SemesterRegistration not found");
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  //   check academicFaculty exists or not
  const isAcademicFacultyExists =
    await academicFacultyModel.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new appError(300, "SemesterRegistration not found");
  }

  //   check academicDepartment exists or not
  const isAcademicDepartmentExists =
    await academicDepartmentModel.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new appError(300, "AcademicDepartment not found");
  }

  //   check course exists or not
  const isCourseExists = await CourseModel.findById(course);
  if (!isCourseExists) {
    throw new appError(300, "Course not found");
  }

  //   check faculty exists or not
  const isFacultyExists = await FacultyModelSchema.findById(faculty);
  if (!isFacultyExists) {
    throw new appError(300, "Faculty not found");
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

// get-all-OfferedCourse--------------------->

export const getAllOfferedCourseIntoDB = async (
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

    const result = await OfferedCourseModel.find(filterCondition)
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
export const getSingleOfferedCourseIntoDB = async (id: string) => {
  const result =
    await OfferedCourseModel.findById(id).populate("academicSemester");
  return result;
};

// update-single-semesterRegister------------------------>
export const updateSingleOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  // check is this data present or not
  const isOfferedCourseExists = await OfferedCourseModel.findById(id);
  if (!isOfferedCourseExists) {
    throw new appError(400, "This offered course is not exists");
  }

  //   // if the semesterRegister was ended don't allow to update
  //   const currentSemesterStatus = isSemesterExists?.status;
  //   const SemesterStatus = payload.status;
  //   if (currentSemesterStatus === "ENDED") {
  //     throw new appError(
  //       400,
  //       `This semester is already ended so that you can't update this ${id}`,
  //     );
  //   }

  //   // semester status update flow--------------------------->
  //   // UPCOMING----->ONGOING----->ENDED
  //   if (currentSemesterStatus === "UPCOMING" && SemesterStatus === "ENDED") {
  //     throw new appError(
  //       400,
  //       `You can not update status ${currentSemesterStatus} to ${SemesterStatus}`,
  //     );
  //   }
  //   if (currentSemesterStatus === "ONGOING" && SemesterStatus === "UPCOMING") {
  //     throw new appError(
  //       400,
  //       `You can not update status ${currentSemesterStatus} to ${SemesterStatus}`,
  //     );
  //   }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("academicSemester");
  return result;
};
