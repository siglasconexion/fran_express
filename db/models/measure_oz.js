import db from "../conn.js";
import { DataTypes } from "sequelize";

export const Measure_oz = db.sequelize.define(
  "measure_oz",
  {
    // Model attributes are defined here
    id_measure_oz: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_measure_oz: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_measure_oz: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_measure_oz: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
