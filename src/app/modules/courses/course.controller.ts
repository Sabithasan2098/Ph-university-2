import { catchAsync } from "../../utils/catchAsync";
import {
  createCourseIntoDB,
  deleteCourseIntoDB,
  getAllCourseIntoDB,
  getSingleCourseIntoDB,
  updateCourseIntoDB,
} from "./course.service";

// create course------------------------------>
export const createCourse = catchAsync(async (req) => {
  return await createCourseIntoDB(req.body);
}, "Create course successfully");

// get all course----------------------->
export const getAllCourse = catchAsync(async (req) => {
  return await getAllCourseIntoDB(req.body);
}, "Get all course data");

// get a course----------------------->
export const getSingleCourse = catchAsync(async (req) => {
  const id = req.params.id;
  return await getSingleCourseIntoDB(id);
}, "Get a single course data");

// delete course---------------------->
export const deleteCourse = catchAsync(async (req) => {
  const id = req.params.id;
  return await deleteCourseIntoDB(id);
}, "Delete course successfully");

// update course---------------------->
export const updateCourse = catchAsync(async (req) => {
  const id = req.params.id;
  const data = req.body;
  return await updateCourseIntoDB(id, data);
}, "Update course successfully");
