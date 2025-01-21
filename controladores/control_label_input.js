import { Label_input } from "../db/models/label_input.js";
import { Label } from "../db/models/label.js";
import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export const getLabel_inputs = async (req, res) => {
  const data = await Label_input.findAll();
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

export const getLabel_inputQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    `SELECT id_label_input,id_label_label_input,quantity_received_label_input,date_received_label_input,comment_label_input, stock_label_input, id_stock,units_received_label_input, name_label FROM label_input INNER JOIN label on label_input.id_label_label_input=label.id_label ORDER BY id_label_input`,
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

export const getLabel_input = async (req, res) => {
  let resultGetOne = await Label_input.findAll({
    where: {
      id_label_input: req.body.id,
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

export const getLabel_inputs_Stock = async (req, res) => {
  console.log("req.params", req.params);
  let idlabel = req.params.idlabel;
  let idstock = req.params.idstock;
  const resultGetOne = await db.sequelize.query(
    `SELECT id_label_input, id_label_label_input, id_user_label_input, id_stock, date_received_label_input as date, stock_label_input as total, comment_label_input, name_user from label_input INNER JOIN user on label_input.id_user_label_input = user.id_user WHERE label_input.id_label_label_input =  ${idlabel} AND label_input.id_stock = ${idstock}`,
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

export const createLabel_input = async (req, res) => {
  let resAllQuerys = [];
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  let idStockLabel = 0;
  try {
    // leer la tabla stock_label para buscar el id del stock activo y actualizar las tablas
    const data2 = await db.sequelize.query(
      `SELECT * from stock_label where closed_stock_label IS NULL`,
      {
        type: QueryTypes.SELECT,
      }
    );
    for (const el of data2) {
      idStockLabel = el.id_stock_label;
    }
    // fin tabla stock_label
    const resultNew = await Label_input.create(
      {
        id_label_label_input: req.body.idlabellabelinput,
        id_user_label_input: req.body.iduserlabelinput,
        id_stock: idStockLabel,
        quantity_received_label_input: req.body.quantityreceivedlabelinput,
        units_received_label_input: req.body.unitsreceivedlabelinput,
        date_received_label_input: req.body.datereceivedlabelinput,
        stock_label_input: req.body.stocklabelinput,
        comment_label_input: req.body.commentlabelinput,
      },
      { type: QueryTypes.INSERT, transaction }
    );
    if (Object.entries(resultNew).length === 0) {
      res.json({ message: "Register is not created" });
    } else {
      resAllQuerys.push({ Label_input: "creado correctamente" });
      resAllQuerys.push({ Label_input: resultNew });
      //: res.json({ message: resultNew });
      const resultNew2 = await Label.findOne({
        where: {
          id_label: req.body.idlabellabelinput,
        },
      });
      let convertResultNew2 = resultNew2?.toJSON();
      let previousStock = convertResultNew2.stock_label;
      if (previousStock === null) {
        previousStock = 0;
      }

      let totalStock =
        parseFloat(req.body.stocklabelinput) + parseFloat(previousStock);
      console.log(
        "previousStock",
        previousStock,
        "stockoilinput",
        req.body.stocklabelinput,
        "totalStock",
        totalStock,
        "idessentialoiloilinput",
        req.body.idlabellabelinput
      );
      let obj = {
        stock_label: totalStock,
      };
      const resultUpdate = await Label.update(obj, {
        where: {
          id_label: req.body.idlabellabelinput,
        },
        type: QueryTypes.UPDATE,
        transaction,
      });
      resAllQuerys.push({ label: "actualizado correctamente" });
      resAllQuerys.push({ label: resultUpdate });
      // actulizar la tabla current_inventory_label
      const resultNew4 = await db.sequelize.query(
        ` UPDATE current_inventory_label SET purchase = purchase + ${req.body.stocklabelinput} WHERE id_stock_current_inventory_label = ${idStockLabel} AND id_label_current_inventory_label = ${req.body.idlabellabelinput}`,
        {
          type: QueryTypes.UPDATE,
          transaction,
        }
      );
      resAllQuerys.push({
        current_inventory_label: "actualizado correctamente",
      });
      resAllQuerys.push({ current_inventory_label: resultNew4 });
      // fin tabla current_inventory_label
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

export const updateLabel_input = async (req, res) => {
  try {
    const obj = req.body;
    const id_label_input = req.body.id_label_input;
    let resultUpdate = await Label_input.update(obj, {
      where: {
        id_label_input: id_label_input,
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

export const deleteLabel_input = async (req, res) => {
  let resAllQuerys = [];
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  const id_label_input = req.body.id;
  const idStock = req.body.idstock;

  try {
    let resultDelete = await Label_input.destroy({
      where: {
        id_label_input,
      },
      type: QueryTypes.DELETE,
      transaction,
    });
    resAllQuerys.push({
      label_input: "eliminado correctamente",
    });
    resAllQuerys.push({ label_input: resultDelete });
    const resultNew2 = await Label.findOne({
      where: {
        id_label: req.body.idlabellabelinput,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    let previousStock = convertResultNew2.stock_label;
    if (previousStock === null) {
      previousStock = 0;
    }
    let actualStock =
      parseFloat(previousStock) - parseFloat(req.body.stocklabelinput);
    let obj = {
      stock_label: actualStock,
    };
    const resultUpdate = await Label.update(obj, {
      where: {
        id_label: req.body.idlabellabelinput,
      },
      type: QueryTypes.UPDATE,
      transaction,
    });
    resAllQuerys.push({
      label: "actualizado correctamente",
    });
    resAllQuerys.push({ label: resultUpdate });
    // actulizar la tabla current_inventory_label
    const resultNew4 = await db.sequelize.query(
      ` UPDATE current_inventory_label SET purchase = purchase - ${req.body.stocklabelinput} WHERE id_stock_current_inventory_label = ${idStock} AND id_label_current_inventory_label = ${req.body.idlabellabelinput}`,
      {
        type: QueryTypes.UPDATE,
        transaction,
      }
    );
    resAllQuerys.push({
      current_inventory_label: "actualizado correctamente",
    });
    resAllQuerys.push({ current_inventory_label: resultNew4 });
    // fin tabla current_inventory_label
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
