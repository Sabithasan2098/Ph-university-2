import { z } from "zod";

export const userSchema = z.object({
    id: z.string().min(1, { message: "ID must not be empty" }),
    password: z
    .string()
    .min(8, { message: "Password must be contain at lest 8 character" })
    .max(20, "Don't contain password more than 20"),
    changePassword:z.boolean().optional().default(true),
    role:z.enum(["admin", "student", "user"]),
    status:z.enum(["in-progress", "blocked"]).default("in-progress"),
    isDeleted:z.boolean().optional().default(false)
})