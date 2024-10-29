// /* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({
    success: false,
    message: "API not found",
    error: "",
  });
  next()
};