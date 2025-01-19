import { Bag_input } from "../db/models/bag_input.js";
import { Bag } from "../db/models/bag.js";
import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export const getBag_inputs = async (req, res) => {
  const data = await Bag_input.findAll();
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

export const getBag_inputQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    `SELECT id_bag_input, id_bag_bag_input, quantity_received_bag_input, date_received_bag_input, comment_bag_input, stock_bag_input, units_received_bag_input, id_stock, name_bag FROM bag_input INNER JOIN bag on bag_input.id_bag_bag_input=bag.id_bag ORDER BY id_bag_input`,
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

export const getBag_input = async (req, res) => {
  let resultGetOne = await Bag_input.findAll({
    where: {
      id_bag_input: req.body.id,
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

export const getBag_inputs_Stock = async (req, res) => {
  console.log("req.params", req.params);
  let idbag = req.params.idbag;
  let idstock = req.params.idstock;
  const resultGetOne = await db.sequelize.query(
    `SELECT id_bag_input, id_bag_bag_input, id_user_bag_input, id_stock, date_received_bag_input as date, stock_bag_input as total, comment_bag_input, name_user from bag_input INNER JOIN user on bag_input.id_user_bag_input = user.id_user WHERE bag_input.id_bag_bag_input =  ${idbag} AND bag_input.id_stock = ${idstock}`,
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

export const createBag_input = async (req, res) => {
  let resAllQuerys = [];
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  let idStockBag = 0;
  try {
    // leer la tabla stock_bag para buscar el id del stock activo y actualizar las tablas
    const data2 = await db.sequelize.query(
      `SELECT * from stock_bag where closed_stock_bag IS NULL`,
      {
        type: QueryTypes.SELECT,
      }
    );
    for (const el of data2) {
      idStockBag = el.id_stock_bag;
    }
    // fin tabla stock_label
    const resultNew = await Bag_input.create(
      {
        id_bag_bag_input: req.body.idbagbaginput,
        id_user_bag_input: req.body.iduserbaginput,
        id_stock: idStockBag,
        quantity_received_bag_input: req.body.quantityreceivedbaginput,
        units_received_bag_input: req.body.unitsreceivedbaginput,
        date_received_bag_input: req.body.datereceivedbaginput,
        stock_bag_input: req.body.stockbaginput,
        comment_bag_input: req.body.commentbaginput,
      },
      { type: QueryTypes.INSERT, transaction }
    );
    if (Object.entries(resultNew).length === 0) {
      res.json({ message: "Register is not created" });
    } else {
      resAllQuerys.push({ Bag_input: "creado correctamente" });
      resAllQuerys.push({ Bag_input: resultNew });

      //: res.json({ message: resultNew });
      const resultNew2 = await Bag.findOne({
        where: {
          id_bag: req.body.idbagbaginput,
        },
      });
      let convertResultNew2 = resultNew2?.toJSON();
      let previousStock = convertResultNew2.stock_bag;
      if (previousStock === null) {
        previousStock = 0;
      }

      let totalStock =
        parseFloat(req.body.stockbaginput) + parseFloat(previousStock);
      console.log(
        "previousStock",
        previousStock,
        "stockoilinput",
        req.body.stockbaginput,
        "totalStock",
        totalStock,
        "idbagbaginput",
        req.body.idbagbaginput
      );
      let obj = {
        stock_bag: totalStock,
      };
      const resultUpdate = await Bag.update(obj, {
        where: {
          id_bag: req.body.idbagbaginput,
        },
        type: QueryTypes.UPDATE,
        transaction,
      });
      resAllQuerys.push({ Bag: "actualizado correctamente" });
      resAllQuerys.push({ Bag: resultUpdate });
      // actulizar la tabla current_inventory_bag
      const resultNew4 = await db.sequelize.query(
        ` UPDATE current_inventory_bag SET purchase = purchase + ${req.body.stockbaginput} WHERE id_stock_current_inventory_bag = ${idStockBag} AND id_bag_current_inventory_bag = ${req.body.idbagbaginput}`,
        {
          type: QueryTypes.UPDATE,
          transaction,
        }
      );
      resAllQuerys.push({
        current_inventory_bag: "actualizado correctamente",
      });
      resAllQuerys.push({ current_inventory_bag: resultNew4 });
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

export const updateBag_input = async (req, res) => {
  try {
    const obj = req.body;
    const id_bag_input = req.body.id_bag_input;
    let resultUpdate = await Bag_input.update(obj, {
      where: {
        id_bag_input: id_bag_input,
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

export const deleteBag_input = async (req, res) => {
  let resAllQuerys = [];
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  const id_bag_input = req.body.id;
  const idStock = req.body.idstock;
  try {
    let resultDelete = await Bag_input.destroy({
      where: {
        id_bag_input,
      },
      type: QueryTypes.DELETE,
      transaction,
    });
    resAllQuerys.push({
      bag_input: "eliminado correctamente",
    });
    resAllQuerys.push({ bag_input: resultDelete });
    const resultNew2 = await Bag.findOne({
      where: {
        id_bag: req.body.idbagbaginput,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    let previousStock = convertResultNew2.stock_bag;
    if (previousStock === null) {
      previousStock = 0;
    }

    let actualStock =
      parseFloat(previousStock) - parseFloat(req.body.stockbaginput);
    let obj = {
      stock_bag: actualStock,
    };
    const resultUpdate = await Bag.update(obj, {
      where: {
        id_bag: req.body.idbagbaginput,
      },
      type: QueryTypes.UPDATE,
      transaction,
    });
    resAllQuerys.push({
      bag: "actualizado correctamente",
    });
    resAllQuerys.push({ bag: resultUpdate });
    // actulizar la tabla current_inventory_bag
    const resultNew4 = await db.sequelize.query(
      ` UPDATE current_inventory_bag SET purchase = purchase - ${req.body.stockbaginput} WHERE id_stock_current_inventory_bag = ${idStock} AND id_bag_current_inventory_bag = ${req.body.idbagbaginput}`,
      {
        type: QueryTypes.UPDATE,
        transaction,
      }
    );
    resAllQuerys.push({
      current_inventory_bag: "actualizado correctamente",
    });
    resAllQuerys.push({ current_inventory_bag: resultNew4 });
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
