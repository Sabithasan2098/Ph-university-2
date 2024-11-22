import { appError } from "../error/custom.appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { NextFunction, Request, Response } from "express";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new appError(401, "You are not authorized user");
      }
      jwt.verify(token, config.jwt_token as string, function (err, decoded) {
        // err
        if (err) {
          throw new appError(401, "You are not authorized user");
        }
        // decoded undefined
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (req as any).user = decoded as JwtPayload; // Type assertion
        next();
      });
    } catch (error) {
      next(error);
    }
  };
};
