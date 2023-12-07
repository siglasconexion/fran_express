import db from "../conn.js";
import { DataType, DataTypes } from "sequelize";

export const Container = db.sequelize.define("container", {
  // Model attributes are defined here
  id_container: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_company_container: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_status_container: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
