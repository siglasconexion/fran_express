import db from "../conn.js";
import { DataTypes } from "sequelize";

export const User = db.sequelize.define("user", {
  // Model attributes are defined here
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_company_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // allowNull defaults to true
  },
  id_status_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_type_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name_key_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
