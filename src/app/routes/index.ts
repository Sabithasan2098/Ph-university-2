import { Router } from "express";
import { usersRoutes } from "../modules/user/user.route";
import { studentsRoutes } from "../modules/students/students.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: usersRoutes,
  },
  {
    path: "/students",
    route: studentsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
