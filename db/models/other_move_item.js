import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Other_move_item = db.sequelize.define(
  "other_move_item",
  {
    // Model attributes are defined here
    id_other_move_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_type_move_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
