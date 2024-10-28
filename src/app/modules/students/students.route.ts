import express from "express";
import {
  deleteAStudent,
  getAllStudents,
  getAStudent,
} from "./students.controller";

const router = express.Router();


// get all students data--------------------------------->
router.get("/get-all-students-data", getAllStudents);

// get a students data--------------------------------->
router.get("/:studentId", getAStudent);

// delete student data--------------------------------->
// actually we don't delete data just update a field
router.delete("/:studentId", deleteAStudent);

export const studentsRoutes = router;
