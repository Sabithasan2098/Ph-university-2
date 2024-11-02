import { Router } from "express";
import { usersRoutes } from "../modules/user/user.route";
import { studentsRoutes } from "../modules/students/students.route";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";

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
  {
    path: "/academicSemesters",
    route: academicSemesterRoutes,
  },
  {
    path: "/academicFaculty",
    route: academicFacultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
