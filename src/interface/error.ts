export type TErrorSourses = {
  path: string | number;
  message: string;
}[];

type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSourses: TErrorSourses;
};
export default TGenericErrorResponse;
