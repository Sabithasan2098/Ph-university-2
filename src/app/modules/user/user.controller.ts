import {
  changeStatusService,
  createAdminIntoDB,
  createFacultyIntoDB,
  createStudentIntoDB,
  getMeService,
} from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMe = catchAsync(async (req: any) => {
  const { userId, role } = req.user;
  return await getMeService(userId, role);
}, "Get your data successfully");

// change user status-------------------------->
export const changeUserStatus = catchAsync(async (req) => {
  const id = req.params.id;
  const data = req.body;
  return await changeStatusService(id, data);
}, "Successfully change user status");
