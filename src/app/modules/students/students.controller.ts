import { Request, Response } from "express";
import {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getAStudentDataByIdFromDB,
} from "./students.service";

//create a student--------------------------------->
export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    const result = await createStudentIntoDB(student);
    res.status(200).json({
      success: true,
      message: "created student successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

// get all students from DB------------------------>
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
    console.log(error);
  }
};
