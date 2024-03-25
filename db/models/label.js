const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Label = db.sequelize.define(
  "label",
  {
    // Model attributes are defined here
    id_label: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_status_label: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company_label: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_family_label: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_measure_label: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code_two_label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_complement_label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qty_label: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock_label: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    sku_short_label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku_large_label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    low_stock_label: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    total_weight_label: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    waste_weight_label: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    weight_label: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    weight_support_label: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Label,
};
