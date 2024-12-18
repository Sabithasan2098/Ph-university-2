import { z } from "zod";

export const semesterRegistrationValidationZodOnCreate = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(["UPCOMING", "ONGOING", "ENDED"]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

export const updateSemesterRegistrationValidationZodOnCreate = z.object({
  body: semesterRegistrationValidationZodOnCreate.shape.body.partial(),
});
