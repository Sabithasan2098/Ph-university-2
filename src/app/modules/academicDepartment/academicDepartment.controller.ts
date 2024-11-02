import { catchAsync } from "../../utils/catchAsync";
import { createAcademicDepartmentIntoDB, getAAcademicDepartmentFromDB, getAllAcademicDepartmentFromDB, updateAAcademicDepartmentFromDB } from "./academicDepartment.service";



// create academic Department---------------------->
export const createAcademicDepartment = catchAsync(async (req) => {
  return await createAcademicDepartmentIntoDB(req.body);
}, "create academic Department");

// get  academic Department----------------------->
export const getAllAcademicDepartment = catchAsync(
  getAllAcademicDepartmentFromDB,
  "Get all academic Department data",
);

// get a academic Department----------------------->
export const getAAcademicDepartment = catchAsync(async (req) => {
  const departmentId = req.params.departmentId;
  return await getAAcademicDepartmentFromDB(departmentId);
}, "Get a academic Department data");

// update academic Department---------------------->
export const updateAcademicDepartment = catchAsync(async (req) => {
  const departmentId = req.params.departmentId;
  const DepartmentData = req.body;
  return await updateAAcademicDepartmentFromDB(departmentId, DepartmentData);
}, "Update academic Department successfully");
