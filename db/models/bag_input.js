const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Bag_input = db.sequelize.define(
  "bag_input",
  {
    // Model attributes are defined here
    id_bag_input: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_bag_bag_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_bag_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity_received_bag_input: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    units_received_bag_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_received_bag_input: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    stock_bag_input: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    comment_bag_input: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Bag_input,
};
