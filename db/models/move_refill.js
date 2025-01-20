import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Move_refill = db.sequelize.define(
  "move_refill",
  {
    // Model attributes are defined here
    id_move_refill: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_type_recharge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    qty_refill: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    observation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
