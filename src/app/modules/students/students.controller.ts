import { Request, Response } from "express";
import {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getAStudentDataByIdFromDB,
} from "./students.service";
import { studentValidationSchemaZodOnCreate } from "./students.validation";

//create a student--------------------------------->
export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    // zod validation--------->
    const zodValidationData = studentValidationSchemaZodOnCreate.parse(student);
    const result = await createStudentIntoDB(zodValidationData);
    res.status(200).json({
      success: true,
      message: "created student successfully",
      data: result,
    });
  } catch (error:any) {
    res.status(200).json({
      success: false,
      message:error.message || "Something went wrong",
      data: error,
    });
  }
};

// get all students from DB------------------------>
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Successfully get all students data",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

// get a students from DB------------------------>
export const getAStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await getAStudentDataByIdFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Successfully get a single students data by id",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};
