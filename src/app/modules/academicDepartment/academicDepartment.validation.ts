import { z } from "zod";

export const academicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Department name must be a string",
      required_error: "Name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "academic faculty must be a string",
      required_error: "academic faculty is required",
    }),
  }),
});
export const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Department name must be a string",
        required_error: "Name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "academic faculty must be a string",
        required_error: "academic faculty is required",
      })
      .optional(),
  }),
});
