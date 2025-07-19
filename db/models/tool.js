import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Tool = db.sequelize.define(
  "tool",
  {
    // Model attributes are defined here
    id_tool: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_tool: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_tool: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tool_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
