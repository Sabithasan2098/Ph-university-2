import express, { Application, Request, Response } from "express";
import cors from "cors";
import { studentsRoutes } from "./app/modules/students/students.route";
import { usersRoutes } from "./app/modules/user/user.route";
const app: Application = express();

// perser
app.use(express.json());

app.use(cors());

// application routes------------------->
app.use("/api/v1/students", studentsRoutes);
// user route
app.use("/api/v1/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! i am comming");
});

export default app;
