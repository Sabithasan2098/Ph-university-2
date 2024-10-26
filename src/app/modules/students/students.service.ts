import { IStudent } from "./students.interface";
import { StudentModelSchema } from "./students.model";

// create a student------------------------------------->
export const createStudentIntoDB = async (studentData: IStudent) => {
  // const result = await StudentModel.create(student);

  // create a instance method to don't post ant existing user--------->
  const student = new StudentModelSchema(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error("Student already exists");
  }
  const result = await student.save();
  return result;
};

// get all students------------------------------------->
export const getAllStudentsFromDB = async () => {
  const result = await StudentModelSchema.find();
  return result;
};

// get a single student data---------------------------->
export const getAStudentDataByIdFromDB = async (id: string) => {
  const result = await StudentModelSchema.findOne({ id });
  return result;
};
