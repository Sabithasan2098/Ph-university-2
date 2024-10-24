import express from "express";
import {
  createStudent,
  getAllStudents,
  getAStudent,
} from "./students.controller";

const router = express.Router();

// post a student data----------------------------------->
router.post("/create-student", createStudent);

// get all students data--------------------------------->
router.get("/get-all-students-data", getAllStudents);

// get all students data--------------------------------->
router.get("/:studentId", getAStudent);

export const studentsRoutes = router;
