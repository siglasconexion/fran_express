const {
  Current_inventory_pakage,
} = require("../db/models/current_inventory_pakage.js");
const db = require("../db/conn.js");
const { QueryTypes } = require("sequelize");
const { request } = require("http");
const _ = require("lodash");

const getCurrent_inventorys_pakage = async (req, res) => {
  const data = await Current_inventory_pakage.findAll();
  if (data.length <= 0) {
    res.status(201).json({
      code: 201,
      message: "Results not foundssdsdasdasd",
      statusText: "nuevo mensaje",
      ok: "false",
    });
    return;
  }
  const jsonData = data.map((result) => result.toJSON());
  console.log("akika backend ", jsonData);
  res.status(200).json(data);
};

getCurrent_inventorys_pakage;

const getCurrent_inventory_pakageQuerySql2 = async (req, res) => {
  // rutas - routes
  let variablefinal = req.params.variable;
  let variable33 = req.params.variable;
  let variable2 = req.params;
  let variable3 = Object.values(variable2);
  let variable4 = variable3[0];
  console.log(
    "HEY CA LA VARIABLE",
    variable33,
    req.params,
    variable2,
    variable3,
    variable4,
    variablefinal
  );
  /* `SELECT id_essential_oil_oil_input as id_e_oil, quantity_received_oil_input as qty, date_received_oil_input as received, in_use_oil_input as in_use, stock_oil_input as stock, comment_oil_input as comment, name_essential_oil as name FROM oil_input INNER JOIN essential_oil on id_essential_oil_oil_input = id_essential_oil ORDER BY name`,
    {
      type: QueryTypes.SELECT,
    };
 */

  console.log("variable sola del objeto params", variablefinal);
  const data = await db.sequelize.query(
    `SELECT  total_current_inventory_pakage, name_pakage, id_family_pakage, name_family, code_pakage from current_inventory_pakage INNER JOIN pakage on current_inventory_pakage.id_pakage_current_inventory_pakage=pakage.id_pakage INNER JOIN family on pakage.id_family_pakage=family.id_family where current_inventory_pakage.id_stock_current_inventory_pakage = ${variable4} ORDER BY name_family, name_pakage`,
    { type: QueryTypes.SELECT }
  ); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

//*****************************
const getCurrent_inventory_pakagedetailQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    `SELECT id_pakage_pakage_input as id_pakage, quantity_received_pakage_input as qty, date_received_pakage_input as received, stock_pakage_input as stock, comment_pakage_input as comment, name_pakage as name FROM pakage_input INNER JOIN pakage on id_pakage_pakage_input = id_pakage ORDER BY name,received`,
    {
      type: QueryTypes.SELECT,
    }
  ); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  //console.log("json", data);
  res.status(200).json(data);
};

//**********************************
const getCurrent_inventory_pakage = async (req, res) => {
  //quitar _ y usar camelcase
  console.log("ojo ver akika manin uno ", req.params);
  let variable = req.params.variable;
  console.log("ojo ver akika manin 2 ", req.query);
  let resultGetOne = await Current_inventory_pakage.findOne({
    where: {
      id_current_inventory_pakage: variable,
    },
  });
  //console.log("aca no veo nada", resultGetOne);

  if (_.isEmpty(resultGetOne)) {
    return res.status(404).json({
      message: "Results not found",
      otramas: " esto tambien ",
      success: false,
    });
  }
  let prueba = "pasarla";
  let prueba2 = [1, 2, 3, 4, 5];

  //console.error("error del getone", resultGetOne);
  //return res.status(200).json({ ...resultGetOne.toJSON(), success: true });
  return res.status(200).json({ resultGetOne, success: true, prueba, prueba2 });
};

const createCurrent_inventory_pakage = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Current_inventory_pakage.create({
    id_stock_current_inventory_pakage: req.body.idstockcurrentinventorypakage,
    id_pakage_current_inventory_pakage: req.body.idlabelcurrentinventorypakage,
    total_current_inventory_pakage: req.body.totalcurrentinventorypakage,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateCurrent_inventory_pakage = async (req, res) => {
  try {
    const obj = req.body;
    const id_current_inventory_pakage = req.body.id_current_inventory_pakage;
    let resultUpdate = await Current_inventory_pakage.update(obj, {
      where: {
        id_current_inventory_pakage: id_current_inventory_pakage,
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
    //console.log("aca solo el error", err);
  }
};

const deleteCurrent_inventory_pakage = async (req, res) => {
  try {
    console.log(req.body);
    const id_pakage_current_inventory_pakage = req.body.id;
    let resultDelete = await Current_inventory_pakage.destroy({
      where: {
        id_pakage_current_inventory_pakage,
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

module.exports = {
  getCurrent_inventorys_pakage,
  getCurrent_inventory_pakageQuerySql2,
  getCurrent_inventory_pakagedetailQuerySql2,
  getCurrent_inventory_pakage,
  createCurrent_inventory_pakage,
  updateCurrent_inventory_pakage,
  deleteCurrent_inventory_pakage,
};
