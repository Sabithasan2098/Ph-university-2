import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Helper function to compare times
const isStartTimeBeforeEndTime = (startTime: string, endTime: string) => {
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  return start < end;
};

export const offeredCourseValidation = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"])),
      startTime: z.string().refine((value) => timeRegex.test(value), {
        message: "Invalid time format. Use HH:mm.",
      }),
      endTime: z.string().refine((value) => timeRegex.test(value), {
        message: "Invalid time format. Use HH:mm.",
      }),
    })
    .refine((data) => isStartTimeBeforeEndTime(data.startTime, data.endTime), {
      message: "Start time must be earlier than end time.",
      path: ["startTime"], // Error will point to `startTime`
    }),
});

export const offeredCourseValidationOnUpdate = z.object({
  body: z
    .object({
      maxCapacity: z.number().optional(),
      section: z.number().optional(),
      days: z
        .enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"])
        .optional(),
      startTime: z
        .string()
        .refine((value) => timeRegex.test(value), {
          message: "Invalid time format. Use HH:mm.",
        })
        .optional(),
      endTime: z
        .string()
        .refine((value) => timeRegex.test(value), {
          message: "Invalid time format. Use HH:mm.",
        })
        .optional(),
    })
    .refine(
      (data) =>
        !data.startTime ||
        !data.endTime || // Allow partial updates
        isStartTimeBeforeEndTime(data.startTime, data.endTime),
      {
        message: "Start time must be earlier than end time.",
        path: ["startTime"], // Error will point to `startTime`
      },
    ),
});
