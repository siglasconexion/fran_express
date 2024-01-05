const { Item } = require("../db/models/item.js");
const db = require("../db/conn.js");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");

const getItems = async (req, res) => {
  const data = await Item.findAll();
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

const getItem = async (req, res) => {
  let resultGetOne = await Item.findAll({
    where: {
      id_item: req.body.id,
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

const createItem = async (req, res) => {
  const resultNew = await Item.create({
    id_status_item: req.body.idstatusitem,
    code_item: req.body.codeitem,
    code_two_item: req.body.codetwoitem,
    name_item: req.body.nameitem,
    id_company_item: req.body.idcompanyitem,
    id_family_item: req.body.idfamilyitem,
    id_container_item: req.body.idcontaineritem,
    id_measure_oz_item: req.body.idmeasureozitem,
    qty_item: req.body.qtyitem,
    stock_item: req.body.stockitem,
    sku_short_item: req.body.skushortitem,
    sku_large_item: req.body.skulargeitem,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateItem = async (req, res) => {
  try {
    const obj = req.body;
    const id_item = req.body.id_item;
    let resultUpdate = await Item.update(obj, {
      where: {
        id_item: id_item,
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

const deleteItem = async (req, res) => {
  try {
    const id_item = req.body.id;
    let resultDelete = await Item.destroy({
      where: {
        id_item,
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
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
