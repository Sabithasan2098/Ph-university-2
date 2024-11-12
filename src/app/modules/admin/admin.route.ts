import express from "express";
import { getAllAdmin, getASingleAdmin, updateAdmin } from "./admin.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { adminValidationSchemaZodOnUpdate } from "./admin.validation";
const router = express.Router();

// get all admin---------------------------->
router.get("/get-all-admin", getAllAdmin);
// get a single admin----------------------->
router.get("/:adminId", getASingleAdmin);
// get a single admin & update-------------->
router.patch(
  "/:adminId",
  validateRequest(adminValidationSchemaZodOnUpdate),
  updateAdmin,
);

export const adminRoutes = router;
