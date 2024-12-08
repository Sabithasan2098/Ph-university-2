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
  getAssignFaculties,
  getSingleCourse,
  removeFaculties,
  updateCourse,
} from "./course.controller";
import { auth } from "../../middleware/authMiddleware";

const router = express.Router();

// create course------------------------------->
router.post(
  "/create-course",
  auth("admin", "superAdmin"),
  validateRequest(validationCourseZodOnCreate),
  createCourse,
);

// get all course data--------------------------------->
router.get(
  "/get-all-course-data",
  auth("admin", "faculty", "student", "superAdmin"),
  getAllCourse,
);

// get a course data--------------------------------->
router.get(
  "/:id",
  auth("admin", "faculty", "student", "superAdmin"),
  getSingleCourse,
);

// delete a course data--------------------------------->
router.delete("/:id", auth("admin", "superAdmin"), deleteCourse);

// update a course data--------------------------------->
router.patch(
  "/:id",
  auth("admin", "superAdmin"),
  validateRequest(validationCourseZodOnUpdate),
  updateCourse,
);

// add faculties into course--------------------------->
router.put(
  "/:courseId/faculties",
  auth("admin", "superAdmin"),
  validateRequest(courseFacultyValidation),
  assignFaculties,
);
// get assign faculties------------------------------->
router.get(
  "/:courseId/get-faculties",
  auth("admin", "superAdmin", "faculty", "student"),
  getAssignFaculties,
);

// remove faculties into course--------------------------->
router.delete(
  "/:courseId/remove-faculties",
  auth("admin", "superAdmin"),
  validateRequest(courseFacultyValidation),
  removeFaculties,
);

export const courseRoutes = router;
