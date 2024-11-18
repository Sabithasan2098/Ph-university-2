import { catchAsync } from "../../utils/catchAsync";
import {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationIntoDB,
  updateSingleSemesterRegistrationIntoDB,
} from "./semesterRegistration.service";

export const createSemesterRegistration = catchAsync(async (req) => {
  return await createSemesterRegistrationIntoDB(req.body);
}, "Create semester registration successfully");

// get all semesterRegister------------------->
export const getAllSemesterRegister = catchAsync(async (req) => {
  return await getAllSemesterRegistrationIntoDB(req.body);
}, "Get all data successfully");

// get single semesterRegister------------------->
export const getSingleSemesterRegistration = catchAsync(async (req) => {
  const { id } = req.params;
  return await getSingleSemesterRegistrationIntoDB(id);
}, "Get single data successfully");

// get single semesterRegister------------------->
export const updateSingleSemesterRegistration = catchAsync(async (req) => {
  const { id } = req.params;
  return await updateSingleSemesterRegistrationIntoDB(id, req.body);
}, "Update single data successfully");
