import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Stock_detail_bag = db.sequelize.define(
  "stock_detail_bag",
  {
    // Model attributes are defined here
    id_stock_detail_bag: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_stock_stock_detail_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_bag_stock_detail_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty_stock_detail_bag: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
