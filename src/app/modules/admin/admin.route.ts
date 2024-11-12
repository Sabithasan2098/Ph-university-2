import express from "express";
import { getAllAdmin, getASingleAdmin } from "./admin.controller";
const router = express.Router();

// get all admin---------------------------->
router.get("/get-all-admin", getAllAdmin);
// get a single admin----------------------->
router.get("/:adminId", getASingleAdmin);

export const adminRoutes = router;
