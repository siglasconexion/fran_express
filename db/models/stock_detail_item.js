const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Stock_detail_item = db.sequelize.define(
  "stock_detail_item",
  {
    // Model attributes are defined here
    id_stock_detail_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_stock_stock_detail_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_item_stock_detail_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_place_stock_detail_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_stock_detail_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty_container_stock_detail_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    units_stock_detail_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_stock_detail_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Stock_detail_item,
};
