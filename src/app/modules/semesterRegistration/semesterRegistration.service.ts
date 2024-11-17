import { appError } from "../../error/custom.appError";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";

export const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // first check academic semester exists or not
  const isAcademicSemesterExists =
    await academicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new appError(400, "This academic semester not found");
  }

  // check semester registration exists or not
  const isSemesterRegisterExists = await SemesterRegistrationModel.findOne({
    academicSemester: academicSemester,
  });
  if (isSemesterRegisterExists) {
    throw new appError(400, "This semester registration is already exists");
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};
