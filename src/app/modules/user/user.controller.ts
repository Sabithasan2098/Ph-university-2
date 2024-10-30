import {RequestHandler } from "express";
import { createStudentIntoDB } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

//create a student--------------------------------->
export const createStudent:RequestHandler = async (req, res,next) => {
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