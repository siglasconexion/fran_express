import { Current_inventory } from "../db/models/current_inventory.js";
import db from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";
import { request } from "http";
import _ from "lodash";
export const getCurrent_inventorys = async (req, res) => {
  const data = await Current_inventory.findAll();
  if (data.length <= 0) {
    res.status(201).json({
      code: 201,
      message: "Results not foundssdsdasdasd",
      statusText: "nuevo mensaje",
      ok: "false",
    });
    return;
  }
  const jsonData = data.map((result) => result.toJSON());
  console.log("akika backend ", jsonData);
  res.status(200).json(data);
};

export const getCurrent_inventoryQuerySql2 = async (req, res) => {
  // rutas - routes
  const data = await db.sequelize.query(
    "SELECT  id_stock_detail, id_item_stock_detail, id_container_stock_detail, id_place_stock_detail, id_stock_stock_detail, qty_container_stock_detail, units_stock_detail, total_stock_detail, name_item, code_item, name_container, qty_container FROM `stock_detail` INNER join item on stock_detail.id_item_stock_detail=item.id_item INNER JOIN container on stock_detail.id_container_stock_detail=id_container"
  ); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getCurrent_inventory = async (req, res) => {
  //quitar _ y usar camelcase
  console.log("ojo ver akika manin uno ", req.params);
  let variable = req.params.variable;
  console.log("ojo ver akika manin 2 ", req.query);
  let resultGetOne = await Current_inventory.findOne({
    where: {
      id_current_inventory: variable,
    },
  });
  //console.log("aca no veo nada", resultGetOne);
  if (_.isEmpty(resultGetOne)) {
    return res.status(404).json({
      message: "Results not found",
      otramas: " esto tambien ",
    });
  }
  //console.error("error del getone", resultGetOne);
  return res.status(200).json(resultGetOne);
};

export const createCurrent_inventory = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Current_inventory.create({
    id_stock_current_inventory: req.body.idstockcurrentinventory,
    id_item_current_inventory: req.body.iditemcurrentinventory,
    total_current_inventory: req.body.totalcurrentinventory,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};
export const updateCurrent_inventory = async (req, res) => {
  try {
    const obj = req.body;
    const id_current_inventory = req.body.id_current_inventory;
    let resultUpdate = await Current_inventory.update(obj, {
      where: {
        id_current_inventory: id_current_inventory,
      },
    });
    //res.json({ message: "User Update successfully" });
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
    //console.log("aca solo el error", err);
  }
};

export const deleteCurrent_inventory = async (req, res) => {
  try {
    console.log(req.body);
    const id_item_current_inventory = req.body.id;
    let resultDelete = await Current_inventory.destroy({
      where: {
        id_item_current_inventory,
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
