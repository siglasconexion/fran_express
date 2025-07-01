import dotenv from "dotenv";
dotenv.config();
import { Sequelize, DataTypes, Op } from "sequelize";

export const db = {};
db.sequelize = new Sequelize(
  process.env.NAME_DATABASE,
  process.env.USER_DATABASE,
  process.env.CLAVE_DB,
  {
    host: process.env.HOST,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 10000, // 10 segundos
    },

    //    connectTimeout: 10000, // 10 segundos
  }
);

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully. me conecte");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
})();
