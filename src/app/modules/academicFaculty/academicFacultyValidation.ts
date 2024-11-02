import { z } from "zod";

export const academicFacultyValidation = z.object({
 body:z.object({
  name: z
  .string({invalid_type_error:"Faculty name must be a string"})
 })
});
export const UpdateAcademicFacultyValidation = z.object({
 body:z.object({
  name: z
  .string({invalid_type_error:"Faculty name must be a string"})
 })
});
