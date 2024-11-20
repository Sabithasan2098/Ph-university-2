import { appError } from "../../error/custom.appError";
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { academicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { CourseModel } from "../courses/course.model";
import { FacultyModelSchema } from "../faculty/faculty.model";
import { SemesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";
import { timeConflict } from "./offeredCourse.utils";

export const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
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
    throw new appError(300, "AcademicFaculty not found");
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

  // check if the department belong to faculty
  const isDepartmentBelongToFaculty = await academicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new appError(
      400,
      `This ${isAcademicDepartmentExists.name} didn't exists in this ${isAcademicFacultyExists.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists
  const isMatchData = await OfferedCourseModel.findOne({
    semesterRegistration,
    course,
    section,
  });

  if (isMatchData) {
    throw new appError(
      400,
      `Offered course with same section is already exists`,
    );
  }

  // check schedule
  const assignSchedule = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
  }).select("days startTime endTime");

  const newSchedule = {
    days: { $in: days },
    startTime,
    endTime,
  };

  if (timeConflict(assignSchedule, newSchedule)) {
    throw new appError(
      400,
      "This faculty is not available at this time! Choose another time or day.",
    );
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

// -----------------------------------------//
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

// --------------------------------------------------//
// get-single-semesterRegister------------------------>
export const getSingleOfferedCourseIntoDB = async (id: string) => {
  // check this offeredCourse exists or not
  const isOfferedCourseExists = await OfferedCourseModel.findById(id);

  if (!isOfferedCourseExists) {
    throw new appError(
      400,
      "This offered course is not exists in database or invalid id ! check id and try again",
    );
  }

  const result =
    await OfferedCourseModel.findById(id).populate("academicSemester");
  return result;
};

// --------------------------------------------------//
// update-single-offeredCourse------------------------>
export const updateSingleOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">,
) => {
  const { faculty, days, startTime, endTime } = payload;
  // check is this data present or not
  const isOfferedCourseExists = await OfferedCourseModel.findById(id);
  if (!isOfferedCourseExists) {
    throw new appError(400, "This offered course is not exists");
  }
  //   check faculty exists or not
  const isFacultyExists = await FacultyModelSchema.findById(faculty);
  if (!isFacultyExists) {
    throw new appError(300, "Faculty not found");
  }

  // check schedule
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  const assignSchedule = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
  }).select("days startTime endTime");

  const newSchedule = {
    days: { $in: days },
    startTime,
    endTime,
  };

  if (timeConflict(assignSchedule, newSchedule)) {
    throw new appError(
      400,
      "This faculty is not available at this time! Choose another time or day.",
    );
  }

  // check semesterRegistration status
  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new appError(
      400,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
// --------------------------------------------------//
