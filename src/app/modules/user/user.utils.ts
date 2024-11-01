import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

export const generatedStudentId = (payload: TAcademicSemester) => {
    // get the current id
    const currentId = (0).toString()
    // incrementId 
    let incrementId = (Number(currentId)+1).toString().padStart(4,"0")
    // set the id
    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId
};