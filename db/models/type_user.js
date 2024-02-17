const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Type_user = db.sequelize.define(
  "type_user",
  {
    // Model attributes are defined here
    id_type_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_type_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    id_status_type_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description_type_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Type_user,
};
