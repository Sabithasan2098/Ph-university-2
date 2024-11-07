// const mongoose = require('mongoose');

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/test');

//   }

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })

import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database as string);
    server = app.listen(config.port, () => {
      console.log(`The Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
process.on("uncaughtException", () => {
  process.exit(1);
});

main();
