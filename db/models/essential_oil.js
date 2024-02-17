const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Essential_oil = db.sequelize.define(
  "essential_oil",
  {
    // Model attributes are defined here
    id_essential_oil: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_essential_oil_one: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_essential_oil_two: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_helper_container_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_measure_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_family_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_essential_oil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_essential_oil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock_essential_oil_one: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    stock_essential_oil_two: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Essential_oil,
};
