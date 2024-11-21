import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { authLoginValidation } from "./auth.validation";
import { authLogin } from "./auth.controller";

const router = express.Router();

router.post("/login", validateRequest(authLoginValidation), authLogin);

export const authRoutes = router;
