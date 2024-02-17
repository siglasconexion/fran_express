const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Type_container = db.sequelize.define(
  "type_container",
  {
    // Model attributes are defined here
    id_type_container: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_type_container: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    id_status_type_container: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_container_type_container: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description_type_container: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Type_container,
};
