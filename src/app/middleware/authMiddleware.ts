import { appError } from "../error/custom.appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";

export const auth = (...requiredRoles: TUserRole[]) => {
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

        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new appError(401, "You are not authorized user");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (req as any).user = decoded as JwtPayload; // Type assertion
        next();
      });
    } catch (error) {
      next(error);
    }
  };
};
