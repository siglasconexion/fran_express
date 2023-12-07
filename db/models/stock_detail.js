import db from "../conn.js";
import { DataTypes } from "sequelize";

export const Stock_detail = db.sequelize.define(
  "stock_detail",
  {
    // Model attributes are defined here
    id_stock_detail: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_stock_stock_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_item_stock_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_place_stock_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_stock_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty_container_stock_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    units_stock_detail: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_stock_detail: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
