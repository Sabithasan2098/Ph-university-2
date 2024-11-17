import { catchAsync } from "../../utils/catchAsync";
import { createSemesterRegistrationIntoDB } from "./semesterRegistration.service";

export const createSemesterRegistration = catchAsync(async (req) => {
  return await createSemesterRegistrationIntoDB(req.body);
}, "Create semester registration successfully");
