import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterModel } from "./academicSemester.model";

export const createAcademicSemesterIntoDB =async (payload:TAcademicSemester) =>{

    // check is academic semester name and code are ok to proceed
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid AcademicSemester name or code");
      }
    const result = await academicSemesterModel.create(payload);
    return result
}