import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config.js";

// export const sequelize = new Sequelize({
//   username: config.username,
//   password: config.password,
//   database: config.database,
//   host: config.host,
//   port:Number(config.port_pg),

//   dialect: "postgres",
//   storage: ":memory:",
// });

export const sequelize = new Sequelize(`postgres://${config.username}:${config.password}@${config.host}:${config.port_pg}/${config.database}`);

