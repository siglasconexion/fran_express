const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Stock_detail = db.sequelize.define("stock_detail", {
  // Model attributes are defined here
  id_stock_detail: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_company_stock_detail: {
    type: DataTypes.INTEGER,
    // allowNull defaults to true
  },
  id_user_stock_detail: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_item_stock_detail: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_place_stock_detail: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_container_stock_detail: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  qty_container_stock_detail: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  qty_stock_detail: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = {
  Stock_detail
};
