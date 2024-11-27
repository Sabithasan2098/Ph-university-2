import express from "express";
import {
  deleteAStudent,
  getAllStudents,
  getAStudent,
  updateAStudent,
} from "./students.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { studentValidationSchemaZodOnUpdate } from "./students.validation";
import { auth } from "../../middleware/authMiddleware";

const router = express.Router();

// get all students data--------------------------------->
router.get("/get-all-students-data", getAllStudents);

// get a students data--------------------------------->
router.get("/:studentId", auth("admin"), getAStudent);

// update a students data--------------------------------->
router.patch(
  "/:studentId",
  validateRequest(studentValidationSchemaZodOnUpdate),
  updateAStudent,
);

// delete student data--------------------------------->
// actually we don't delete data just update a field
router.delete("/:studentId", deleteAStudent);

export const studentsRoutes = router;
