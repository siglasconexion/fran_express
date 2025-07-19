import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Recipe_tool = db.sequelize.define(
  "recipe_tool",
  {
    // Model attributes are defined here
    id_recipe_tool: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_recipe_recipe_tool: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_tool_recipe_tool: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity_recipe_tool: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
