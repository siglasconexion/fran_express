const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Department = db.sequelize.define(
  "department",
  {
    // Model attributes are defined here
    id_department: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_department: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_department: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    department_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department_table_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Department,
};
