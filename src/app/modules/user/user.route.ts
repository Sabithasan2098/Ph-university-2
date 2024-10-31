import express from "express";
import { createStudent } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { studentValidationSchemaZodOnCreate } from "../students/students.validation";


const router = express.Router();

// post a student data----------------------------------->
router.post("/create-student",validateRequest(studentValidationSchemaZodOnCreate), createStudent);


export const usersRoutes = router;
