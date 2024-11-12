import mongoose from "mongoose";
import config from "../../config";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/students.interface";
import { StudentModelSchema } from "../students/students.model";
import { TUser } from "./user.interface";
import { userModelSchema } from "./user.model";
import {
  generatedAdminId,
  generatedFacultyId,
  generatedStudentId,
} from "./user.utils";
import { appError } from "../../error/custom.appError";
import { TFaculty } from "../faculty/faculty.interface";
import { FacultyModelSchema } from "../faculty/faculty.model";
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { TAdmin } from "../admin/admin.interface";
import { AdminModelSchema } from "../admin/admin.model";

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
    session.startTransaction(); /*start the transaction*/
    // set the generated id
    if (admissionSemester) {
      userData.id = await generatedStudentId(admissionSemester);
    } else {
      throw new Error("Create admissionSemester first");
    }

    // create a user (transaction-1)
    const newUser = await userModelSchema.create([userData], {
      session,
    }); /*session pathan*/ /*transaction ert jonno [ ] er babohar kora hoice*/

    // create a student
    if (!newUser.length) {
      throw new appError(400, "Failed to create user");
    }
    // add id and _id
    payload.id = newUser[0].id; //embedding id
    payload.user = newUser[0]._id; //referencing id

    // create student transaction-2

    const newStudent = await StudentModelSchema.create([payload], {
      session,
    }); /*session phathano*/ /*transaction ert jonno [ ] er babohar kora hoice*/

    if (!newStudent.length) {
      throw new appError(400, "Failed to create user");
    }

    // of this transaction
    await session.commitTransaction(); /*successful hole commit kora*/
    await session.endSession(); /*session send kora*/
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction(); /*faield hole transaction off kora*/
    await session.endSession(); /*session send kora*/
    throw new appError(400, "User not create");
  }
};

// create faculty--------------->
export const createFacultyIntoDB = async (
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await academicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new appError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generatedFacultyId();

    // create a user (transaction-1)
    const newUser = await userModelSchema.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new appError(400, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await FacultyModelSchema.create([payload], { session });

    if (!newFaculty.length) {
      throw new appError(400, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// create-admin-with-user-------------------------------->
export const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a admin object
  const userData: Partial<TUser> = {};
  // if password does not given from client site give a default password
  userData.password = password || (config.default_pass as string);
  // set admin role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generatedAdminId();

    // create a user(transaction-1)
    const newUser = await userModelSchema.create([userData], { session });
    // check was user create
    if (!newUser.length) {
      throw new appError(400, "Faield to create user");
    }
    // set id ,_id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // create faculty(transaction-2)
    const newAdmin = await AdminModelSchema.create([payload], { session });
    // check was admin create
    if (!newAdmin) {
      throw new appError(400, "Faield to create admin");
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
