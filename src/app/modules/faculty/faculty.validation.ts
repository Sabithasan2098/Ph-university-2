import { z } from "zod";

const facultyNameValidation = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First Name must be at least 1 character" })
    .max(20, { message: "First name can not be more than 20 character" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First name must start with a capital letter",
    }),
  middleName: z.string().trim(),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name must be at least 1 character" })
    .max(20, { message: "Last name can not be more than 20 character" }),
});

export const facultyValidationSchemaZodOnCreate = z.object({
  body: z.object({
    password: z
      .string()
      .min(8, { message: "Password must be contain at lest 8 character" })
      .max(20, "Don't contain password more than 20"),
    faculty: z.object({
      designation: z
        .string()
        .trim()
        .min(1, { message: "Designation must be at least 1 character " }),
      name: facultyNameValidation,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .trim()
        .email({ message: "Invalid email address" })
        .min(1, { message: "email is not be empty" }),
      contactNumber: z
        .string()
        .trim()
        .min(1, { message: "Contact number is not be an empty" }),
      emergencyContactNumber: z
        .string()
        .trim()
        .min(1, { message: "Emergency contact number is not be am empty" }),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional()
        .default("A+"),
      presentAddress: z
        .string()
        .trim()
        .min(1, { message: "Present address is not be an empty" }),
      permanentAddress: z
        .string()
        .trim()
        .min(1, { message: "Permanent address is not be an empty" }),
      profileImg: z.string().trim().optional(),
      academicDepartment: z.string(),
    }),
  }),
});

// for-update--------------------->

const facultyNameValidationUpdate = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First Name must be at least 1 character" })
    .max(20, { message: "First name cannot be more than 20 characters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First name must start with a capital letter",
    })
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name must be at least 1 character" })
    .max(20, { message: "Last name cannot be more than 20 characters" })
    .optional(),
});

export const facultyValidationSchemaZodOnUpdate = z.object({
  body: z.object({
    password: z
      .string()
      .min(8, { message: "Password must be contain at lest 8 character" })
      .max(20, "Don't contain password more than 20")
      .optional(),
    faculty: z.object({
      designation: z
        .string()
        .trim()
        .min(1, { message: "Designation must be at least 1 character" })
        .optional(),
      name: facultyNameValidationUpdate.optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .trim()
        .email({ message: "Invalid email address" })
        .optional(),
      contactNumber: z.string().trim().optional(),
      emergencyContactNumber: z.string().trim().optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().trim().optional(),
      permanentAddress: z.string().trim().optional(),
      profileImg: z.string().trim().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});
