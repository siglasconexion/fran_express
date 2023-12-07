import db from "../conn.js";
import { DataTypes } from "sequelize";

export const Current_inventory = db.sequelize.define(
  "current_inventory",
  {
    // Model attributes are defined here
    id_current_inventory: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_stock_current_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_item_current_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_current_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
