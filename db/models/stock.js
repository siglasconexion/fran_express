const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Stock = db.sequelize.define(
  "stock",
  {
    // Model attributes are defined here
    id_stock: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date_stock: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date_stock: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    comment_stock: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Stock
};
