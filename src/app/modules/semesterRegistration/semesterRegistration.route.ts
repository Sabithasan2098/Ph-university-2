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
router.get("/get-all-semesterRegistration-data", getAllSemesterRegister);

// get a course data--------------------------------->
router.get("/:id", getSingleSemesterRegistration);

// update a semesterRegistration data--------------------------------->
router.patch(
  "/:id",
  validateRequest(updateSemesterRegistrationValidationZodOnCreate),
  updateSingleSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
