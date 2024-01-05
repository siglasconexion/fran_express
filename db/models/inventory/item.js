const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Item = db.sequelize.define("item", {
  // Model attributes are defined here
  id_item: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_company_item: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_family_item: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_status_item: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  code_item: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name_item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qty_company: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock_item: {
    type: DataTypes.INTEGER,
  },
});

module.exports = {
  Item
};
