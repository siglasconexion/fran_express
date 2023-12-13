import { Stock_detail } from "../db/models/stock_detail.js";
import { Current_inventory } from "../db/models/current_inventory.js";
import db from "../db/conn.js";
import _ from "lodash";
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
  //console.log("aca no veo nada", resultGetOne);
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  }
  res.json(resultGetOne);
};

/*
const create_stock_detail = async (req) => {
  try {
    await Stock_detail.create({
      // const resultNew =
      id_stock_stock_detail: req.body.idstockstockdetail,
      id_item_stock_detailsdasdfasdfasd: req.body.iditemstockdetail,
      id_place_stock_detail: req.body.idplacestockdetail,
      id_container_stock_detail: req.body.idcontainerstockdetail,
      qty_container_stock_detail: req.body.qtycontainerstockdetail,
      units_stock_detail: req.body.unitsstockdetail,
      total_stock_detail: req.body.totalstockdetail,
    });
  } catch (error) {
    // definir objeto de retorno 
  }
};
export const createStock_detail = async (req, res) => {
  //console.log("req.body", req.body);
  try {
   let resultadocreate = await create_stock_detail(req);

 */

export const createStock_detail = async (req, res) => {
  //console.log("req.body", req.body);
  try {
    await Stock_detail.create({
      // const resultNew =
      id_stock_stock_detail: req.body.idstockstockdetail,
      id_item_stock_detailsdasdfasdfasd: req.body.iditemstockdetail,
      id_place_stock_detail: req.body.idplacestockdetail,
      id_container_stock_detail: req.body.idcontainerstockdetail,
      qty_container_stock_detail: req.body.qtycontainerstockdetail,
      units_stock_detail: req.body.unitsstockdetail,
      total_stock_detail: req.body.totalstockdetail,
    });

    //console.log("cheqar el bdy", req.body.iditemstockdetail);
    const resultNew2 = await Current_inventory.findOne({
      where: {
        id_item_current_inventory: req.body.iditemstockdetail,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON(); // let variable = .toJSON
    let previousTotal = convertResultNew2.total_current_inventory;
    //return res.status(200).json(resultNew2);
    let resultNew3 = 0; // estaba declarada con const y no se podia reasignar abajo  cheaear porque la defini
    if (_.isEmpty(convertResultNew2)) {
      // resultNew2
      resultNew3 = await Current_inventory.create({
        id_stock_current_inventory: req.body.idstockstockdetail,
        id_item_current_inventory: req.body.iditemstockdetail,
        total_current_inventory: req.body.totalstockdetail,
      });

      Object.entries(resultNew3).length === 0
        ? res.json({ message: "Register is not created" })
        : res.json({ message: resultNew3 });
      return; // aqui retornamos la respuesta al from del create
    }
    let totalNew = parseInt(req.body.totalstockdetail) + previousTotal;
    /* console.log(totalNew);
    console.log(previousTotal);
    console.log(totalNew, previousTotal); */

    let obj = {
      id_stock_current_inventory: req.body.idstockstockdetail,
      id_item_current_inventory: req.body.iditemstockdetail,
      total_current_inventory: totalNew,
    };
    const resultUpdate = await Current_inventory.update(obj, {
      where: {
        id_item_current_inventory: req.body.iditemstockdetail,
      },
    });
    if (resultUpdate[0] === 1) {
      res.status(200).json({
        message: "Status Update successfully",
        resultUpdate: resultUpdate,
      });
    } else {
      res.status(400).json({
        error: "valor demasiado grande",
        message: "Status not successfully",
        resultUpdate: resultUpdate,
      });
    }
  } catch (error) {
    console.log("aquir muestra la descripcion de error message", error.message);
    console.log("aquir el error stack", error.stack);
    console.log("aca el error erros", error.errors);
    console.log("aqui va el error de la funcion Create_stock_detail", error);
  }
  // actualizo la tabla
  // respondo al from
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
      //throw { status: res.status, statusText: res.statusText };
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
