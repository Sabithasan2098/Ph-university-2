import { catchAsync } from "../../utils/catchAsync";
import {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterIntoDB,
  getASingleAcademicSemesterIntoDB,
  updateASingleAcademicSemesterIntoDB,
} from "./academicSemester.service";

//create a student--------------------------------->
export const createAcademicSemester = catchAsync(async (req) => {
  return createAcademicSemesterIntoDB(req.body);
}, "Create AcademicSemester was successful");

// get all semester data--------------------------->
export const getAllAcademicSemesterData = catchAsync(
  getAllAcademicSemesterIntoDB,
  "Get all academic semester data successful",
);

// get a semester data--------------------------->
export const getASingleAcademicSemesterData =catchAsync(async(req) =>{
  const semesterId = req.params.semesterId
  return getASingleAcademicSemesterIntoDB(semesterId)
},"Get a single semester data successful")

// update semester data-------------------------->
export const updateAcademicSemester = catchAsync(async(req) =>{
  const semesterId = req.params.semesterId
  const updateData = req.body
  return updateASingleAcademicSemesterIntoDB(semesterId,updateData) 
},"Update successfully")