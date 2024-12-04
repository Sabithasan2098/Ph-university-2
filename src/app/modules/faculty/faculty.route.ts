import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { facultyValidationSchemaZodOnUpdate } from "./faculty.validation";
import {
  deleteFaculty,
  getAllFaculty,
  getASingleFaculty,
  updateFaculty,
} from "./faculty.controller";
import { auth } from "../../middleware/authMiddleware";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// get faculty--------------->
router.get(
  "/get-all-faculty",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  getAllFaculty,
);

// get a faculty--------------->
router.get(
  "/:facultyId",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  getASingleFaculty,
);

// get a faculty and update---->
router.patch(
  "/:facultyId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(facultyValidationSchemaZodOnUpdate),
  updateFaculty,
);

// delete faculty by generatedId---->
router.delete(
  "/:facultyId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  deleteFaculty,
);

export const facultyRoutes = router;
