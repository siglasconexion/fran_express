import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Essential_oil = db.sequelize.define(
  "essential_oil",
  {
    // Model attributes are defined here
    id_essential_oil: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_essential_oil_one: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_essential_oil_two: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_helper_container_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_measure_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_provider_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_family_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_essential_oil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code_two_essential_oil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_essential_oil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_essential_oil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    density_essential_oil: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    inci_essential_oil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock_essential_oil_one: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    stock_essential_oil_two: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    low_stock_essential_oil: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    sku_essential_oil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shelf_life_months_essential_oil: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    shelf_life_years_essential_oil: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    shelf_life_desc_essential_oil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
