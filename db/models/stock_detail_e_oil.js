const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Stock_detail_e_oil = db.sequelize.define(
  "stock_detail_e_oil",
  {
    // Model attributes are defined here
    id_stock_detail_e_oil: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_stock_stock_detail_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_e_oil_stock_detail_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_one_stock_detail_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_two_stock_detail_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_helper_container_stock_detail_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    qty_container_one_stock_detail_e_oil: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    qty_container_two_stock_detail_e_oil: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    qty_helper_container_stock_detail_e_oil: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Stock_detail_e_oil,
};
