import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Place = db.sequelize.define(
  "place",
  {
    // Model attributes are defined here
    id_place: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_place: {
      type: DataTypes.INTEGER,
      // allowNull defaults to true
    },
    id_status_place: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
