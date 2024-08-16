const { Made_item } = require("../db/models/made_item.js");
/* const {
  Current_inventory_item,
} = require("../db/models/current_inventory_item.js");
 */
const { QueryTypes } = require("sequelize");
const db = require("../db/conn.js");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");
const _ = require("lodash");

const getMade_items = async (req, res) => {
  const data = await Made_item.findAll();
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

const getMade_item = async (req, res) => {
  let resultGetOne = await Made_item.findAll({
    where: {
      id_made_item: req.body.id,
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

const createMade_item = async (req, res) => {
  const resultNew = await Made_item.create({
    id_company_made_item: req.body.idcompanymadeitem,
    id_status_made_item: req.body.idstatusmadeitem,
    id_user_made_item: req.body.idusermadeitem,
    id_user_two_made_item: req.body.idusertwomadeitem,
    id_user_end_made_item: req.body.iduserendmadeitem,
    id_item_made_item: req.body.iditemmadeitem,
    start_date_made_item: req.body.startdatemadeitem,
    end_date_made_item: req.body.enddatemadeitem,
    sleeves_made_item: req.body.sleevesmadeitem,
    qty_made_item: req.body.qtymadeitem,
    batch_made_item: req.body.batchmadeitem,
    wet_lab_made_item: req.body.wetlabmadeitem,
    labeling_made_item: req.body.labelingmadeitem,
    heat_seal_made_item: req.body.heatsealmadeitem,
    sample_made_item: req.body.samplemadeitem,
    essential_oil_made_item: req.body.essentialoilmadeitem,
    carier_oil_made_item: req.body.carieroilmadeitem,
    ingredient_made_item: req.body.ingredientmadeitem,
    base_oil_made_item: req.body.baseoilmadeitem,
    concentrated_oil_made_item: req.body.concentratedoilmadeitem,
    other_refill_made_item: req.body.otherrefillmadeitem,
    observation_made_item: req.body.observationmadeitem,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateMade_item = async (req, res) => {
  try {
    const obj = req.body;
    const id_made_item = req.body.id_made_item;
    let resultUpdate = await Item.update(obj, {
      where: {
        id_made_item: id_made_item,
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

const deleteMade_item = async (req, res) => {
  try {
    const id_made_item = req.body.id;
    let resultDelete = await Made_item.destroy({
      where: {
        id_made_item,
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

module.exports = {
  getMade_items,
  getMade_item,
  createMade_item,
  updateMade_item,
  deleteMade_item,
};
