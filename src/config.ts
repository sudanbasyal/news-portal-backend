import dotenv from "dotenv";

import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { requireEnv } from "./utils/envDataHandler";
import { IConfig } from "./interface/configuration";

dotenv.config({ path: __dirname + "/../.env" });

const config: IConfig = {
  apiUrl: requireEnv("API_URL"),
  port: requireEnv("PORT"),
  jwt: {
    secret: requireEnv("JWT_SECRET"),
    accessExpiration: parseInt(requireEnv("ACCESS_TOKEN_EXPIRY")),
    refreshTokenExpiration: parseInt(requireEnv("REFRESH_TOKEN_EXPIRY")),
  },
  database: {
    name: requireEnv("DB_NAME"),
    type: "postgres",
    host: requireEnv("DB_HOST"),
    port: parseInt(requireEnv("DB_PORT")),
    username: requireEnv("DB_USERNAME"),
    password: requireEnv("DB_PASSWORD"),
    database: requireEnv("DB_DATABASE"),
    synchronize: false,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    namingStrategy: new SnakeNamingStrategy(),
    ssl: {
      rejectUnauthorized: false //comment ssl in cpanel
    },
  },
};

export default config;
