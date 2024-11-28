import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  authLoginValidation,
  authTokenValidation,
  changePasswordValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
} from "./auth.validation";
import {
  authLogin,
  changePassword,
  forgetPassword,
  refreshToken,
  resetPassword,
} from "./auth.controller";
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

router.post(
  "/refreshToken",
  validateRequest(authTokenValidation),
  refreshToken,
);
// forget password------------------------>
router.post(
  "/forgetPassword",
  validateRequest(forgetPasswordValidation),
  forgetPassword,
);
// reset password------------------------>
router.post(
  "/resetPassword",
  validateRequest(resetPasswordValidation),
  resetPassword,
);

export const authRoutes = router;
