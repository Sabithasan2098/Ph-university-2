import {
  createAdminIntoDB,
  createFacultyIntoDB,
  createStudentIntoDB,
  getMeService,
} from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { appError } from "../../error/custom.appError";

/*use higher order function*/

//create a student--------------------------------->
export const createStudent = catchAsync(async (req) => {
  const { password, student: studentData } = req.body;
  return createStudentIntoDB(password, studentData);
}, "Create student successfully");

// create-faculty------------------------>
export const createFaculty = catchAsync(async (req) => {
  const { password, faculty: facultyData } = req.body;
  return await createFacultyIntoDB(password, facultyData);
}, "Create faculty is successful");

// create-admin--------------------------->
export const createAdmin = catchAsync(async (req) => {
  const { password, admin: adminData } = req.body;
  return await createAdminIntoDB(password, adminData);
}, "Create admin successfully");

// get-me--------------------------------->
export const getMe = catchAsync(async (req) => {
  const token = req.headers?.authorization;
  if (!token) {
    throw new appError(400, "Token not found");
  }
  return await getMeService(token as string);
}, "Get your data successfully");
