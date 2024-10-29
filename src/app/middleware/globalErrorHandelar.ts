/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err:any,req:Request,res:Response,next:NextFunction) =>{
    const statusCode = 500;
    const message = err.message || "something went wrong";
  
    res.status(statusCode).json({
      success:false,
      message:message,
      error:err
    })
    next()
  }