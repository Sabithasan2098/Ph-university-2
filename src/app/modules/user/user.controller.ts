import { Request, Response } from "express";
import { createStudentIntoDB } from "./user.service";

//create a student--------------------------------->
export const createStudent = async (req: Request, res: Response) => {
    try {
      const {password,student:studentData} = req.body;
  
      // zod validation--------->
      // const zodValidationData = studentValidationSchemaZodOnCreate.parse(student);
      const result = await createStudentIntoDB(password,studentData);
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