import { catchAsync } from "../../utils/catchAsync";
import {
  assignFacultiesInCourseIntoDB,
  createCourseIntoDB,
  deleteCourseIntoDB,
  getAllCourseIntoDB,
  getAssignFacultiesInCourseIntoDB,
  getSingleCourseIntoDB,
  removeFacultiesInCourseIntoDB,
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

// assign faculties---------------------->
export const assignFaculties = catchAsync(async (req) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  return await assignFacultiesInCourseIntoDB(courseId, faculties);
}, "Assign faculties successfully");
// get assign faculties---------------------->
export const getAssignFaculties = catchAsync(async (req) => {
  const { courseId } = req.params;
  return await getAssignFacultiesInCourseIntoDB(courseId);
}, " Get assign faculties successfully");

// remove faculties---------------------->
export const removeFaculties = catchAsync(async (req) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  return await removeFacultiesInCourseIntoDB(courseId, faculties);
}, "Remove faculties successfully");
