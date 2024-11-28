import { z } from "zod";
import { UserStatus } from "./user.constant";

export const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(8, { message: "Password must be contain at lest 8 character" })
    .max(20, "Don't contain password more than 20")
    .optional(),
});
// change status validation schema----------------------------------------->
export const changeStatusValidation = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
