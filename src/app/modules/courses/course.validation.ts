import { z } from "zod";

export const preRequisiteCoursesValidationOnCreate = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false),
});

export const validationCourseZodOnCreate = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional().default(false),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationOnCreate)
      .optional(),
  }),
});

export const courseFacultyValidation = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const validationCourseZodOnUpdate =
  validationCourseZodOnCreate.partial();
