import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Pakage = db.sequelize.define(
  "pakage",
  {
    // Model attributes are defined here
    id_pakage: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_status_pakage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company_pakage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_family_pakage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_measure_pakage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_provider_pakage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_pakage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code_two_pakage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_pakage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty_pakage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock_pakage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    sku_pakage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    low_stock_pakage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    weight_pakage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    weight_box_pakage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
