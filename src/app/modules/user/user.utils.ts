import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AdminModelSchema } from "../admin/admin.model";
import { userModelSchema } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await userModelSchema
    .findOne(
      {
        role: "student",
      },
      {
        id: 1,
        _id: 0,
      },
    )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedStudentId = async (payload: TAcademicSemester) => {
  // get the current id
  let currentId = (0).toString(); //default id

  // match year and code to payload year,code
  const lastStudentId = await findLastStudentId();
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);
  const currentStudentYear = payload?.year;
  const currentStudentCode = payload?.code;

  if (
    lastStudentId &&
    lastStudentYear === currentStudentYear &&
    lastStudentCode === currentStudentCode
  ) {
    currentId = lastStudentId.substring(6);
  }

  // incrementId
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  // set the id
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

// find last faculty------------->

const findLastFacultyId = async () => {
  const lastFaculty = await userModelSchema
    .findOne(
      {
        role: "faculty",
      },
      {
        id: 1,
        _id: 0,
      },
    )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generatedFacultyId = async () => {
  // get the current id
  let currentId = (0).toString(); //default id

  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  // incrementId
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  // set the id
  incrementId = `F-${incrementId}`;
  return incrementId;
};

// find last admin
const findLastAdminId = async () => {
  const lastAdmin = await AdminModelSchema.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastAdmin?.id ? lastAdmin.id : undefined;
};

// set generated id
export const generatedAdminId = async () => {
  let currentId = (0).toString();
  const facultyId = await findLastAdminId();
  if (facultyId) {
    currentId = facultyId.substring(2);
  }
  // increment
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `A-${incrementId}`;
  return incrementId;
};
