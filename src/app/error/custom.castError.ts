import mongoose from "mongoose";
import { TErrorSourses } from "../../interface/error";

export const handleCastError = (err: mongoose.Error.CastError) => {
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
