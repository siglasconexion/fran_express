const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Pakage = db.sequelize.define(
  "pakage",
  {
    // Model attributes are defined here
    id_pakage: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_status_pakage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company_pakage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_family_pakage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_measure_pakage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_pakage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_pakage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty_pakage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock_pakage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    low_stock_pakage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    weight_pakage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    weight_box_pakage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Pakage,
};
