import dotenv from "dotenv";
dotenv.config();
import { Sequelize, DataTypes, Op } from "sequelize";

const db = {};
db.sequelize = new Sequelize(
  process.env.NAME_DATABASE,
  process.env.USER_DATABASE,
  process.env.CLAVE_DB,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

/* db.sequelize = new Sequelize(
  "inventory",
  "inventory",
  "Fran_**_1234_bd_nube$",
  {
    host: "159.65.241.58",
    dialect: "mysql",
  }
); */

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully. me conecte");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
})();

export default db;
