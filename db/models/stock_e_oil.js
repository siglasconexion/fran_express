const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Stock_e_oil = db.sequelize.define(
  "stock_e_oil",
  {
    // Model attributes are defined here
    id_stock_e_oil: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_stock_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_stock_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_stock_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date_stock_e_oil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date_stock_e_oil: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    comment_stock_e_oil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closed_stock_e_oil: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Stock_e_oil,
};
