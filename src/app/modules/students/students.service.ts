import { IStudent } from "./students.interface";
import { StudentModel } from "./students.model";

// create a student------------------------------------->
export const createStudentIntoDB = async (student: IStudent) => {
  const result = await StudentModel.create(student);
  return result;
};

// get all students------------------------------------->
export const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// get a single student data---------------------------->
export const getAStudentDataByIdFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
