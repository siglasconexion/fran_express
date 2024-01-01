import db from "../conn.js";
import { DataTypes } from "sequelize";

export const Item = db.sequelize.define(
  "item",
  {
    // Model attributes are defined here
    id_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_status_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_family_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_measure_oz_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code_two_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sku_short_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sku_large_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
