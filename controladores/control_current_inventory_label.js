import {
  Current_inventory_label,
} from '../db/models/current_inventory_label.js';
import {db} from '../db/conn.js';
import { QueryTypes } from 'sequelize';
import { request } from 'http';
import _ from 'lodash';

export const getCurrent_inventorys_label = async (req, res) => {
  const data = await Current_inventory_label.findAll();
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

getCurrent_inventorys_label;

export const getCurrent_inventory_labelQuerySql2 = async (req, res) => {
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
    `SELECT  total_current_inventory_label, name_label, id_family_label, name_family, code_label, code_two_label from current_inventory_label INNER JOIN label on current_inventory_label.id_label_current_inventory_label=label.id_label INNER JOIN family on label.id_family_label=family.id_family where current_inventory_label.id_stock_current_inventory_label = ${variable4} ORDER BY name_family, name_label`,
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
export const getCurrent_inventory_labeldetailQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    `SELECT id_label_label_input as id_label, quantity_received_label_input as qty, date_received_label_input as received, stock_label_input as stock, comment_label_input as comment, units_received_label_input as units, name_label as name FROM label_input INNER JOIN label on id_label_label_input = id_label ORDER BY name,received`,
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
export const getCurrent_inventory_label = async (req, res) => {
  //quitar _ y usar camelcase
  console.log("ojo ver akika manin uno ", req.params);
  let variable = req.params.variable;
  console.log("ojo ver akika manin 2 ", req.query);
  let resultGetOne = await Current_inventory_label.findOne({
    where: {
      id_current_inventory_label: variable,
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

export const getCurrent_inventory_label_plus = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Current_inventory_label.findAll({
    where: {
      id_stock_current_inventory_label: variable,
    },
  });
  //console.log("verificar consiulta", resultGetOne);
  if (_.isEmpty(resultGetOne)) {
    return res.status(404).json({
      message: "Results not found",
      otramas: " esto tambien ",
      success: false,
    });
  }
  let prueba = "pasarla";
  let prueba2 = [1, 2, 3, 4, 5];
  //return res.status(200).json({ resultGetOne, success: true, prueba, prueba2 });
  return res.status(200).json(resultGetOne);
};

export const createCurrent_inventory_label = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Current_inventory_label.create({
    id_stock_current_inventory_label: req.body.idstockcurrentinventorylabel,
    id_label_current_inventory_label: req.body.idlabelcurrentinventorylabel,
    total_current_inventory_label: req.body.totalcurrentinventorylabel,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateCurrent_inventory_label = async (req, res) => {
  try {
    const obj = req.body;
    const id_current_inventory_label = req.body.id_current_inventory_label;
    let resultUpdate = await Current_inventory_label.update(obj, {
      where: {
        id_current_inventory_label: id_current_inventory_label,
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

export const deleteCurrent_inventory_label = async (req, res) => {
  try {
    console.log(req.body);
    const id_label_current_inventory_label = req.body.id;
    let resultDelete = await Current_inventory_label.destroy({
      where: {
        id_label_current_inventory_label,
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
