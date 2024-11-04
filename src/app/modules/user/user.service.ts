import mongoose from "mongoose";
import config from "../../config";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/students.interface";
import { StudentModelSchema } from "../students/students.model";
import { TUser } from "./user.interface";
import { userModelSchema } from "./user.model";
import { generatedStudentId } from "./user.utils";
import { appError } from "../../error/custom.appError";

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

  const session = await mongoose.startSession(); /*create session*/

  try {
    session.startTransaction(); /*start the transection*/
    // set the generated id
    if (admissionSemester) {
      userData.id = await generatedStudentId(admissionSemester);
    } else {
      throw new Error("Create admissionSemester first");
    }

    // create a user (transection-1)
    const newUser = await userModelSchema.create([userData], {
      session,
    }); /*session phathano*/ /*transection ert jonno [ ] er babohar kora hoice*/

    // create a student
    if (!newUser.length) {
      throw new appError(400, "Faield to create user");
    }
    // add id and _id
    payload.id = newUser[0].id; //embedding id
    payload.user = newUser[0]._id; //referencing id

    // create student transection-2

    const newStudent = await StudentModelSchema.create([payload], {
      session,
    }); /*session phathano*/ /*transection ert jonno [ ] er babohar kora hoice*/

    if (!newStudent.length) {
      throw new appError(400, "Faield to create user");
    }

    // of this transection
    await session.commitTransaction(); /*successful hole commit kora*/
    await session.endSession(); /*session send kora*/
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction(); /*faield hole transection off kora*/
    await session.endSession(); /*session send kora*/
    throw new appError(400, "User not create");
  }
};
