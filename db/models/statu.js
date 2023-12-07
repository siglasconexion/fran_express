import db from "../conn.js";
import { DataTypes } from "sequelize";

export const Statu = db.sequelize.define(
  "statu",
  {
    // Model attributes are defined here
    id_status: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
