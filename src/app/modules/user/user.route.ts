import express from "express";
import { createStudent } from "./user.controller";


const router = express.Router();

// post a student data----------------------------------->
router.post("/create-student", createStudent);


export const usersRoutes = router;
