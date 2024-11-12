import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { adminValidationSchemaZodOnCreate } from "./admin.validation";
import { createAdmin } from "./admin.controller";

const router = express.Router();

router.post(
  "create-admin",
  validateRequest(adminValidationSchemaZodOnCreate),
  createAdmin,
);

export const adminRoutes = router;
