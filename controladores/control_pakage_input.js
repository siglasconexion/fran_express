import { Pakage_input } from '../db/models/pakage_input.js';
import { Pakage } from '../db/models/pakage.js';
import { QueryTypes } from 'sequelize';
import {db} from '../db/conn.js';
import xlsxj from 'xlsx-to-json';
import fs from 'fs';

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
    `SELECT id_pakage_input,id_pakage_pakage_input,quantity_received_pakage_input,date_received_pakage_input,comment_pakage_input, stock_pakage_input, units_received_pakage_input, name_pakage FROM pakage_input INNER JOIN pakage on pakage_input.id_pakage_pakage_input=pakage.id_pakage ORDER BY id_pakage_input`,
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

export const createPakage_input = async (req, res) => {
  const resultNew = await Pakage_input.create({
    id_pakage_pakage_input: req.body.idpakagepakageinput,
    id_user_pakage_input: req.body.iduserpakageinput,
    quantity_received_pakage_input: req.body.quantityreceivedpakageinput,
    units_received_pakage_input: req.body.unitsreceivedpakageinput,
    date_received_pakage_input: req.body.datereceivedpakageinput,
    stock_pakage_input: req.body.stockpakageinput,
    comment_pakage_input: req.body.commentpakageinput,
  });
  if (Object.entries(resultNew).length === 0) {
    res.json({ message: "Register is not created" });
  } else {
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
    console.log(
      "previousStock",
      previousStock,
      "stockoilinput",
      req.body.stockpakageinput,
      "totalStock",
      totalStock,
      "idessentialoiloilinput",
      req.body.idpakagepakageinput
    );
    let obj = {
      stock_pakage: totalStock,
    };
    const resultUpdate = await Pakage.update(obj, {
      where: {
        id_pakage: req.body.idpakagepakageinput,
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
  try {
    const id_pakage_input = req.body.id;
    let resultDelete = await Pakage_input.destroy({
      where: {
        id_pakage_input,
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
    console.log(
      "previousStock",
      previousStock,
      "stockoilinput",
      req.body.stockpakageinput,
      "actualStock",
      actualStock,
      "req.body.idessentialoil",
      req.body.idpakagepakageinput
    );
    let obj = {
      stock_pakage: actualStock,
    };
    const resultUpdate = await Pakage.update(obj, {
      where: {
        id_pakage: req.body.idpakagepakageinput,
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
