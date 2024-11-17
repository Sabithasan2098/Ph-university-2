import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { semesterRegistrationValidationZodOnCreate } from "./semesterRegistration.validation";
import {
  createSemesterRegistration,
  getAllSemesterRegister,
  getSingleSemesterRegistration,
} from "./semesterRegistration.controller";

const router = express.Router();

// create course------------------------------->
router.post(
  "/create-semesterRegistration",
  validateRequest(semesterRegistrationValidationZodOnCreate),
  createSemesterRegistration,
);

// get all course data--------------------------------->
router.get("/get-all-semesterRegistration-data", getAllSemesterRegister);

// get a course data--------------------------------->
router.get("/:id", getSingleSemesterRegistration);

// // delete a course data--------------------------------->
// router.delete("/:id", delete);

// // update a course data--------------------------------->
// router.patch(
//   "/:id",
//   validateRequest(validationCourseZodOnUpdate),
//   updateCourse,
// );

// //
// router.put(
//   "/:courseId/faculties",
//   validateRequest(courseFacultyValidation),
//   assignFaculties,
// );

export const semesterRegistrationRoutes = router;
