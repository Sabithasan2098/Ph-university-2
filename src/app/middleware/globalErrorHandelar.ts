import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSourses } from "../../interface/error";
import config from "../config";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";

  let errorSourses: TErrorSourses = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  const handleZodError = (err: ZodError) => {
    statusCode = 400;

    const errorSourses: TErrorSourses = err.issues.map((issues: ZodIssue) => {
      return {
        path: issues?.path[issues.path.length - 1],
        message: issues?.message,
      };
    });

    return {
      statusCode,
      message: "Validation error",
      errorSourses,
      stack: config.NODE_ENV === "development" ? err?.stack : null,
    };
  };

  if (err instanceof ZodError) {
    const simplefied = handleZodError(err);
    statusCode = simplefied?.statusCode;
    message = simplefied?.message;
    errorSourses = simplefied?.errorSourses;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    // error: err,
    errorSourses,
  });
  next();
};
