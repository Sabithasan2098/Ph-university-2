import {
  deleteAStudentDataByIdFromDB,
  getAllStudentsFromDB,
  getAStudentDataByIdFromDB,
  updateAStudentDataByIdFromDB,
} from "./students.service";
import { catchAsync } from "../../utils/catchAsync";

/*use higher order function*/

// get all students from DB------------------------>
export const getAllStudents = catchAsync(async (req) => {
  return await getAllStudentsFromDB(req.query);
}, "Get all student successfully");

// get a students from DB------------------------>
export const getAStudent = catchAsync(async (req) => {
  const studentId = req.params.studentId;
  return await getAStudentDataByIdFromDB(studentId);
}, "Student retrieve successfully");

// update a students from DB------------------------>
export const updateAStudent = catchAsync(async (req) => {
  const studentId = req.params.studentId;
  const { student } = req.body;
  return await updateAStudentDataByIdFromDB(studentId, student);
}, "Student update successfully");

// delete a student from DB------------------------>
// actually we don't delete data just update a field
export const deleteAStudent = catchAsync(async (req) => {
  const studentId = req.params.studentId;
  return await deleteAStudentDataByIdFromDB(studentId);
}, "Delete student data successfully");
