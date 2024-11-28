import express from "express";
import {
  createAdmin,
  createFaculty,
  createStudent,
  getMe,
} from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { studentValidationSchemaZodOnCreate } from "../students/students.validation";
import { facultyValidationSchemaZodOnCreate } from "../faculty/faculty.validation";
import { adminValidationSchemaZodOnCreate } from "../admin/admin.validation";
import { auth } from "../../middleware/authMiddleware";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

// post a student data----------------------------------->
router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(studentValidationSchemaZodOnCreate),
  createStudent,
);

// post a faculty------------->
router.post(
  "/create-faculty",
  validateRequest(facultyValidationSchemaZodOnCreate),
  createFaculty,
);

// post a admin
router.post(
  "/create-admin",
  validateRequest(adminValidationSchemaZodOnCreate),
  createAdmin,
);

// get your own data------------------->
router.get("/me", auth("admin", "student", "faculty"), getMe);
export const usersRoutes = router;
