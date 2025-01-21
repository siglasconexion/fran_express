import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Bag = db.sequelize.define(
  "bag",
  {
    // Model attributes are defined here
    id_bag: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_status_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_family_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_measure_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_bag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code_two_bag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_bag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_complement_bag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qty_bag: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock_bag: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    sku_short_bag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku_large_bag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    low_stock_bag: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    weight_bag: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    weight_box_bag: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
