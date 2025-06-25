import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Container = db.sequelize.define(
  "container",
  {
    // Model attributes are defined here
    id_container: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_status_container: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company_container: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_family_container: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_measure_container: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_department_container: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    level_container: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name_container: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size_container: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty_container: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    container_tare: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    container_tare_lbs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_helper_container: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
