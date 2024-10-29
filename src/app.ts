//* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandelar";
import { routeNotFound } from "./app/middleware/notFoundRoute";
import router from "./app/routes";
const app: Application = express();

// perser
app.use(express.json());

app.use(cors());

// application routes------------------->
app.use("/api/v1",router)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! i am coming");
});

// global error handling------------->
app.use(globalErrorHandler)

// not found route------------------->
app.use(routeNotFound)

export default app;
