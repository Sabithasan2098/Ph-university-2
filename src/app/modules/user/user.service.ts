/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
// import jwt, { JwtPayload } from "jsonwebtoken";

// create a student------------------------------------->
export const createStudentIntoDB = async (
  password: string,
  payload: TStudent,
  ImgFile: any,
) => {
  // create a user obj
  const userData: Partial<TUser> = {};

  // if password was not given use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = "student";
  userData.email = payload.email;

  // find the admissionSemester info
  const admissionSemester = await academicSemesterModel.findById(
    payload.admissionSemester,
  );

  // find academic department info
  const academicDepartment = await academicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new appError(400, "Academic department not found");
  }
  // set academicFaculty into payload
  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession(); /*create session*/

  try {
    session.startTransaction(); /*start the transaction*/
    // set the generated id
    if (admissionSemester) {
      userData.id = await generatedStudentId(admissionSemester);
    } else {
      throw new Error("Create admissionSemester first");
    }
    // send image to cloudinary------------------->
    // image is optional
    if (ImgFile) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = ImgFile.path;
      const profileImg = await sendImageToCloudinary(imageName, path);
      const { secure_url } = profileImg;
      payload.profilePicture = secure_url;
    }
    // --------------------------------------------//
    // create a user (transaction-1)
    console.log({ userData });
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
      throw new appError(400, "Failed to create student");
    }

    // of this transaction
    await session.commitTransaction(); /*successful hole commit kora*/
    await session.endSession(); /*session send kora*/
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction(); /*faield hole transaction off kora*/
    await session.endSession(); /*session send kora*/
    throw new Error(error);
  }
};

// create faculty--------------->
export const createFacultyIntoDB = async (
  password: string,
  payload: TFaculty,
  ImgFile: any,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "faculty";
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await academicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new appError(400, "Academic department not found");
  }

  // get the the academicFaculty and add to payload
  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generatedFacultyId();

    // send image to cloudinary------------------->
    // image is optional
    if (ImgFile) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = ImgFile.path;
      const profileImg = await sendImageToCloudinary(imageName, path);
      const { secure_url } = profileImg;
      payload.profileImg = secure_url;
    }
    // --------------------------------------------//

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
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// create-admin-with-user-------------------------------->
export const createAdminIntoDB = async (
  password: string,
  payload: TAdmin,
  ImgFile: any,
) => {
  // create a admin object
  const userData: Partial<TUser> = {};
  // if password does not given from client site give a default password
  userData.password = password || (config.default_pass as string);
  // set admin role
  userData.role = "admin";
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generatedAdminId();

    // send image to cloudinary------------------->
    // image is optional
    if (ImgFile) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = ImgFile.path;
      const profileImg = await sendImageToCloudinary(imageName, path);
      const { secure_url } = profileImg;
      payload.profileImg = secure_url;
    }
    // --------------------------------------------//

    // create a user(transaction-1)
    const newUser = await userModelSchema.create([userData], { session });
    // check was user create
    if (!newUser.length) {
      throw new appError(400, "Faield to create user");
    }
    // set id ,_id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // create admin(transaction-2)
    const newAdmin = await AdminModelSchema.create([payload], { session });
    // check was admin create
    if (!newAdmin) {
      throw new appError(400, "Faield to create admin");
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

// get-me------------------------------------------------------->
export const getMeService = async (userId: string, role: string) => {
  // const decoded = jwt.verify(token, config.jwt_token as string) as JwtPayload;
  // console.log(decoded);
  // const { role, userId } = decoded;
  let result = null;

  if (role === "admin") {
    result = await AdminModelSchema.findOne({ id: userId }).populate("user");
  } else if (role === "faculty") {
    result = await FacultyModelSchema.findOne({ id: userId }).populate("user");
  } else if (role === "student") {
    result = await StudentModelSchema.findOne({ id: userId }).populate("user");
  }
  return result;
};

// change user status------------------------------------------>
export const changeStatusService = async (
  id: string,
  data: { status: string },
) => {
  return await userModelSchema.findByIdAndUpdate(id, data, { new: true });
};
