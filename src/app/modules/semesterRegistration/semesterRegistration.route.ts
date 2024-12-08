import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  semesterRegistrationValidationZodOnCreate,
  updateSemesterRegistrationValidationZodOnCreate,
} from "./semesterRegistration.validation";
import {
  createSemesterRegistration,
  getAllSemesterRegister,
  getSingleSemesterRegistration,
  updateSingleSemesterRegistration,
} from "./semesterRegistration.controller";
import { auth } from "../../middleware/authMiddleware";

const router = express.Router();

// create semester------------------------------->
router.post(
  "/create-semesterRegistration",
  auth("student", "superAdmin"),
  validateRequest(semesterRegistrationValidationZodOnCreate),
  createSemesterRegistration,
);

// get all course data--------------------------------->
router.get(
  "/get-all-semesterRegistration-data",
  auth("admin", "student", "faculty", "superAdmin"),
  getAllSemesterRegister,
);

// get a course data--------------------------------->
router.get(
  "/:id",
  auth("admin", "student", "faculty", "superAdmin"),
  getSingleSemesterRegistration,
);

// update a semesterRegistration data--------------------------------->
router.patch(
  "/:id",
  auth("admin", "superAdmin"),
  validateRequest(updateSemesterRegistrationValidationZodOnCreate),
  updateSingleSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
