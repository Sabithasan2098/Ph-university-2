import { z } from "zod";

export const authLoginValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const changePasswordValidation = z.object({
  body: z.object({
    odlPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "Please enter your new password" }),
  }),
});
