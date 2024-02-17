const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Provider = db.sequelize.define(
  "provider",
  {
    // Model attributes are defined here
    id_provider: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_provider: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_provider: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    provider_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider_zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider_city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider_state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider_unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider_phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Provider,
};
