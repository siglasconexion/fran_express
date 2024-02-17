const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Oil_input = db.sequelize.define(
  "oil_input",
  {
    // Model attributes are defined here
    id_oil_input: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_essential_oil_oil_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_oil_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_oil_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    container_weight_oil_input: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity_received_oil_input: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date_received_oil_input: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_start_oil_input: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_end_oil_input: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    in_use_oil_input: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    finish_oil_input: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    stock_oil_input: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    comment_oil_input: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Oil_input,
};
