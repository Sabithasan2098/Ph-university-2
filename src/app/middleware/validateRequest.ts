import { RequestHandler } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (validation: AnyZodObject): RequestHandler => {
  return async (req, res, next) => {
    try {
      await validation.parseAsync({ body: req.body });
      next();
    } catch (error) {
      next(error);
    }
  };
};
