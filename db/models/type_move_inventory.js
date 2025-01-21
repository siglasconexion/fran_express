import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Type_move_inventory = db.sequelize.define(
  "type_move_inventory",
  {
    // Model attributes are defined here
    id_type_move_inventory: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_type_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_move_inventory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
