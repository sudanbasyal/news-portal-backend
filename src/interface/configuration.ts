import { NamingStrategyInterface } from "typeorm";

interface DatabaseConfig {
  name: string;
  type: "postgres";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: string[];
  migrations: string[];
  subscribers: string[];
  namingStrategy?: NamingStrategyInterface;
  ssl?: {
    rejectUnauthorized: boolean;
  };
}

export interface IConfig {
  port: string | undefined;
  database: DatabaseConfig;
  jwt: {
    secret: string | undefined;
    accessExpiration: number;
    refreshTokenExpiration: number;
  };
  apiUrl: string;
}
