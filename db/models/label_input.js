import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Label_input = db.sequelize.define(
  "label_input",
  {
    // Model attributes are defined here
    id_label_input: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_label_label_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_label_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity_received_label_input: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    units_received_label_input: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_received_label_input: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    stock_label_input: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    comment_label_input: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
