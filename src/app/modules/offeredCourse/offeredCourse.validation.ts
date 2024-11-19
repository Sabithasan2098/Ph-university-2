import { z } from "zod";

export const offeredCourseValidation = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"])),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const offeredCourseValidationOnUpdate = z.object({
  body: z.object({
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});
