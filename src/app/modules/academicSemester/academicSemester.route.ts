import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  academicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from "./academicSemesterValidation";
import {
  createAcademicSemester,
  getAllAcademicSemesterData,
  getASingleAcademicSemesterData,
  updateAcademicSemester,
} from "./academicSemester,controller";
import { auth } from "../../middleware/authMiddleware";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// create academicSemester------------------------------->
router.post(
  "/create-academicSemester",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(academicSemesterValidationSchema),
  createAcademicSemester,
);

// get all semester data--------------------------------->
router.get(
  "/get-all-semester-data",
  auth("student", "admin", "faculty", "superAdmin"),
  getAllAcademicSemesterData,
);

// get a semester data--------------------------------->
router.get(
  "/:semesterId",
  auth("student", "admin", "faculty", "superAdmin"),
  getASingleAcademicSemesterData,
);

// update a semester data--------------------------------->
router.patch(
  "/:semesterId",
  validateRequest(updateAcademicSemesterValidationSchema),
  auth("admin", "superAdmin"),
  updateAcademicSemester,
);

export const academicSemesterRoutes = router;
