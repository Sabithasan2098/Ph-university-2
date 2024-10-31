import { z } from "zod";
import { Code, Month, Name } from "./academicSemester.constant";

export const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...Name] as [string, ...string[]]),
    code: z.enum([...Code] as [string, ...string[]]),
    year: z.date(),
    startMonth: z.enum([...Month] as [string, ...string[]]),
    endMonth: z.enum([...Month] as [string, ...string[]]),
  }),
});
