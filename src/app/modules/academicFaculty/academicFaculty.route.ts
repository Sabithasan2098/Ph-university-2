import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  academicFacultyValidation,
  UpdateAcademicFacultyValidation,
} from "./academicFacultyValidation";
import {
  createAcademicFaculty,
  getAAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
} from "./academicFaculty.controller";
import { USER_ROLE } from "../user/user.constant";
import { auth } from "../../middleware/authMiddleware";

const router = express.Router();

// create academicSemester------------------------------->
router.post(
  "/create-academicFaculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(academicFacultyValidation),
  createAcademicFaculty,
);

// get all semester data--------------------------------->
router.get("/get-all-faculty-data", getAllAcademicFaculty);

// get a semester data--------------------------------->
router.get("/:facultyId", getAAcademicFaculty);

// update a semester data--------------------------------->
router.patch(
  "/:facultyId",
  validateRequest(UpdateAcademicFacultyValidation),
  updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
