import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Recipe_part = db.sequelize.define(
  "recipe_part",
  {
    // Model attributes are defined here
    id_recipe_part: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_status_recipe_part: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_recipe_recipe_part: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_type_inventory_recipe_part: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_measure_recipe_part: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_part_recipe_part: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity_recipe_part: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
