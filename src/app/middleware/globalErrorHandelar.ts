import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSourses } from "../../interface/error";
import { handleZodError } from "../error/custom.zodError";
import { handleValidationError } from "../error/custom.validationError";
import config from "../config";
import { handleCastError } from "../error/custom.castError";
import { handleDuplicateError } from "../error/custom.duplicateError";
import { appError } from "../error/custom.appError";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = "something went wrong";

  let errorSourses: TErrorSourses = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    //zod error
    const simplefied = handleZodError(err);
    statusCode = simplefied?.statusCode;
    message = simplefied?.message;
    errorSourses = simplefied?.errorSourses;
  } else if (err?.name === "ValidationError") {
    //mongoose validation error
    const simplefied = handleValidationError(err);
    statusCode = simplefied?.statusCode;
    message = simplefied?.message;
    errorSourses = simplefied?.errorSourses;
  } else if (err?.name === "CastError") {
    //cast error
    const simplefied = handleCastError(err);
    statusCode = simplefied?.statusCode;
    message = simplefied?.message;
    errorSourses = simplefied?.errorSourses;
  } else if (err?.code === 11000) {
    //duplicate error
    const simplefied = handleDuplicateError(err);
    statusCode = simplefied?.statusCode;
    message = simplefied?.message;
    errorSourses = simplefied?.errorSourses;
  } else if (err instanceof appError) {
    //app error
    statusCode = err?.statusCode;
    message = err?.message;
    errorSourses = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    //app error
    message = err?.message;
    errorSourses = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
    errorSourses,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
  next();
};
