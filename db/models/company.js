import db from "../conn.js";
import { DataTypes } from "sequelize";

export const Company = db.sequelize.define(
  "company",
  {
    // Model attributes are defined here
    id_company: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_status_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_company: {
      type: DataTypes.STRING,
    },
    unit_company: {
      type: DataTypes.STRING,
    },
    postal_code_company: {
      type: DataTypes.STRING,
    },
    phone_number_company: {
      type: DataTypes.STRING,
    },
    email_company: {
      type: DataTypes.STRING,
    },
    id_social_media_company: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
