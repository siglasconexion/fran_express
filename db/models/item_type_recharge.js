const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Item_type_recharge = db.sequelize.define(
  "item_type_recharge",
  {
    // Model attributes are defined here
    id_item_type_recharge: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_type_recharge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Item_type_recharge,
};
