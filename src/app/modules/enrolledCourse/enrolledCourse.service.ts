import mongoose from "mongoose";
import { appError } from "../../error/custom.appError";
import { OfferedCourseModel } from "../offeredCourse/offeredCourse.model";
import { StudentModelSchema } from "../students/students.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourseModel } from "./enrolledCourse.model";
import { SemesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { CourseModel } from "../courses/course.model";
import { FacultyModelSchema } from "../faculty/faculty.model";
import { gradePoints } from "./enrolledCourse.utills";

export const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload;

  // check isOfferedCourseExists or not
  const isOfferedCourseExists =
    await OfferedCourseModel.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new appError(400, "This offered course is not exists");
  }

  //   find the student mongoDB id
  const student = await StudentModelSchema.findOne({ id: userId }).select(
    "_id",
  );
  const studentId = student?._id;

  // check is the student already enrolled
  const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse: offeredCourse,
    student: studentId,
  });

  if (isStudentAlreadyEnrolled) {
    throw new appError(400, "Student is already enrolled");
  }

  //   check offered course max capacity
  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new appError(400, "Room is full");
  }

  // check total credit exceed maxCredit
  const semesterRegistration = await SemesterRegistrationModel.findById(
    isOfferedCourseExists.semesterRegistration,
    { maxCredit: 1 },
  );

  const enrolledCourses = await EnrolledCourseModel.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: studentId,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "enrolledCourse",
      },
    },
    {
      $unwind: "$enrolledCourse",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: "$enrolledCourse.credits" },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  // total enrolled credits + new enroll course credit > semesterRegistration.maxCredit
  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0]?.totalEnrolledCredits : 0;

  const course = await CourseModel.findById(isOfferedCourseExists.course, {
    credits: 1,
  });

  if (
    totalCredits &&
    semesterRegistration?.maxCredit &&
    totalCredits + course?.credits > semesterRegistration?.maxCredit
  ) {
    throw new appError(400, "You have exceed maximum number of credits");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await EnrolledCourseModel.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: studentId,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new appError(400, "Faield to enrolled this course");
    }

    //   when a student successfully enrolled offered course maxCapacity will be go down
    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourseModel.findByIdAndUpdate(
      offeredCourse,
      {
        maxCapacity: maxCapacity - 1,
      },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const updateEnrolledCourseMarksService = async (
  payload: Partial<TEnrolledCourse>,
  faculty: string,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  // check is semesterRegistration exists
  const isSemesterRegistration =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistration) {
    throw new appError(400, "This semester registration does not exists");
  }

  // check is offeredCourse exists
  const isOfferedCourseExists =
    await OfferedCourseModel.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new appError(400, "This offered course is not exists");
  }

  // check is student exists
  const isStudentExists = await StudentModelSchema.findById(student);

  if (!isStudentExists) {
    throw new appError(400, "This student does not exists");
  }

  // check is this faculty take this course
  const facultyId = await FacultyModelSchema.findOne(
    { id: faculty },
    { _id: 1 },
  );
  const isFacultyBelongToCourse = await EnrolledCourseModel.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: facultyId,
  });
  if (!isFacultyBelongToCourse) {
    throw new appError(400, "Its not your course");
  }

  // Now dynamically update course marks------------------->
  const modifiedData: Record<string, unknown> = { ...courseMarks };

  // auto calculate course marks for grade and grade points
  if (courseMarks?.finalTerm) {
    const { classTest, classTest2, finalTerm, midTerm } =
      isFacultyBelongToCourse.courseMarks;
    const totalMarks =
      Math.ceil(classTest * 0.1) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(finalTerm * 0.5);
    // calculate grade points func
    const result = gradePoints(totalMarks);
    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [keys, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${keys}`] = value;
    }
  }
  const result = await EnrolledCourseModel.findByIdAndUpdate(
    isFacultyBelongToCourse._id,
    { $set: modifiedData },
    { new: true },
  );
  return result;
  // ------------------------------------------------------//
};
