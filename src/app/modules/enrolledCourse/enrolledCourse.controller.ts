/* eslint-disable @typescript-eslint/no-explicit-any */
import { catchAsync } from "../../utils/catchAsync";
import {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksService,
} from "./enrolledCourse.service";

export const createEnrolledCourse = catchAsync(async (req: any) => {
  const userId = req.user.userId;
  return await createEnrolledCourseIntoDB(userId, req.body);
}, "Create enrolled course successfully");

export const updateEnrolledCourseMarks = catchAsync(async (req: any) => {
  const facultyId = req.user.userId;
  return await updateEnrolledCourseMarksService(req.body, facultyId);
}, "Update course marks successfully");
