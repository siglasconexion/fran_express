import { Item_information } from "../db/models/item_information.js";
import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";
import _ from "lodash";

export const getItem_informations = async (req, res) => {
  const data = await Item_information.findAll();
  if (data.length <= 0) {
    res.status(201).json({
      code: 201,
      message: "Results not foundssdsdasdasd",
      statusText: "nuevo mensaje",
      ok: "false",
    });
    return;
  }
  res.status(200).json(data);
};

export const getItem_information = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Item_information.findAll({
    where: {
      id_item: variable,
    },
  });
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  }
  res.json(resultGetOne);
};

export const createItem_information = async (req, res) => {
  const resultNew = await Item_information.create({
    id_item: req.body.iditem,
    id_recipe: req.body.idrecipe,
    wet_lab: req.body.wetlab,
    qty_x_batch: req.body.qtyxbatch,
    weight_bin_empty: req.body.wbinempty,
    weight_bin_full: req.body.wbinfull,
    need_labeling: req.body.labeling,
    need_heat_seal: req.body.heatseal,
    use_bag: req.body.usebag,
    need_sample: req.body.madesample,
    time_serving: req.body.timeserving,
    observation: req.body.observationitem,
    pack: req.body.pack,
    use_ingredient: req.body.useingredient,
    use_essential_oil: req.body.useessentialoil,
    use_carrier_oil: req.body.usecarrieroil,
    use_concentrated_oil: req.body.useconcentratedoil,
    use_base_oil: req.body.usebaseoil,
    year_life_item: req.body.yearlifeitem,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateItem_information = async (req, res) => {
  try {
    const obj = req.body;
    console.log("req.body", req.body);
    const id_item_information = req.body.id_item_information;
    let resultUpdate = await Item_information.update(obj, {
      where: {
        id_item_information: id_item_information,
      },
    });
    if (resultUpdate[0] === 1) {
      res.status(200).json({
        message: "Status Update successfully",
        resultUpdate: resultUpdate,
      });
    } else {
      throw { status: res.status, statusText: res.statusText };
      res.status(400).json({
        error: "valor demasiado grande",
        message: "Status not successfully",
        resultUpdate: resultUpdate,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "valor demasiado grande",
      message: "Status not successfully",
    });
    console.log(err.stack);
    console.log("aca solo el error", err);
  }
};

export const deleteItem_information = async (req, res) => {
  try {
    const id_item_information = req.body.id;
    let resultDelete = await Item_information.destroy({
      where: {
        id_item_information,
      },
    });
    resultDelete === 1
      ? res.json({
          message: "Status was deleted successfully",
          resultDelete: resultDelete,
        })
      : res.json({
          message: "Status Not deleted successfully",
          resultdelete: resultDelete,
        });
  } catch (err) {
    console.log(err.stack);
  }
};
