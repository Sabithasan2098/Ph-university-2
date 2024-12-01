import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { enrolledCourseValidationSchema } from "./enrolledCourse.validation";
import { createEnrolledCourse } from "./enrolledCourse.controller";
import { auth } from "../../middleware/authMiddleware";
const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth("student"),
  validateRequest(enrolledCourseValidationSchema),
  createEnrolledCourse,
);

export const enrolledCourseRoutes = router;
