import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterModel } from "./academicSemester.model";

export const createAcademicSemesterIntoDB =async (payload:TAcademicSemester) =>{
    const result = await academicSemesterModel.create(payload);
    return result
}