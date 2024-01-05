const db = require("../conn.js");
const { DataTypes } = require("sequelize");

const Item_container = db.sequelize.define("item_container", {
  // Model attributes are defined here
  id_item_container: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_company_item_container: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_status_item_container: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_item_item_container: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_container_item_container: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type_item_container: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  Item_container
};
