const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Type_recharge = db.sequelize.define(
  "type_recharge",
  {
    // Model attributes are defined here
    id_type_recharge: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    desc_type_recharge: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Type_recharge,
};
