import { TFaculty } from "./faculty.interface";
import { FacultyModelSchema } from "./faculty.model";

// create faculty--------------->
export const createFacultyIntoDB = async (payload: TFaculty) => {
  const result = await FacultyModelSchema.create(payload);
  return result;
};

// get faculty------------------>
export const getAllFacultyIntoDB = async () => {
  const result = await FacultyModelSchema.find();
  return result;
};

// get a single faculty------------------>
export const getASingleFacultyIntoDB = async (id: string) => {
  const result = await FacultyModelSchema.findOne({ id });
  return result;
};

// get a single faculty and update------------------>
export const updateFacultyIntoDB = async (
  payload: Partial<TFaculty>,
  id: string,
) => {
  const result = await FacultyModelSchema.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

// get a single faculty and delete------------------>
export const deleteFacultyIntoDB = async (id: string) => {
  const result = await FacultyModelSchema.findOneAndUpdate({ id });
  return result;
};
