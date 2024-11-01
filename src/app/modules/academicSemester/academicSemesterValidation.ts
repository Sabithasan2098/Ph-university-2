import { z } from "zod";
import { Code, Month, Name } from "./academicSemester.constant";

export const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...Name] as [string, ...string[]]),
    code: z.enum([...Code] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Month] as [string, ...string[]]),
    endMonth: z.enum([...Month] as [string, ...string[]]),
  }),
});

export const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...Name] as [string, ...string[]]).optional(),
    code: z.enum([...Code] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z.enum([...Month] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Month] as [string, ...string[]]).optional(),
  }),
});
