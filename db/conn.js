const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes, Op } = require("sequelize");

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

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully. me conecte");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
})();

module.exports = db;
