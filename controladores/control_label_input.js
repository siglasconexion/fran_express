import { Label_input } from '../db/models/label_input.js';
import { Label } from '../db/models/label.js';
import { QueryTypes } from 'sequelize';
import {db} from '../db/conn.js';
import xlsxj from 'xlsx-to-json';
import fs from 'fs';

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
    `SELECT id_label_input,id_label_label_input,quantity_received_label_input,date_received_label_input,comment_label_input, stock_label_input, units_received_label_input, name_label FROM label_input INNER JOIN label on label_input.id_label_label_input=label.id_label ORDER BY id_label_input`,
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

export const createLabel_input = async (req, res) => {
  const resultNew = await Label_input.create({
    id_label_label_input: req.body.idlabellabelinput,
    id_user_label_input: req.body.iduserlabelinput,
    quantity_received_label_input: req.body.quantityreceivedlabelinput,
    units_received_label_input: req.body.unitsreceivedlabelinput,
    date_received_label_input: req.body.datereceivedlabelinput,
    stock_label_input: req.body.stocklabelinput,
    comment_label_input: req.body.commentlabelinput,
  });
  if (Object.entries(resultNew).length === 0) {
    res.json({ message: "Register is not created" });
  } else {
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
  try {
    const id_label_input = req.body.id;
    let resultDelete = await Label_input.destroy({
      where: {
        id_label_input,
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
    console.log(
      "previousStock",
      previousStock,
      "stockoilinput",
      req.body.stocklabelinput,
      "actualStock",
      actualStock,
      "req.body.idessentialoil",
      req.body.idlabellabelinput
    );
    let obj = {
      stock_label: actualStock,
    };
    const resultUpdate = await Label.update(obj, {
      where: {
        id_label: req.body.idlabellabelinput,
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
