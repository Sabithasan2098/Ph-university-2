import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  enrolledCourseValidationSchema,
  updateEnrolledCourseMarksValidation,
} from "./enrolledCourse.validation";
import {
  createEnrolledCourse,
  getAllEnrolledCourses,
  updateEnrolledCourseMarks,
} from "./enrolledCourse.controller";
import { auth } from "../../middleware/authMiddleware";
const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth("student"),
  validateRequest(enrolledCourseValidationSchema),
  createEnrolledCourse,
);

// update marks
router.patch(
  "/update-enrolled-course-marks",
  auth("faculty"),
  validateRequest(updateEnrolledCourseMarksValidation),
  updateEnrolledCourseMarks,
);

// get all enrolled courses
router.get(
  "/get-all-enrolledCourses",
  auth("admin", "faculty"),
  getAllEnrolledCourses,
);

export const enrolledCourseRoutes = router;
