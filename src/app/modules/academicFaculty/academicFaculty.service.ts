import { TAcademicFaculty } from "./academicFaculty.interface";
import { academicFacultyModel } from "./academicFaculty.model";

// create academicFaculty-------------------------------------------------->
export const createAcademicFacultyIntoDB = async (
  payload: TAcademicFaculty,
) => {
  const result = await academicFacultyModel.create(payload);
  return result;
};

// find all academicFaculty------------------------------------------------>
export const getAllAcademicFacultyFromDB = async () => {
  const result = await academicFacultyModel.find();
  return result;
};

// find a academicFaculty------------------------------------------------>
export const getAAcademicFacultyFromDB = async (id: string) => {
  const result = await academicFacultyModel.findById({_id:id});
  return result;
};

// update a academicFaculty------------------------------------------------>
export const updateAAcademicFacultyFromDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await academicFacultyModel.findByIdAndUpdate({_id:id}, payload, {
    new: true,
  });
  return result;
};
