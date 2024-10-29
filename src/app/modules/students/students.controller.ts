import { NextFunction, Request, Response } from "express";
import {
  deleteAStudentDataByIdFromDB,
  getAllStudentsFromDB,
  getAStudentDataByIdFromDB,
} from "./students.service";

// get all students from DB------------------------>
export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Successfully get all students data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get a students from DB------------------------>
export const getAStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await getAStudentDataByIdFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Successfully get a single students data by id",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// delete a student from DB------------------------>
// actually we don't delete data just update a field
export const deleteAStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await deleteAStudentDataByIdFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Successfully delete a single student data by id",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
