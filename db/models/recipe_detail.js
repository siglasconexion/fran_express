import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Recipe_detail = db.sequelize.define(
  "recipe_detail",
  {
    // Model attributes are defined here
    id_recipe_detail: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_recipe_recipe_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_measure_recipe_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity_recipe_detail: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
