import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  authLoginValidation,
  changePasswordValidation,
} from "./auth.validation";
import { authLogin, changePassword } from "./auth.controller";
import { USER_ROLE } from "../user/user.constant";
import { auth } from "../../middleware/authMiddleware";

const router = express.Router();

router.post("/login", validateRequest(authLoginValidation), authLogin);

router.post(
  "/changePassword",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(changePasswordValidation),
  changePassword,
);

export const authRoutes = router;
