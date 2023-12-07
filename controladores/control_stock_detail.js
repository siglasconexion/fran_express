import { Stock_detail } from "../db/models/stock_detail.js";
import db from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export const getStock_details = async (req, res) => {
  const data = await Stock_detail.findAll();
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

export const getStock_detailQuerySql2 = async (req, res) => {
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

export const getStock_detail = async (req, res) => {
  let resultGetOne = await Stock_detail.findAll({
    where: {
      id_stock_detail: req.body.id,
    },
  });
  console.log("aca no veo nada", resultGetOne);
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  }
  res.json(resultGetOne);
};

export const createStock_detail = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Stock_detail.create({
    id_stock_stock_detail: req.body.idstockstockdetail,
    id_item_stock_detail: req.body.iditemstockdetail,
    id_place_stock_detail: req.body.idplacestockdetail,
    id_container_stock_detail: req.body.idcontainerstockdetail,
    qty_container_stock_detail: req.body.qtycontainerstockdetail,
    units_stock_detail: req.body.unitsstockdetail,
    total_stock_detail: req.body.totalstockdetail,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};
export const updateStock_detail = async (req, res) => {
  try {
    const obj = req.body;
    const id_stock_detail = req.body.id_stock_detail;
    let resultUpdate = await Stock_detail.update(obj, {
      where: {
        id_stock_detail: id_stock_detail,
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
    console.log("aca solo el error", err);
  }
};

export const deleteStock_detail = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_detail = req.body.id;
    const id_stock_stock_detail = req.body.idstock;
    let resultDelete = await Stock_detail.destroy({
      where: {
        id_stock_detail,
        id_stock_stock_detail,
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
