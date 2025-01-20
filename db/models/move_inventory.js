import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Move_inventory = db.sequelize.define(
  "move_inventory",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_type_move: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_type_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_section: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_part: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_process: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
