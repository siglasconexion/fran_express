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
    initial: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    production: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    purchase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    other_entries: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    damaged: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defeated: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    returned: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    adjustment: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
