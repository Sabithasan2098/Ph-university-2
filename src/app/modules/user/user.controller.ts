import { createStudentIntoDB } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";


                                                          /*use higher order function*/ 


//create a student--------------------------------->
export const createStudent = catchAsync(async (req) => {
  const { password, student: studentData } = req.body;
  return createStudentIntoDB(password, studentData);
}, "Create student successfully");
