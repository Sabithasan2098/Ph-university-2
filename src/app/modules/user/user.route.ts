import express, { NextFunction, Request, Response } from "express";
import {
  changeUserStatus,
  createAdmin,
  createFaculty,
  createStudent,
  getMe,
} from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { studentValidationSchemaZodOnCreate } from "../students/students.validation";
import { facultyValidationSchemaZodOnCreate } from "../faculty/faculty.validation";
import { adminValidationSchemaZodOnCreate } from "../admin/admin.validation";
import { auth } from "../../middleware/authMiddleware";
import { USER_ROLE } from "./user.constant";
import { changeStatusValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

// post a student data----------------------------------->
router.post(
  "/create-student",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidationSchemaZodOnCreate),
  createStudent,
);

// post a faculty------------->
router.post(
  "/create-faculty",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(facultyValidationSchemaZodOnCreate),
  createFaculty,
);

// post a admin
router.post(
  "/create-admin",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(adminValidationSchemaZodOnCreate),
  createAdmin,
);

// get your own data------------------->
router.get("/me", auth("admin", "student", "faculty"), getMe);

// change user status------------------->
router.patch(
  "/change-user-status/:id",
  auth("admin"),
  validateRequest(changeStatusValidation),
  changeUserStatus,
);

export const usersRoutes = router;
