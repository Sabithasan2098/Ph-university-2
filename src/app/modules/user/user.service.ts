import config from "../../config";
import { TStudent } from "../students/students.interface";
import { StudentModelSchema } from "../students/students.model";
import { TUser } from "./user.interface";
import { userModelSchema } from "./user.model";

// create a student------------------------------------->
export const createStudentIntoDB = async (
  password: string,
  studentData: TStudent,
) => {
  // create a user obj
  const userData: Partial<TUser> = {};

  // if password was not given use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = "student";

  //  set manually generated id
  userData.id = "2030100001";

  // create a user
  const newUser = await userModelSchema.create(userData);
 
  // create a student
  if(Object.keys(newUser).length){
    // add id and _id
    studentData.id = newUser.id  //embedding id
    studentData.user = newUser._id //referencing id

    const newStudent = StudentModelSchema.create(studentData)
    return newStudent
  }

};
