import { appError } from "../../error/custom.appError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterModel } from "./academicSemester.model";

// create academic semester------------------------------>
export const createAcademicSemesterIntoDB = async (
  payload: TAcademicSemester,
) => {
  // check is academic semester name and code are ok to proceed
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new appError(400, "Invalid AcademicSemester name or code");
  }
  const result = await academicSemesterModel.create(payload);
  return result;
};

// get all academic semester----------------------------->
export const getAllAcademicSemesterIntoDB = async () => {
  const result = await academicSemesterModel.find();
  return result;
};

// get a academic semester----------------------------->
export const getASingleAcademicSemesterIntoDB = async (id: string) => {
  const result = await academicSemesterModel.findById({ _id: id });
  return result;
};

// get a academic semester & update----------------------------->
export const updateASingleAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new appError(400, "Invalid semester code");
  }
  const result = await academicSemesterModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
