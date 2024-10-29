import { NextFunction, Request, Response } from "express";
import { createStudentIntoDB } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

//create a student--------------------------------->
export const createStudent = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const {password,student:studentData} = req.body;
  
      // zod validation--------->
      // const zodValidationData = studentValidationSchemaZodOnCreate.parse(student);
      const result = await createStudentIntoDB(password,studentData);
      sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Student created successfully",
        data:result
      })
    } catch (error) {
     next(error)
    }
  };