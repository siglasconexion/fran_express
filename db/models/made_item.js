import {db} from '../conn.js';
import { DataTypes } from 'sequelize';

export const Made_item = db.sequelize.define(
  "made_item",
  {
    // Model attributes are defined here
    id_made_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company_made_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_made_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_made_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_two_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_user_end_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_item_made_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date_made_item: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date_made_item: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sleeves_made_item: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    qty_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    batch_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    wet_lab_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    labeling_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    heat_seal_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sample_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    essential_oil_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carrier_oil_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ingredient_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    base_oil_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    concentrated_oil_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    other_refill_made_item: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    observation_made_item: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
