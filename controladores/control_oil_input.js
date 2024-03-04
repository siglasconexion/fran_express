const { Oil_input } = require("../db/models/oil_input.js");
const { Essential_oil } = require("../db/models/essential_oil.js");
const { QueryTypes } = require("sequelize");
const db = require("../db/conn.js");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");

const getOil_inputs = async (req, res) => {
  const data = await Oil_input.findAll();
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

const getOil_inputQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    `SELECT id_oil_input,id_essential_oil_oil_input,id_container_oil_input,quantity_received_oil_input,date_received_oil_input,comment_oil_input, in_use_oil_input, stock_oil_input, container_weight_oil_input, units_received_oil_input, tare_unit_oil_input, name_essential_oil, name_container FROM oil_input INNER JOIN essential_oil on oil_input.id_essential_oil_oil_input=essential_oil.id_essential_oil INNER JOIN container on oil_input.id_container_oil_input=container.id_container ORDER BY id_oil_input`,
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

const getOil_input = async (req, res) => {
  let resultGetOne = await Oil_input.findAll({
    where: {
      id_oil_input: req.body.id,
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

const createOil_input = async (req, res) => {
  const resultNew = await Oil_input.create({
    id_essential_oil_oil_input: req.body.idessentialoiloilinput,
    id_container_oil_input: req.body.idcontaineroilinput,
    id_user_oil_input: req.body.iduseroilinput,
    container_weight_oil_input: req.body.containerweightoilinput,
    quantity_received_oil_input: req.body.quantityreceivedoilinput,
    date_received_oil_input: req.body.datereceivedoilinput,
    in_use_oil_input: req.body.inuseoilinput,
    finish_oil_input: req.body.finishoilinput,
    stock_oil_input: req.body.stockoilinput,
    comment_oil_input: req.body.commentoilinput,
    in_use_oil_input: req.body.inuseoilinput,
    units_received_oil_input: req.body.unitsreceivedoilinput,
    tare_unit_oil_input: req.body.tareunitoilinput,
  });
  if (Object.entries(resultNew).length === 0) {
    res.json({ message: "Register is not created" });
  } else {
    //: res.json({ message: resultNew });
    const resultNew2 = await Essential_oil.findOne({
      where: {
        id_essential_oil: req.body.idessentialoiloilinput,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    let previousStock = convertResultNew2.stock_essential_oil_one;
    if (previousStock === null) {
      previousStock = 0;
    }

    let totalStock =
      parseFloat(req.body.stockoilinput) + parseFloat(previousStock);
    console.log(
      "previousStock",
      previousStock,
      "stockoilinput",
      req.body.stockoilinput,
      "totalStock",
      totalStock,
      "idessentialoiloilinput",
      req.body.idessentialoiloilinput
    );
    let obj = {
      stock_essential_oil_one: totalStock,
    };
    const resultUpdate = await Essential_oil.update(obj, {
      where: {
        id_essential_oil: req.body.idessentialoiloilinput,
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

const updateOil_input = async (req, res) => {
  try {
    const obj = req.body;
    const id_oil_input = req.body.id_oil_input;
    let resultUpdate = await Oil_input.update(obj, {
      where: {
        id_oil_input: id_oil_input,
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

const deleteOil_input = async (req, res) => {
  try {
    const id_oil_input = req.body.id;
    let resultDelete = await Oil_input.destroy({
      where: {
        id_oil_input,
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
    const resultNew2 = await Essential_oil.findOne({
      where: {
        id_essential_oil: req.body.idessentialoil,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    let previousStock = convertResultNew2.stock_essential_oil_one;
    if (previousStock === null) {
      previousStock = 0;
    }

    let actualStock =
      parseFloat(previousStock) - parseFloat(req.body.stockoilinput);
    console.log(
      "previousStock",
      previousStock,
      "stockoilinput",
      req.body.stockoilinput,
      "actualStock",
      actualStock,
      "req.body.idessentialoil",
      req.body.idessentialoil
    );
    let obj = {
      stock_essential_oil_one: actualStock,
    };
    const resultUpdate = await Essential_oil.update(obj, {
      where: {
        id_essential_oil: req.body.idessentialoil,
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

module.exports = {
  getOil_inputs,
  getOil_input,
  createOil_input,
  updateOil_input,
  deleteOil_input,
  getOil_inputQuerySql2,
};
