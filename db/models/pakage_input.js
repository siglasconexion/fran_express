const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Pakage_input = db.sequelize.define(
  "pakage_input",
  {
    // Model attributes are defined here
    id_pakage_input: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pakage_pakage_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_pakage_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity_received_pakage_input: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    units_received_pakage_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_received_pakage_input: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    stock_pakage_input: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    comment_pakage_input: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Pakage_input,
};
