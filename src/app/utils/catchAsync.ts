import { Request, RequestHandler } from "express";
import { sendResponse } from "./sendResponse";

// create a higher order function for controllers----------------------->

// define a type of the service function
type ServiceFunction<T> = (req:Request)=>Promise<T>

export const catchAsync = <T>(
  serviceFunction: ServiceFunction<T>,
  successMessage: string,
): RequestHandler => {
  return async (req, res, next) => {
    try {
      const result = await serviceFunction(req);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: successMessage,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
};
