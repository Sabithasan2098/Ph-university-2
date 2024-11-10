import { catchAsync } from "../../utils/catchAsync";
import {
  createFacultyIntoDB,
  deleteFacultyIntoDB,
  getAllFacultyIntoDB,
  getASingleFacultyIntoDB,
  updateFacultyIntoDB,
} from "./faculty.service";

// create-faculty------------------------>
export const createFaculty = catchAsync(async (req) => {
  return await createFacultyIntoDB(req.body);
}, "Create faculty is successful");

// get-faculty--------------------------->
export const getAllFaculty = catchAsync(async () => {
  return await getAllFacultyIntoDB();
}, "Get all faculty successful");

// get-a-single-faculty--------------------------->
export const getASingleFaculty = catchAsync(async (req) => {
  const facultyId = req.params.facultyId;
  return await getASingleFacultyIntoDB(facultyId);
}, "Get all faculty successful");

// get-a-single-faculty-and-update---------------->
export const updateFaculty = catchAsync(async (req) => {
  const facultyId = req.params.facultyId;
  const facultyData = req.body;
  return await updateFacultyIntoDB(facultyData, facultyId);
}, "Get all faculty successful");

// get-a-single-faculty-and-delete---------------->
export const deleteFaculty = catchAsync(async (req) => {
  const facultyId = req.params.facultyId;
  return await deleteFacultyIntoDB(facultyId);
}, "Get all faculty successful");
