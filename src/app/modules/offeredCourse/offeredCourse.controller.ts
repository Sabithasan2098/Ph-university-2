import { catchAsync } from "../../utils/catchAsync";
import {
  createOfferedCourseIntoDB,
  getAllOfferedCourseIntoDB,
  getSingleOfferedCourseIntoDB,
  updateSingleOfferedCourseIntoDB,
} from "./offeredCourse.service";

// create offeredCourse---------------------->
export const createOfferedCourse = catchAsync(async (req) => {
  return await createOfferedCourseIntoDB(req.body);
}, "Create offered course successfully");

// get all semesterRegister------------------->
export const getAllOfferedCourse = catchAsync(async (req) => {
  return await getAllOfferedCourseIntoDB(req.body);
}, "Get all data successfully");

// get single semesterRegister------------------->
export const getSingleOfferedCourse = catchAsync(async (req) => {
  const { id } = req.params;
  return await getSingleOfferedCourseIntoDB(id);
}, "Get single data successfully");

// get single semesterRegister------------------->
export const updateSingleOfferedCourse = catchAsync(async (req) => {
  const { id } = req.params;
  return await updateSingleOfferedCourseIntoDB(id, req.body);
}, "Update single data successfully");
