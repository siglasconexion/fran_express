import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Type_measure = db.sequelize.define(
  "type_measure",
  {
    // Model attributes are defined here
    id_type_measure: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_type_measure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc_type_measure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
