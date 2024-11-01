import config from "../../config";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/students.interface";
import { StudentModelSchema } from "../students/students.model";
import { TUser } from "./user.interface";
import { userModelSchema } from "./user.model";
import { generatedStudentId } from "./user.utils";

// create a student------------------------------------->
export const createStudentIntoDB = async (
  password: string,
  payload: TStudent,
) => {
  // create a user obj
  const userData: Partial<TUser> = {};

  // if password was not given use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = "student";

  // find the admissionSemester info
  const admissionSemester = await academicSemesterModel.findById(
    payload.admissionSemester,
  );

  // set the generated id
  if (admissionSemester) {
  
    userData.id = generatedStudentId(admissionSemester);
  } else {
    throw new Error("Create admissionSemester first");
  }

  // create a user
  const newUser = await userModelSchema.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // add id and _id
    payload.id = newUser.id; //embedding id
    payload.user = newUser._id; //referencing id

    const newStudent = StudentModelSchema.create(payload);
    return newStudent;
  }
};
