import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Ingredient = db.sequelize.define(
  "ingredient",
  {
    // Model attributes are defined here
    id_ingredient: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_status_ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company_ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_family_ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_measure_ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_provider_ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_ingredient: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inci_ingredient: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock_ingredient: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    sku_ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    low_stock_ingredient: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    shelf_life_years_ingredient: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    shelf_life_months_ingredient: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    shelf_life_desc_ingredient: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight_container_ingredient: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    gross_weight_ingredient: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    net_weight_ingredient: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    observation_ingredient: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
