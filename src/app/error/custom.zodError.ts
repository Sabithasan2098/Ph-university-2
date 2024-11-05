import { ZodError, ZodIssue } from "zod";
import { TErrorSourses } from "../../interface/error";
import config from "../config";

export const handleZodError = (err: ZodError) => {
  const statusCode = 400;

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
