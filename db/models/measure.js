import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Measure = db.sequelize.define(
  "measure",
  {
    // Model attributes are defined here
    id_measure: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_measure: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_measure: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_department_measure: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_measure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mililitros: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
