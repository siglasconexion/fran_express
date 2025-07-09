import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Recipe = db.sequelize.define(
  "recipe",
  {
    // Model attributes are defined here
    id_recipe: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_recipe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_recipe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_family_recipe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_recipe: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name_recipe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code_recipe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku_recipe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_container_full_recipe: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    time_take_make_recipe: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    time_life_item_recipe: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    made_laboratory_recipe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    observation_recipe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
