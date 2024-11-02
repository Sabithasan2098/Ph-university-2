import { z } from "zod";

export const academicFacultyValidation = z.object({
  name: z
    .string({invalid_type_error:"Faculty name must be a string"})
    .trim()
    .min(1, { message: "Faculty name must not be empty" }),
});
