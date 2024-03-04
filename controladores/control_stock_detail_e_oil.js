const { Stock_detail_e_oil } = require("../db/models/stock_detail_e_oil.js");
const {
  Current_inventory_e_oil,
} = require("../db/models/current_inventory_e_oil.js");

const db = require("../db/conn.js");
const _ = require("lodash");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");
const { QueryTypes } = require("sequelize");
const getStock_details_e_oil = async (req, res) => {
  const data = await Stock_detail_e_oil.findAll();
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

const getStock_detail_e_oilQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    "SELECT id_stock_detail_e_oil, id_stock_stock_detail_e_oil , id_e_oil_stock_detail_e_oil, qty_container_one_stock_detail_e_oil, name_essential_oil FROM stock_detail_e_oil INNER JOIN essential_oil ON id_e_oil_stock_detail_e_oil=id_essential_oil ORDER BY id_stock_detail_e_oil ",
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

const getStock_detail_e_oil = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Stock_detail_e_oil.findOne({
    // select * from Stock_detail_item
    where: {
      id_e_oil_stock_detail_e_oil: variable,
    },
  });
  let convertResultNew2 = resultGetOne?.toJSON();
  /*  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  } */
  console.log("ver aqui", convertResultNew2);
  if (_.isEmpty(convertResultNew2)) {
    res.status(201).json({
      code: 201,
      message: "Results not foundssdsdasdasd",
      statusText: "nuevo mensaje",
      ok: "false",
    });
    return;
  }
  res.json(resultGetOne);
  //res.json({ resultGetOne, d: "probando" });
};

const createStock_detail_e_oil = async (req, res) => {
  //  if (req.body.idhelpercontainerstockdetaileoil)
  try {
    await Stock_detail_e_oil.create({
      id_stock_stock_detail_e_oil: req.body.idstockstockdetaileoil,
      id_e_oil_stock_detail_e_oil: req.body.ideoilstockdetaileoil,
      id_container_one_stock_detail_e_oil:
        req.body.idcontaineronestockdetaileoil,
      id_container_two_stock_detail_e_oil:
        req.body.idcontainertwostockdetaileoil,
      id_helper_container_stock_detail_e_oil:
        req.body.idhelpercontainerstockdetaileoil,
      qty_container_one_stock_detail_e_oil:
        req.body.qtycontaineronestockdetaileoil,
      qty_container_two_stock_detail_e_oil:
        req.body.qtycontainertwostockdetaileoil,
      qty_helper_container_stock_detail_e_oil:
        req.body.qtyhelpercontainerstockdetaileoil,
    });

    const resultNew2 = await Current_inventory_e_oil.findOne({
      where: {
        id_e_oil_current_inventory_e_oil: req.body.ideoilstockdetaileoil,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_e_oil.create({
        id_stock_current_inventory_e_oil: req.body.idstockstockdetaileoil,
        id_e_oil_current_inventory_e_oil: req.body.ideoilstockdetaileoil,
        total_current_inventory_e_oil: req.body.totalstockdetaileoil,
      });
      console.log("segunda", resultNew3);

      Object.entries(resultNew3).length === 0
        ? res.json({ message: "Register is not created" })
        : res.json({ message: resultNew3 });
      return;
    }

    let previousTotal = convertResultNew2.total_current_inventory_e_oil;

    let totalNew =
      parseFloat(req.body.totalstockdetaileoil) + parseFloat(previousTotal);

    let obj = {
      id_stock_current_inventory_e_oil: req.body.idstockstockdetaileoil,
      id_e_oil_current_inventory_e_oil: req.body.ideoilstockdetaileoil,
      total_current_inventory_e_oil: totalNew,
    };
    const resultUpdate = await Current_inventory_e_oil.update(obj, {
      where: {
        id_e_oil_current_inventory_e_oil: req.body.ideoilstockdetaileoil,
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
};

const updateStock_detail_e_oil = async (req, res) => {
  try {
    const obj = req.body;
    const id_stock_detail_e_oil = req.body.id_stock_detail_e_oil;
    let resultUpdate = await Stock_detail_e_oil.update(obj, {
      where: {
        id_stock_detail_e_oil: id_stock_detail_e_oil,
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
    res.status(400).json({
      error: "valor demasiado grande",
      message: "Status not successfully",
    });
    console.log(err.stack);
    console.log("aca solo el error", err);
  }
};

const deleteStock_detail_e_oil = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_detail_e_oil = req.body.id;
    const id_stock_stock_detail_e_oil = req.body.idstock;

    let resultDelete = await Stock_detail_e_oil.destroy({
      where: {
        id_stock_detail_e_oil,
        id_stock_stock_detail_e_oil,
      },
    });
    if (resultDelete === 1) {
      res.status(200).json({
        message: "Status Update successfully",
        resultDelete: resultDelete,
      });
    } else {
      console.log("cono porque entre akika");
      res.status(400).json({
        error: "valor demasiado grande",
        message: "Status not successfully",
        resultDelete: resultDelete,
      });
    }
    let resultDelete2 = await Current_inventory_e_oil.destroy({
      where: {
        id_e_oil_current_inventory_e_oil: req.body.ideoil,
        id_stock_current_inventory_e_oil: req.body.idstock,
      },
    });
    if (resultDelete2 === 1) {
      res.status(200).json({
        message: "Status Update successfully",
        resultDelete2: resultDelete2,
      });
    } else {
      console.log("cono porque entre akika en current inventory");
      res.status(400).json({
        error: "valor demasiado grande",
        message: "Status not successfully",
        resultDelete2: resultDelete2,
      });
    }

    return res.json();
  } catch (err) {
    console.log(err.stack);
    console.log("otro error", err.error);
  }
};

module.exports = {
  getStock_details_e_oil,
  getStock_detail_e_oilQuerySql2,
  getStock_detail_e_oil,
  createStock_detail_e_oil,
  updateStock_detail_e_oil,
  deleteStock_detail_e_oil,
};
