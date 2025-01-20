import { Pakage_input } from "../db/models/pakage_input.js";
import { Pakage } from "../db/models/pakage.js";
import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export const getPakage_inputs = async (req, res) => {
  const data = await Pakage_input.findAll();
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

export const getPakage_inputQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    `SELECT id_pakage_input,id_pakage_pakage_input,quantity_received_pakage_input,date_received_pakage_input,comment_pakage_input, stock_pakage_input, id_stock, units_received_pakage_input, name_pakage FROM pakage_input INNER JOIN pakage on pakage_input.id_pakage_pakage_input=pakage.id_pakage ORDER BY id_pakage_input`,
    { type: QueryTypes.SELECT }
  );
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getPakage_input = async (req, res) => {
  let resultGetOne = await Pakage_input.findAll({
    where: {
      id_pakage_input: req.body.id,
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

export const getPakage_inputs_Stock = async (req, res) => {
  console.log("req.params", req.params);
  let idpakage = req.params.idpakage;
  let idstock = req.params.idstock;
  const resultGetOne = await db.sequelize.query(
    `SELECT id_pakage_input, id_pakage_pakage_input, id_user_pakage_input, id_stock, date_received_pakage_input as date, stock_pakage_input as total, comment_pakage_input, name_user from pakage_input INNER JOIN user on pakage_input.id_user_pakage_input = user.id_user WHERE pakage_input.id_pakage_pakage_input =  ${idpakage} AND pakage_input.id_stock = ${idstock}`,
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

export const createPakage_input = async (req, res) => {
  let resAllQuerys = [];
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  let idStockPakage = 0;
  console.log("entre a pakage inputs........................");
  try {
    // leer la tabla stock_pakage para buscar el id del stock activo y actualizar las tablas
    const data2 = await db.sequelize.query(
      `SELECT * from stock_pakage where closed_stock_pakage IS NULL`,
      {
        type: QueryTypes.SELECT,
      }
    );
    for (const el of data2) {
      idStockPakage = el.id_stock_pakage;
    }
    // fin tabla stock_pakage
    const resultNew = await Pakage_input.create(
      {
        id_pakage_pakage_input: req.body.idpakagepakageinput,
        id_user_pakage_input: req.body.iduserpakageinput,
        id_stock: idStockPakage,
        quantity_received_pakage_input: req.body.quantityreceivedpakageinput,
        units_received_pakage_input: req.body.unitsreceivedpakageinput,
        date_received_pakage_input: req.body.datereceivedpakageinput,
        stock_pakage_input: req.body.stockpakageinput,
        comment_pakage_input: req.body.commentpakageinput,
      },
      { type: QueryTypes.INSERT, transaction }
    );
    if (Object.entries(resultNew).length === 0) {
      res.json({ message: "Register is not created" });
    } else {
      resAllQuerys.push({ Pakage_input: "creado correctamente" });
      resAllQuerys.push({ Pakage_input: resultNew });
      //: res.json({ message: resultNew });
      const resultNew2 = await Pakage.findOne({
        where: {
          id_pakage: req.body.idpakagepakageinput,
        },
      });
      let convertResultNew2 = resultNew2?.toJSON();
      let previousStock = convertResultNew2.stock_pakage;
      if (previousStock === null) {
        previousStock = 0;
      }

      let totalStock =
        parseFloat(req.body.stockpakageinput) + parseFloat(previousStock);
      let obj = {
        stock_pakage: totalStock,
      };
      const resultUpdate = await Pakage.update(obj, {
        where: {
          id_pakage: req.body.idpakagepakageinput,
        },
        type: QueryTypes.UPDATE,
        transaction,
      });
      resAllQuerys.push({ Pakage: "actualizado correctamente" });
      resAllQuerys.push({ Pakage: resultUpdate });
      // actulizar la tabla current_inventory_pakage
      const resultNew4 = await db.sequelize.query(
        ` UPDATE current_inventory_pakage SET purchase = purchase + ${req.body.stockpakageinput} WHERE id_stock_current_inventory_pakage = ${idStockPakage} AND id_pakage_current_inventory_pakage = ${req.body.idpakagepakageinput}`,
        {
          type: QueryTypes.UPDATE,
          transaction,
        }
      );
      resAllQuerys.push({
        current_inventory_pakage: "actualizado correctamente",
      });
      resAllQuerys.push({ current_inventory_pakage: resultNew4 });
      // fin tabla current_inventory_pakage
    }
    await transaction.commit(); // Confirma la transacción
  } catch (error) {
    await transaction.rollback(); // Revierte la transacción en caso de error
    console.log("error ojo mosca akika ", error.message);
    res.status(400).json({
      message: "Register is not created.....................",
      details: error.message,
      error: error.stack,
      status: "false",
      goods: resAllQuerys,
    });
  }
  res.json({ message: resAllQuerys });
};

export const updatePakage_input = async (req, res) => {
  try {
    const obj = req.body;
    const id_pakage_input = req.body.id_pakage_input;
    let resultUpdate = await Pakage_input.update(obj, {
      where: {
        id_pakage_input: id_pakage_input,
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

export const deletePakage_input = async (req, res) => {
  let resAllQuerys = [];
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  const id_pakage_input = req.body.id;
  const idStock = req.body.idstock;
  try {
    let resultDelete = await Pakage_input.destroy({
      where: {
        id_pakage_input,
      },
      type: QueryTypes.DELETE,
      transaction,
    });
    resAllQuerys.push({
      pakage_input: "eliminado correctamente",
    });
    resAllQuerys.push({ pakage_input: resultDelete });
    const resultNew2 = await Pakage.findOne({
      where: {
        id_pakage: req.body.idpakagepakageinput,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    let previousStock = convertResultNew2.stock_pakage;
    if (previousStock === null) {
      previousStock = 0;
    }
    let actualStock =
      parseFloat(previousStock) - parseFloat(req.body.stockpakageinput);
    let obj = {
      stock_pakage: actualStock,
    };
    const resultUpdate = await Pakage.update(obj, {
      where: {
        id_pakage: req.body.idpakagepakageinput,
      },
      type: QueryTypes.UPDATE,
      transaction,
    });
    resAllQuerys.push({
      pakage: "actualizado correctamente",
    });
    resAllQuerys.push({ pakage: resultUpdate });
    resAllQuerys.push({ bag: resultUpdate });
    // actulizar la tabla current_inventory_pakage
    const resultNew4 = await db.sequelize.query(
      ` UPDATE current_inventory_pakage SET purchase = purchase - ${req.body.stockpakageinput} WHERE id_stock_current_inventory_pakage = ${idStock} AND id_pakage_current_inventory_pakage = ${req.body.idpakagepakageinput}`,
      {
        type: QueryTypes.UPDATE,
        transaction,
      }
    );
    resAllQuerys.push({
      current_inventory_pakage: "actualizado correctamente",
    });
    resAllQuerys.push({ current_inventory_pakage: resultNew4 });
    // fin tabla current_inventory_pakage
    await transaction.commit(); // Confirma la transacción
  } catch (error) {
    await transaction.rollback(); // Revierte la transacción en caso de error
    console.log("error ojo mosca akika ", error.message);
    res.status(400).json({
      message: "Register is not created.....................",
      details: error.message,
      error: error.stack,
      status: "false",
      goods: resAllQuerys,
    });
  }
  res.json({ message: resAllQuerys });
};
