import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Current_inventory_item = db.sequelize.define(
  "current_inventory_item",
  {
    // Model attributes are defined here
    id_current_inventory_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_stock_current_inventory_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_item_current_inventory_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    initial: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    production: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    purchase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    other_entries: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sales: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    send_to_amazon: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    damaged: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defeated: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    returned: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    adjustment: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    total_current_inventory_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
