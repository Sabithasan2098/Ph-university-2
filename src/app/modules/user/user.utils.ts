import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { userModelSchema } from "./user.model";

const lastStudentId = async () => {
  const lastStudent = await userModelSchema
    .findOne(
      {
        role: "student",
      },
      {
        id: 1,
        _id: 0,
      },
    )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generatedStudentId =async (payload: TAcademicSemester) => {
  // get the current id
  const currentId =(await lastStudentId()) || (0).toString();
  // incrementId
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  // set the id
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
