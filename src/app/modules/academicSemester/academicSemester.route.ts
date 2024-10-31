import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { academicSemesterValidationSchema } from "./academicSemesterValidation";
import { createAcademicSemester, getAllAcademicSemesterData, getASingleAcademicSemesterData, updateAcademicSemester } from "./academicSemester,controller";

const router = express.Router();

// create academicSemester------------------------------->
router.post("/create-academicSemester",validateRequest(academicSemesterValidationSchema),createAcademicSemester)

// get all semester data--------------------------------->
router.get("/get-all-semester-data", getAllAcademicSemesterData);

// get a semester data--------------------------------->
router.get("/:semesterId", getASingleAcademicSemesterData);

// update a semester data--------------------------------->
router.patch("/:semesterId",updateAcademicSemester)

export const academicSemesterRoutes = router;