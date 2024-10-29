import { NextFunction, Request, Response } from "express";
import {
  deleteAStudentDataByIdFromDB,
  getAllStudentsFromDB,
  getAStudentDataByIdFromDB,
} from "./students.service";
import { sendResponse } from "../../utils/sendResponse";

// get all students from DB------------------------>
export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAllStudentsFromDB();
    // res.status(200).json({
    //   success: true,
    //   message: "Successfully get all students data",
    //   data: result,
    // });
    sendResponse(res,{
      statusCode:200,
      success:true,
      message:"Student created successfully",
      data:result
    })
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
    sendResponse(res,{
      statusCode:200,
      success:true,
      message:"Student created successfully",
      data:result
    })
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
    sendResponse(res,{
      statusCode:200,
      success:true,
      message:"Student created successfully",
      data:result
    })
  } catch (error) {
    next(error);
  }
};
