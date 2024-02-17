const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Person = db.sequelize.define(
  "penson",
  {
    // Model attributes are defined here
    id_person: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description_person: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Person,
};
