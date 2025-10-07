import postgres from "postgres";
import { Config } from "../config";
import { MAX } from "uuid";

export function connect(config: Config): postgres.Sql {
  const sql = postgres({
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbName,
    username: config.dbUsername,
    password: config.dbPassword,
    ssl: config.dbSsl,
    max: 20,

    idle_timeout: 20,
    max_lifetime: 60 * 30,
  });

  return sql;
}
