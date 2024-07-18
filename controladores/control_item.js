const { Item } = require("../db/models/item.js");
const {
  Current_inventory_item,
} = require("../db/models/current_inventory_item.js");
const { QueryTypes } = require("sequelize");
const db = require("../db/conn.js");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");
const _ = require("lodash");

const getItems = async (req, res) => {
  const data = await Item.findAll();
  /*  data = await db.sequelize.query(`SELECT  * from item ORDER BY id_item`, {
    type: QueryTypes.SELECT,
  }); */
  if (data.length <= 0) {
    res.status(201).json({
      code: 201,
      message: "Results not foundssdsdasdasd",
      statusText: "nuevo mensaje",
      ok: "false",
    });
    return;
  }
  /////////////////////////////////////
  //let datos = json(data);
  /*   console.log(data);
  for (const el of data) {
    let iditem = el.id_item;
    console.log("iditem", iditem);
    console.log("el.id_item", el.id_item);
    let idstock = 2;
    let total = 0;
    let ini = 0;
    let pro = 0;
    let oth = 0;
    let sal = 0;
    let sen = 0;
    let dam = 0;
    let def = 0;
    let ret = 0;
    let adj = 0;

    const resultNew2 = await Current_inventory_item.findOne({
      where: {
        id_item_current_inventory_item: iditem,
        id_stock_current_inventory_item: idstock,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_item.create({
        id_stock_current_inventory_item: idstock,
        id_item_current_inventory_item: iditem,
        total_current_inventory_item: total,
        initial: ini,
        production: pro,
        other_entries: oth,
        sales: sal,
        send_to_amazon: sen,
        damaged: dam,
        defeated: def,
        returned: ret,
        adjustment: adj,
      });
      console.log("segunda", resultNew3);

      //Object.entries(resultNew3).length === 0
      //  ? res.json({ message: "Register is not created" })
      //  : res.json({ message: resultNew3 });
      //return;
    }
  } */
  //////////////////////////////////////////////
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
    id_measure_item: req.body.idmeasureitem,
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
