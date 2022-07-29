import db from '../conn.js'
import { DataTypes } from 'sequelize'

export const User = db.sequelize.define('user', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  });