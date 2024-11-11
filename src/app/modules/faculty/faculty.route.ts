import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  facultyValidationSchemaZodOnCreate,
  facultyValidationSchemaZodOnUpdate,
} from "./faculty.validation";
import {
  createFaculty,
  deleteFaculty,
  getAllFaculty,
  getASingleFaculty,
  updateFaculty,
} from "./faculty.controller";

const router = express.Router();

// post a faculty------------->
router.post(
  "/create-faculty",
  validateRequest(facultyValidationSchemaZodOnCreate),
  createFaculty,
);

// get faculty--------------->
router.get("/get-all-faculty", getAllFaculty);

// get a faculty--------------->
router.get("/:facultyId", getASingleFaculty);

// get a faculty and update---->
router.patch(
  "/:facultyId",
  validateRequest(facultyValidationSchemaZodOnUpdate),
  updateFaculty,
);

// delete faculty by generatedId---->
router.delete("/:facultyId", deleteFaculty);

export const facultyRoutes = router;
