import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createAcademicSemester } from "./academicSemester,controller";
import { academicSemesterValidationSchema } from "./academicSemesterValidation";

const router = express.Router();

// create academicSemester------------------------------->
router.post("/create-academicSemester",validateRequest(academicSemesterValidationSchema),createAcademicSemester)

// get all students data--------------------------------->
// router.get("/get-all-students-data", getAllStudents);

// get a students data--------------------------------->
// router.get("/:studentId", getAStudent);

// delete student data--------------------------------->
// actually we don't delete data just update a field
// router.delete("/:studentId", deleteAStudent);

export const academicSemesterRoutes = router;