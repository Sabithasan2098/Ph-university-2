import { appError } from "../../error/custom.appError";
import { handleQuery } from "../../utils/handleQuery";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";

export const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
  //   check if there are any UPCOMING || ONGOING status already exists or not
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new appError(
      400,
      `There is already ${isThereAnyUpcomingOrOngoingSemester.status} semester exists`,
    );
  }
  // first check academic semester exists or not
  const isAcademicSemesterExists =
    await academicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new appError(400, "This academic semester not found");
  }

  // check semester registration exists or not
  const isSemesterRegisterExists = await SemesterRegistrationModel.findOne({
    academicSemester: academicSemester,
  });
  if (isSemesterRegisterExists) {
    throw new appError(400, "This semester registration is already exists");
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

// get-all-semesterRegistration--------------------->

export const getAllSemesterRegistrationIntoDB = async (
  query: Record<string, unknown>,
) => {
  // create searchable field--------------->
  const searchAbleField = [
    "academicSemester",
    "status",
    "minCredit",
    "maxCredit",
  ];

  return await handleQuery(SemesterRegistrationModel, query, searchAbleField);
};

// get-single-semesterRegister------------------------>
export const getSingleSemesterRegistrationIntoDB = async (id: string) => {
  const result =
    await SemesterRegistrationModel.findById(id).populate("academicSemester");
  return result;
};

// update-single-semesterRegister------------------------>
export const updateSingleSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check is this data present or not
  const isSemesterExists = await SemesterRegistrationModel.findById(id);
  if (!isSemesterExists) {
    throw new appError(400, "This semester is not exists");
  }

  // if the semesterRegister was ended don't allow to update
  const currentSemesterStatus = isSemesterExists?.status;
  const SemesterStatus = payload.status;
  if (currentSemesterStatus === "ENDED") {
    throw new appError(
      400,
      `This semester is already ended so that you can't update this ${id}`,
    );
  }

  // semester status update flow--------------------------->
  // UPCOMING----->ONGOING----->ENDED
  if (currentSemesterStatus === "UPCOMING" && SemesterStatus === "ENDED") {
    throw new appError(
      400,
      `You can not update status ${currentSemesterStatus} to ${SemesterStatus}`,
    );
  }
  if (currentSemesterStatus === "ONGOING" && SemesterStatus === "UPCOMING") {
    throw new appError(
      400,
      `You can not update status ${currentSemesterStatus} to ${SemesterStatus}`,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  ).populate("academicSemester");
  return result;
};
