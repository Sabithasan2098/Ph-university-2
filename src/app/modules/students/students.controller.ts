import { RequestHandler } from "express";
import {
  deleteAStudentDataByIdFromDB,
  getAllStudentsFromDB,
  getAStudentDataByIdFromDB,
} from "./students.service";
import { sendResponse } from "../../utils/sendResponse";

// get all students from DB------------------------>
export const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get a students from DB------------------------>
export const getAStudent: RequestHandler = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const result = await getAStudentDataByIdFromDB(studentId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// delete a student from DB------------------------>
// actually we don't delete data just update a field
export const deleteAStudent: RequestHandler = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const result = await deleteAStudentDataByIdFromDB(studentId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
