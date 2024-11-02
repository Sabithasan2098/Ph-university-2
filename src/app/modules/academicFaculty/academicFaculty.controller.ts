import { catchAsync } from "../../utils/catchAsync";
import {
  createAcademicFacultyIntoDB,
  getAAcademicFacultyFromDB,
  getAllAcademicFacultyFromDB,
  updateAAcademicFacultyFromDB,
} from "./academicFaculty.service";

// create academic faculty---------------------->
export const createAcademicFaculty = catchAsync(async (req) => {
  return await createAcademicFacultyIntoDB(req.body);
}, "create academic faculty");

// get  academic faculty----------------------->
export const getAllAcademicFaculty = catchAsync(
  getAllAcademicFacultyFromDB,
  "Get all academic faculty data",
);

// get a academic faculty----------------------->
export const getAAcademicFaculty = catchAsync(async (req) => {
  const facultyId = req.params.facultyId;
  return await getAAcademicFacultyFromDB(facultyId);
}, "Get a academic faculty data");

// update academic faculty---------------------->
export const updateAcademicFaculty = catchAsync(async (req) => {
  const facultyId = req.params.facultyId;
  const facultyData = req.body;
  return await updateAAcademicFacultyFromDB(facultyId, facultyData);
}, "Update academic faculty successfully");
