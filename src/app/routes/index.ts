import { Router } from "express";
import { usersRoutes } from "../modules/user/user.route";
import { studentsRoutes } from "../modules/students/students.route";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { facultyRoutes } from "../modules/faculty/faculty.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { courseRoutes } from "../modules/courses/course.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { offeredCourseRoutes } from "../modules/offeredCourse/offeredCourse.route";
import { authRoutes } from "../modules/auth/auth.router";
import { enrolledCourseRoutes } from "../modules/enrolledCourse/enrolledCourse.route";

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
  {
    path: "/academicDepartment",
    route: academicDepartmentRoutes,
  },
  {
    path: "/faculties",
    route: facultyRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/course",
    route: courseRoutes,
  },
  {
    path: "/semesterRegistration",
    route: semesterRegistrationRoutes,
  },
  {
    path: "/offeredCourse",
    route: offeredCourseRoutes,
  },
  {
    path: "/authLogin",
    route: authRoutes,
  },
  {
    path: "/enrolledCourse",
    route: enrolledCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
