import { Move_inventory } from "../db/models/move_inventory.js";

import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";
import _ from "lodash";

export const getMove_inventorys = async (req, res) => {
  const data = await Move_inventory.findAll();
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

export const getMove_inventory = async (req, res) => {
  let resultGetOne = await Move_inventory.findAll({
    where: {
      id_move_inventory: req.body.id,
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

export const getMove_inventorys_Stock = async (req, res) => {
  console.log("req.params", req.params);
  let iditempart = req.params.iditempart;
  let idstock = req.params.idstock;
  let idtypeinventory = req.params.idtypeinventory;
  let idsection = req.params.idsection;
  let table = "";
  let campoid = "id_";
  let camponame = "name_";
  if (idtypeinventory == 4) {
    table = "bag";
    campoid = campoid + table;
    camponame = camponame + table;
  }
  if (idtypeinventory == 2) {
    table = "label";
    campoid = campoid + table;
    camponame = camponame + table;
  }
  if (idtypeinventory == 3) {
    table = "pakage";
    campoid = campoid + table;
    camponame = camponame + table;
  }
  if (idtypeinventory == 1) {
    table = "item";
    campoid = campoid + table;
    camponame = camponame + table;
  }

  const resultGetOne = await db.sequelize.query(
    `SELECT id, date, qty as total, id_process, id_part, id_user_made_item, id_user_two_made_item, id_item_made_item, ${camponame} from move_inventory INNER JOIN made_item on move_inventory.id_process = made_item.id_made_item INNER JOIN ${table} on move_inventory.id_part = ${table}.${campoid} WHERE move_inventory.id_part =  ${iditempart} AND move_inventory.id_stock = ${idstock} AND id_type_inventory = ${idtypeinventory} AND id_section = ${idsection}`,
    {
      type: QueryTypes.SELECT,
    }
  );
  console.log("resultGetOne", resultGetOne);
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  }
  res.json(resultGetOne);
};



export const createMove_inventory = async (req, res) => {};

export const updateMove_inventory = async (req, res) => {
  try {
    const obj = req.body;
    const id = req.body.id;
    let resultUpdate = await Move_inventory.update(obj, {
      where: {
        id: id,
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

export const deleteMove_inventory = async (req, res) => {
  try {
    const id = req.body.id;
    let resultDelete = await Move_inventory.destroy({
      where: {
        id,
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
