// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

import express, { Application, Request, Response,  } from "express";
import cors from "cors";
// import { studentsRoutes } from "./app/modules/student/student.route";
// import { userRoutes } from "./app/modules/users/users.routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { routeNotFound } from "./app/middlewares/routeNotFound";
import router from "./app/routes";
const app: Application = express();

// perser
app.use(express.json());

app.use(cors());

// application routes------------------->
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
// create a not found route error system------------------------------------->
app.use(routeNotFound);

export default app;