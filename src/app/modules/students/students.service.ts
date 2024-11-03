import { StudentModelSchema } from "./students.model";

// get all students------------------------------------->
export const getAllStudentsFromDB = async () => {
  const result = await StudentModelSchema.find().populate("admissionSemester");
  return result;
};

// get a single student data---------------------------->
export const getAStudentDataByIdFromDB = async (id: string) => {
  const result = await StudentModelSchema.findOne({ id }).populate(
    "admissionSemester",
  );
  // const result = await StudentModelSchema.aggregate([{ $match: { id: id } }]);
  return result;
};

// get a single student data---------------------------->
// actually we don't delete data just update a field
export const deleteAStudentDataByIdFromDB = async (id: string) => {
  const result = await StudentModelSchema.updateOne(
    { id },
    { isDeleted: true },
  );
  return result;
};
