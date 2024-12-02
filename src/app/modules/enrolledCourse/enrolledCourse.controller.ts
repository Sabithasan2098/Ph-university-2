/* eslint-disable @typescript-eslint/no-explicit-any */
import { catchAsync } from "../../utils/catchAsync";
import {
  createEnrolledCourseIntoDB,
  getAllEnrolledCoursesIntoDB,
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

// get all enrolled courses
export const getAllEnrolledCourses = catchAsync(async (req) => {
  return await getAllEnrolledCoursesIntoDB(req.query);
}, "Get all enrolled courses successfully");
