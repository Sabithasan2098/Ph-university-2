import { catchAsync } from "../../utils/catchAsync";
import { createAcademicSemesterIntoDB } from "./academicSemester.service";

//create a student--------------------------------->
export const createAcademicSemester = catchAsync(async (req) => {
    return createAcademicSemesterIntoDB(req.body);
  }, "Create AcademicSemester was successful");
  