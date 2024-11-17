import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  courseFacultyValidation,
  validationCourseZodOnCreate,
  validationCourseZodOnUpdate,
} from "./course.validation";
import {
  assignFaculties,
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
  removeFaculties,
  updateCourse,
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

// update a course data--------------------------------->
router.patch(
  "/:id",
  validateRequest(validationCourseZodOnUpdate),
  updateCourse,
);

// add faculties into course--------------------------->
router.put(
  "/:courseId/faculties",
  validateRequest(courseFacultyValidation),
  assignFaculties,
);

// remove faculties into course--------------------------->
router.delete(
  "/:courseId/remove-faculties",
  validateRequest(courseFacultyValidation),
  removeFaculties,
);

export const courseRoutes = router;
