import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Stock_bag = db.sequelize.define(
  "stock_bag",
  {
    // Model attributes are defined here
    id_stock_bag: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_stock_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_stock_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_stock_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date_stock_bag: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date_stock_bag: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    comment_stock_bag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closed_stock_bag: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
