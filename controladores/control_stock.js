import { Stock } from "../db/models/stock.js";
import db from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export const getStocks = async (req, res) => {
  const data = await Stock.findAll();
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

export const getStockQuerySql2 = async (req, res) => {
  // rutas - routes
  const data = await db.sequelize.query("SELECT  * from stock"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getStock = async (req, res) => {
  let resultGetOne = await Stock.findAll({
    where: {
      id_status_stock: 1,
    },
  });
  console.log("aca no veo nada", resultGetOne);
  //if (resultGetOne.length <= 0) {
  //  res.json({
  message: "Results not found",
    // });
    //  return;
    // }
    res.json(resultGetOne);
  // res.json(resultGetOne, "otra cosa");
};

export const createStock = async (req, res) => {
  const resultNew = await Stock.create({
    id_company_stock: req.body.idcompanystock,
    id_status_stock: req.body.idstatusstock,
    id_user_stock: req.body.iduserstock,
    start_date_stock: req.body.startdatestock,
    end_date_stock: req.body.enddatestock,
    comment_stock: req.body.commentstock,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};
export const updateStock = async (req, res) => {
  try {
    const obj = req.body;
    const id_stock = req.body.id_stock;
    let resultUpdate = await Stock.update(obj, {
      where: {
        id_stock: id_stock,
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

export const deleteStock = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock = req.body.id;
    let resultDelete = await Stock.destroy({
      where: {
        id_stock,
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
