import { db } from "../conn.js";
import { DataTypes } from "sequelize";

export const Item_information = db.sequelize.define(
  "item_information",
  {
    // Model attributes are defined here
    id_item_information: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_recipe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wet_lab: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty_x_batch: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight_bin_empty: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    weight_bin_full: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    need_labeling: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    need_heat_seal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    use_bag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    need_sample: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time_serving: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year_life_item: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    use_ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    use_essential_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    use_carrier_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    use_concentrated_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    use_base_oil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
