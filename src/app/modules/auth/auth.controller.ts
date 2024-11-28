import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import {
  authLoginService,
  changePasswordIntoDB,
  forgetPasswordService,
  refreshTokenService,
  resetPasswordService,
} from "./auth.service";
import config from "../../config";

// Token cookie te set korar jonno purano style e controller banano laglo
export const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authLoginService(req.body);
    const { refreshToken, accessToken, changePassword } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        changePassword,
      },
    });
  } catch (error) {
    next(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const changePassword = catchAsync(async (req: any) => {
  const { ...password } = req.body;
  return await changePasswordIntoDB(req.user, password);
}, "Login confirm");

export const refreshToken = catchAsync(async (req) => {
  const { refreshToken } = req.cookies;
  return await refreshTokenService(refreshToken);
}, "Got access token successfully");

export const forgetPassword = catchAsync(async (req) => {
  const userId = req.body.id;
  return await forgetPasswordService(userId);
}, "Reset route generated successfully");

// reset password------------------------->
export const resetPassword = catchAsync(async (req) => {
  const token = req.headers.authorization;
  return await resetPasswordService(req.body, token as string);
}, "Password reset successfully");
