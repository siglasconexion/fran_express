import db from "../conn.js";
import { DataTypes } from "sequelize";

export const Person = db.sequelize.define("penson", {
  // Model attributes are defined here
  id_person: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description_person: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
