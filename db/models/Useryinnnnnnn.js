const db = require('../conn.js');
const { DataTypes } = require('sequelize');

const User = db.sequelize.define('user', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    last_name: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  });

module.exports = {
  User
};
