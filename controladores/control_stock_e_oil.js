const { Stock_e_oil } = require("../db/models/stock_e_oil.js");
const { Stock_detail_e_oil } = require("../db/models/stock_detail_e_oil.js");
const { Oil_input } = require("../db/models/oil_input.js");
const { Essential_oil } = require("../db/models/essential_oil.js");
const { QueryTypes } = require("sequelize");
const db = require("../db/conn.js");

const getStocks_e_oil = async (req, res) => {
  const data = await Stock_e_oil.findAll();
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

const getStock_e_oilQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from stock_e_oil"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getStock_e_oil = async (req, res) => {
  let resultGetOne = await Stock_e_oil.findAll({
    where: {
      id_status_stock_e_oil: 1,
    },
  });
  res.json(resultGetOne);
};

const createStock_e_oil = async (req, res) => {
  const resultNew = await Stock_e_oil.create({
    id_company_stock_e_oil: req.body.idcompanystockeoil,
    id_status_stock_e_oil: req.body.idstatusstockeoil,
    id_user_stock_e_oil: req.body.iduserstockeoil,
    start_date_stock_e_oil: req.body.startdatestockeoil,
    end_date_stock_e_oil: req.body.enddatestockeoil,
    comment_stock_e_oil: req.body.commentstockeoil,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateStock_e_oil = async (req, res) => {
  try {
    const obj = req.body;
    const id_stock_e_oil = req.body.id_stock_e_oil;
    let resultUpdate = await Stock_e_oil.update(obj, {
      where: {
        id_stock_e_oil: id_stock_e_oil,
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

const deleteStock_e_oil = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_e_oil = req.body.id;
    let resultDelete = await Stock_e_oil.destroy({
      where: {
        id_stock_e_oil,
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
const getStock_e_oil_closed = async (req, res) => {
  // rutas - routes
  let variablefinal = req.params.variable;
  console.log("HEY CA LA VARIABLE", variablefinal);
  console.log("variable sola del objeto params", variablefinal);
  const data = await db.sequelize.query(
    `SELECT  * from stock_detail_e_oil where id_stock_stock_detail_e_oil = ${variablefinal} ORDER BY id_e_oil_stock_detail_e_oil`,
    { type: QueryTypes.SELECT }
  ); //
  //  let convertResultNew2 = data?.toJSON();
  //console.log("primera consulta", data);
  const register = [];
  for (const el of data) {
    let rest = 0;
    let id = 0;
    let iditem = el.id_e_oil_stock_detail_e_oil;
    let spent = parseFloat(el.spent_stock_detail_e_oil);
    let spent0 = parseFloat(el.spent_stock_detail_e_oil);
    let resultNew2 = await db.sequelize.query(
      ` UPDATE essential_oil SET otro_stock = otro_stock - ${spent} WHERE essential_oil.id_essential_oil = ${iditem}`,
      { type: QueryTypes.UPDATE }
    );
    let resultNew3 = await db.sequelize.query(
      ` SELECT * FROM oil_input WHERE id_essential_oil_oil_input = ${iditem} ORDER BY date_received_oil_input`,
      { type: QueryTypes.SELECT }
    );
    //console.log("resultNew3", resultNew3);
    for (const el2 of resultNew3) {
      id = el2.id_oil_input;
      console.log("id_container_oil_input", el2.id_container_oil_input);
      console.log("id_user_oil_input", el2.id_user_oil_input);
      for (let i = 0; spent > 0; i++) {
        id = el2.id_oil_input;
        if (spent > parseFloat(el2.stock_oil_input)) {
          rest = 0;
          spent = spent - parseFloat(el2.stock_oil_input);
          register.push({
            stock_oil_input: rest,
            in_use_oil_input: 0,
            finish_oil_input: 1,
            date_end_oil_input: null,
            where: id,
            spent0: spent0,
            spent: spent,
            iditem: iditem,
            rest: rest,
            stock: el2.stock_oil_input,
          });
          break;
        } else {
          rest = parseFloat(el2.stock_oil_input) - spent;
          spent = 0;
          register.push({
            stock_oil_input: rest,
            in_use_oil_input: 1,
            finish_oil_input: 0,
            date_end_oil_input: null,
            comentario: "aca lo hizo al primero",
            where: id,
            spent0: spent0,
            spent: spent,
            iditem: iditem,
            rest: rest,
            stock: el2.stock_oil_input,
          });
        }
      }
    }
    //console.log("error para que se pare", errorparaquesepare);
  }
  console.log("register", register);
};

module.exports = {
  getStocks_e_oil,
  getStock_e_oilQuerySql2,
  getStock_e_oil,
  createStock_e_oil,
  updateStock_e_oil,
  deleteStock_e_oil,
  getStock_e_oil_closed,
};
