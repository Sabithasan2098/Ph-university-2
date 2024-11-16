import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { validationCourseZodOnCreate } from "./course.validation";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
} from "./course.controller";

const router = express.Router();

// create course------------------------------->
router.post(
  "/create-course",
  validateRequest(validationCourseZodOnCreate),
  createCourse,
);

// get all course data--------------------------------->
router.get("/get-all-course-data", getAllCourse);

// get a course data--------------------------------->
router.get("/:id", getSingleCourse);

// delete a course data--------------------------------->
router.delete("/:id", deleteCourse);

export const courseRoutes = router;
