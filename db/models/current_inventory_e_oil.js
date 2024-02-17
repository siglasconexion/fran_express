const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Current_inventory_e_oil = db.sequelize.define(
  "current_inventory_e_oil",
  {
    // Model attributes are defined here
    id_current_inventory_e_oil: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_stock_current_inventory_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_e_oil_current_inventory_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_current_inventory_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Current_inventory_e_oil,
};
