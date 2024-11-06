import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSourses } from "../../interface/error";
import { handleZodError } from "../error/custom.zodError";
import { handleValidationError } from "../error/custom.validationError";

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

  if (err instanceof ZodError) {
    const simplefied = handleZodError(err);
    statusCode = simplefied?.statusCode;
    message = simplefied?.message;
    errorSourses = simplefied?.errorSourses;
  } else if (err?.name === "ValidationError") {
    const simplefied = handleValidationError(err);
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
