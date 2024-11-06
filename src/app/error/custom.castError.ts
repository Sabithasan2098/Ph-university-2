import mongoose from "mongoose";
import TGenericErrorResponse, { TErrorSourses } from "../../interface/error";

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;

  const errorSourses: TErrorSourses = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode,
    message: "Invalied Id",
    errorSourses,
  };
};
