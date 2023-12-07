import db from "../conn.js";
import { DataTypes } from "sequelize";

export const Family = db.sequelize.define(
  "family",
  {
    // Model attributes are defined here
    id_family: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_family: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_family: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_family: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
