import mongoose from "mongoose";
import TGenericErrorResponse, { TErrorSourses } from "../../interface/error";

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
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
  };
};
