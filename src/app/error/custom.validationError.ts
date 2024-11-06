import mongoose from "mongoose";
import config from "../config";
import { TErrorSourses } from "../../interface/error";

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;

  const errorSourses: TErrorSourses = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );
  return {
    statusCode,
    message: "Validation error",
    errorSourses,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  };
};
