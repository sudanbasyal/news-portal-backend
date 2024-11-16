import { DataSource } from "typeorm";
import config from "./config";

export const AppDataSource = new DataSource(config.database);

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!!");
  } catch (err) {
    throw new Error("Database initialization failed");
  }
};
