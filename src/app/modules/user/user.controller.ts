import {
  createAdminIntoDB,
  createFacultyIntoDB,
  createStudentIntoDB,
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
