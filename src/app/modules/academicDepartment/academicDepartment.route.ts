import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { academicDepartmentValidation, updateAcademicDepartmentValidation } from "./academicDepartment.validation";
import { createAcademicDepartment, getAAcademicDepartment, getAllAcademicDepartment, updateAcademicDepartment } from "./academicDepartment.controller";

const router = express.Router();

// create academicSemester------------------------------->
router.post("/create-academicDepartment",validateRequest(academicDepartmentValidation),createAcademicDepartment)

// get all semester data--------------------------------->
router.get("/get-all-department-data", getAllAcademicDepartment);

// get a semester data--------------------------------->
router.get("/:departmentId", getAAcademicDepartment);

// update a semester data--------------------------------->
router.patch("/:departmentId", validateRequest(updateAcademicDepartmentValidation),updateAcademicDepartment)

export const academicDepartmentRoutes = router;