import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  offeredCourseValidation,
  offeredCourseValidationOnUpdate,
} from "./offeredCourse.validation";
import {
  createOfferedCourse,
  deleteOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateSingleOfferedCourse,
} from "./offeredCourse.controller";

const router = express.Router();

// create course------------------------------->
router.post(
  "/create-offeredCourse",
  validateRequest(offeredCourseValidation),
  createOfferedCourse,
);

// get all course data--------------------------------->
router.get("/get-all-offeredCourse-data", getAllOfferedCourse);

// get a course data--------------------------------->
router.get("/:id", getSingleOfferedCourse);

// delete a offeredCourse data--------------------------------->
router.delete("/:id", deleteOfferedCourse);

// update a semesterRegistration data--------------------------------->
router.patch(
  "/:id",
  validateRequest(offeredCourseValidationOnUpdate),
  updateSingleOfferedCourse,
);

export const offeredCourseRoutes = router;
