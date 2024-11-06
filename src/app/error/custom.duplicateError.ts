import TGenericErrorResponse, { TErrorSourses } from "../../interface/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;

  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSourses: TErrorSourses = [
    {
      path: "",
      message: `${extractedMessage} is alredy exists`,
    },
  ];

  return {
    statusCode,
    message: "Invalied Id",
    errorSourses,
  };
};
