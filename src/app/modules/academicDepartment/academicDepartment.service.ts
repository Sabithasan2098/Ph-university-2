import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartmentModel } from "./academicDepartment.model";

// create academicDepartment-------------------------------------------------->
export const createAcademicDepartmentIntoDB = async (
  payload: TAcademicDepartment,
) => {
  const result = await academicDepartmentModel.create(payload);
  return result;
};

// find all academicDepartment------------------------------------------------>
export const getAllAcademicDepartmentFromDB = async () => {
  const result = await academicDepartmentModel
    .find()
    .populate("academicFaculty");
  return result;
};

// find a academicDepartment------------------------------------------------>
export const getAAcademicDepartmentFromDB = async (id: string) => {
  const result = await academicDepartmentModel
    .findById({ _id: id })
    .populate("academicFaculty");
  return result;
};

// update a academicDepartment------------------------------------------------>
export const updateAAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await academicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};
