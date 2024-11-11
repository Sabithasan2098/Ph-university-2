import express from "express";
import { createFaculty, createStudent } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { studentValidationSchemaZodOnCreate } from "../students/students.validation";
import { facultyValidationSchemaZodOnCreate } from "../faculty/faculty.validation";

const router = express.Router();

// post a student data----------------------------------->
router.post(
  "/create-student",
  validateRequest(studentValidationSchemaZodOnCreate),
  createStudent,
);

// post a faculty------------->
router.post(
  "/create-faculty",
  validateRequest(facultyValidationSchemaZodOnCreate),
  createFaculty,
);

export const usersRoutes = router;
