import { appError } from "../../error/custom.appError";
import { catchAsync } from "../../utils/catchAsync";
import { FacultyModelSchema } from "./faculty.model";
import {
  deleteFacultyIntoDB,
  getAllFacultyIntoDB,
  getASingleFacultyIntoDB,
  updateFacultyIntoDB,
} from "./faculty.service";

// get-faculty--------------------------->
export const getAllFaculty = catchAsync(async (req) => {
  console.log(req.cookies);
  return await getAllFacultyIntoDB();
}, "Get all faculty successful");

// get-a-single-faculty--------------------------->
export const getASingleFaculty = catchAsync(async (req) => {
  const facultyId = req.params.facultyId;
  // check this provided id is valid or not
  const existingFaculty = await FacultyModelSchema.isUserExists(facultyId);
  if (existingFaculty) {
    return await getASingleFacultyIntoDB(facultyId);
  } else {
    throw new appError(400, "Faculty not found");
  }
}, "Get a single faculty successful");

// get-a-single-faculty-and-update---------------->
export const updateFaculty = catchAsync(async (req) => {
  const facultyId = req.params.facultyId;
  const facultyData = req.body.faculty;
  // check this provided id is valid or not
  const existingFaculty = await FacultyModelSchema.isUserExists(facultyId);
  if (existingFaculty) {
    return await updateFacultyIntoDB(facultyData, facultyId);
  } else {
    throw new appError(400, "Invalid Id");
  }
}, "Update faculty successful");

// get-a-single-faculty-and-delete---------------->
export const deleteFaculty = catchAsync(async (req) => {
  const facultyId = req.params.facultyId;
  // check this provided id is valid or not
  const existingFaculty = await FacultyModelSchema.isUserExists(facultyId);
  if (existingFaculty) {
    return await deleteFacultyIntoDB(facultyId);
  } else {
    throw new appError(400, "Invalid Id");
  }
}, "Delete faculty successfully");
