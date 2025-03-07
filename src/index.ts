import express from "express";
import "reflect-metadata";
import path from "path";

import cors from "cors";
import helmet from "helmet";

import config from "./config";
import { initializeDatabase } from "./dataSource";
import { genericErrorHandler } from "./middleware/errorHandler";
import { RequestLogger } from "./middleware/logger";
import router from "./route";
import { initializeApp } from "../app";

const app = express();

app.use(helmet());

// Serve static files for uploads
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router middleware

app.use(RequestLogger);
app.use(router);

app.use(genericErrorHandler);

// Modify the server startup to wait for DB connection
// const startServer = async () => {
//   try {
//     const app = await initializeApp();
//     app.listen(config.port, () => {
//       console.log(`app is listening on ${config.port}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
// };

// startServer();
