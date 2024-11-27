import { z } from "zod";

export const authLoginValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "Please enter your new password" }),
  }),
});

export const authTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required zod error",
    }),
  }),
});

export const forgetPasswordValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
  }),
});
