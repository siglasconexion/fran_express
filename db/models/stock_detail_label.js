const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Stock_detail_label = db.sequelize.define(
  "stock_detail_label",
  {
    // Model attributes are defined here
    id_stock_detail_label: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_stock_stock_detail_label: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_label_stock_detail_label: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty_stock_detail_label: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Stock_detail_label,
};
