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
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationOnCreate)
      .optional(),
  }),
});
