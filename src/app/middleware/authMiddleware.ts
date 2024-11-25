import { appError } from "../error/custom.appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import { userModelSchema } from "../modules/user/user.model";

export const auth = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new appError(401, "You are not authorized user");
      }
      const decoded = jwt.verify(
        token,
        config.jwt_token as string,
      ) as JwtPayload;

      const { role, userId, iat } = decoded;

      // check user exists or not
      const user = await userModelSchema.IsUserExists(userId);

      if (!user) {
        throw new appError(400, "This user not found");
      }
      // check user isDeleted
      if (await userModelSchema.IsUserDeleted(user.id)) {
        throw new appError(400, "This user is deleted");
      }
      // check user isBlocked
      if (await userModelSchema.IsUserBlocked(user.id)) {
        throw new appError(400, "This user is blocked");
      }

      if (
        user.passwordChangeAt &&
        userModelSchema.isJWTIssuedBeforePasswordChanged(
          user.passwordChangeAt,
          iat as number,
        )
      ) {
        throw new appError(401, "You are not authorized user 😎😎😎😎😎");
      }
      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        // Check required roles
        throw new appError(403, "You do not have the necessary permissions");
      }

      // Attach user info to request object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any).user = { userId, role };
      next();
    } catch (error) {
      next(error);
    }
  };
};
