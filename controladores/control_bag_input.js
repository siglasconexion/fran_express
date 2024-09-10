import { Bag_input } from '../db/models/bag_input.js';
import { Bag } from '../db/models/bag.js';
import { QueryTypes } from 'sequelize';
import {db} from '../db/conn.js';
import xlsxj from 'xlsx-to-json';
import fs from 'fs';

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
    `SELECT id_bag_input,id_bag_bag_input,quantity_received_bag_input,date_received_bag_input,comment_bag_input, stock_bag_input, units_received_bag_input, name_bag FROM bag_input INNER JOIN bag on bag_input.id_bag_bag_input=bag.id_bag ORDER BY id_bag_input`,
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

export const createBag_input = async (req, res) => {
  const resultNew = await Bag_input.create({
    id_bag_bag_input: req.body.idbagbaginput,
    id_user_bag_input: req.body.iduserbaginput,
    quantity_received_bag_input: req.body.quantityreceivedbaginput,
    units_received_bag_input: req.body.unitsreceivedbaginput,
    date_received_bag_input: req.body.datereceivedbaginput,
    stock_bag_input: req.body.stockbaginput,
    comment_bag_input: req.body.commentbaginput,
  });
  if (Object.entries(resultNew).length === 0) {
    res.json({ message: "Register is not created" });
  } else {
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
    /* } catch (error) {
    console.log("aquir muestra la descripcion de error message", error.message);
    console.log("aquir el error stack", error.stack);
    console.log("aca el error erros", error.errors);
    console.log("aqui va el error de la funcion Create_stock_detail", error);
  } */
  }
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
  try {
    const id_bag_input = req.body.id;
    let resultDelete = await Bag_input.destroy({
      where: {
        id_bag_input,
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
    console.log(
      "previousStock",
      previousStock,
      "stockoilinput",
      req.body.stockbaginput,
      "actualStock",
      actualStock,
      "req.body.idbag",
      req.body.idbagbaginput
    );
    let obj = {
      stock_bag: actualStock,
    };
    const resultUpdate = await Bag.update(obj, {
      where: {
        id_bag: req.body.idbagbaginput,
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
  } catch (err) {
    console.log(err.stack);
  }
};
