const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Current_inventory_bag = db.sequelize.define(
  "current_inventory_bag",
  {
    // Model attributes are defined here
    id_current_inventory_bag: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_stock_current_inventory_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_bag_current_inventory_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_current_inventory_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Current_inventory_bag,
};
