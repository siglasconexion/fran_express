import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Stock_label = db.sequelize.define(
  "stock_label",
  {
    // Model attributes are defined here
    id_stock_label: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_stock_label: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_stock_label: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_stock_label: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date_stock_label: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date_stock_label: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    comment_stock_label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closed_stock_label: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
