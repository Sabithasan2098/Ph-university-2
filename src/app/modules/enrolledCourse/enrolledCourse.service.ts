import mongoose from "mongoose";
import { appError } from "../../error/custom.appError";
import { OfferedCourseModel } from "../offeredCourse/offeredCourse.model";
import { StudentModelSchema } from "../students/students.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourseModel } from "./enrolledCourse.model";

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
    offeredCourse,
    studentId,
  });

  if (isStudentAlreadyEnrolled) {
    throw new appError(400, "Student is already enrolled");
  }

  //   check offered course max capacity
  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new appError(400, "Room is full");
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
