import { z } from "zod";

export const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(8, { message: "Password must be contain at lest 8 character" })
    .max(20, "Don't contain password more than 20")
    .optional(),
});
