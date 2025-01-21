import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Item_part = db.sequelize.define(
  "item_part",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_part: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_type_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
