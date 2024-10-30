
import {
  deleteAStudentDataByIdFromDB,
  getAllStudentsFromDB,
  getAStudentDataByIdFromDB,
} from "./students.service";
import { catchAsync } from "../../utils/catchAsync";


                                                          /*use higher order function*/ 


// get all students from DB------------------------>
export const getAllStudents = catchAsync(
  getAllStudentsFromDB,
  "Get all student successfully",
);

// get a students from DB------------------------>
export const getAStudent = catchAsync(async (req) => {
  const studentId = req.params.studentId;
  return getAStudentDataByIdFromDB(studentId);
}, "Student retrieve successfully");

// delete a student from DB------------------------>
// actually we don't delete data just update a field
export const deleteAStudent = catchAsync(async(req) =>{
  const studentId = req.params.studentId
  return deleteAStudentDataByIdFromDB(studentId)
},"Delete student data successfully")
