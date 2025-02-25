import { Current_inventory_bag } from "../db/models/current_inventory_bag.js";
import { db } from "../db/conn.js";
import { QueryTypes } from "sequelize";
import { request } from "http";
import _ from "lodash";

export const getCurrent_inventory_bag_plus = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Current_inventory_bag.findAll({
    where: {
      id_stock_current_inventory_bag: variable,
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

export const getCurrent_inventorys_bag = async (req, res) => {
  const data = await Current_inventory_bag.findAll();
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

getCurrent_inventorys_bag;

export const getCurrent_inventory_bagQuerySql2 = async (req, res) => {
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
    `SELECT  total_current_inventory_bag, id_bag_current_inventory_bag, id_stock_current_inventory_bag, name_bag, id_family_bag,  name_family, code_bag, code_two_bag  from current_inventory_bag INNER JOIN bag on current_inventory_bag.id_bag_current_inventory_bag=bag.id_bag INNER JOIN family on bag.id_family_bag=family.id_family where current_inventory_bag.id_stock_current_inventory_bag = ${variable4} ORDER BY name_family, name_bag`,
    { type: QueryTypes.SELECT }
  );
  // rutina para chequear si lo introducido en el detalle cuadra con resumen
  /*   let arrayIntroducido = [];
  let totalIntroducido = 0;
  let diferenciaIntroducido = 0;
  let contador = 0;
  for (const el of data) {
    totalIntroducido = 0;
    diferenciaIntroducido = 0;
    contador = 0;
    const data2 = await db.sequelize.query(
      `SELECT qty_stock_detail_bag, id_stock_stock_detail_bag  from stock_detail_bag WHERE id_bag_stock_detail_bag = ${el.id_bag_current_inventory_bag} AND id_stock_stock_detail_bag = ${el.id_stock_current_inventory_bag}`,
      { type: QueryTypes.SELECT }
    );
    for (const el2 of data2) {
      totalIntroducido =
        totalIntroducido + parseFloat(el2.qty_stock_detail_bag);
      contador = contador + 1;
    }
    //console.log("data2", data2);
    diferenciaIntroducido = el.total_current_inventory_bag - totalIntroducido;
    if (diferenciaIntroducido !== 0) {
      arrayIntroducido.push(
        el.name_pakage,
        el.total_current_inventory_bag,
        totalIntroducido,
        diferenciaIntroducido,
        contador
      );
    }
    //console.log(mesalgo);
  }
  console.log("arrayIntroducido", arrayIntroducido); */
  // fin de la rutina
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  /*   // codigo temporal para actualizar la tabla item el stock
  let idBag = 0;
  let totalStock = 0;
  for (const el of data) {
    idBag = el.id_bag_current_inventory_bag;
    totalStock = el.total_current_inventory_bag;
    console.log("idBag", idBag, "totalStock", totalStock);
    const resultNew2 = await db.sequelize.query(
      ` UPDATE bag SET stock_bag = ${totalStock} WHERE bag.id_bag = ${idBag}`,
      {
        type: QueryTypes.UPDATE, // Tipo de consulta
      }
    );
    const resultNew3 = await db.sequelize.query(
      ` UPDATE current_inventory_bag SET initial = ${totalStock} WHERE current_inventory_bag.id_bag_current_inventory_bag = ${idBag} AND current_inventory_bag.id_stock_current_inventory_bag = ${variable4}`,
      {
        type: QueryTypes.UPDATE, // Tipo de consulta
      }
    );
  }
 */
  res.status(200).json(data);
  /* res.status(200).json({
    data: data,
    array: arrayIntroducido,
  }); */
};

export const getCurrent_inventory_BagReport = async (req, res) => {
  // rutas - routes
  let variable = req.params.variable;
  const data = await db.sequelize.query(
    `SELECT  *, total_current_inventory_bag, name_bag, id_family_bag, name_family from current_inventory_bag INNER JOIN bag on current_inventory_bag.id_bag_current_inventory_bag=bag.id_bag  INNER JOIN family on bag.id_family_bag = family.id_family where current_inventory_bag.id_stock_current_inventory_bag = ${variable} ORDER BY name_family, name_bag`,
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
export const getCurrent_inventory_bagdetailQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    `SELECT id_bag_bag_input as id_bag, quantity_received_bag_input as qty, date_received_bag_input as received, stock_bag_input as stock, comment_bag_input as comment, units_received_bag_input as units, name_bag as name FROM bag_input INNER JOIN bag on id_bag_bag_input = id_bag ORDER BY name,received`,
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
export const getCurrent_inventory_bag = async (req, res) => {
  //quitar _ y usar camelcase
  console.log("ojo ver akika manin uno ", req.params);
  let variable = req.params.variable;
  console.log("ojo ver akika manin 2 ", req.query);
  let resultGetOne = await Current_inventory_bag.findOne({
    where: {
      id_current_inventory_bag: variable,
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

export const createCurrent_inventory_bag = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Current_inventory_bag.create({
    id_stock_current_inventory_bag: req.body.idstockcurrentinventorybag,
    id_bag_current_inventory_bag: req.body.idbagcurrentinventorybag,
    total_current_inventory_bag: req.body.totalcurrentinventorybag,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateCurrent_inventory_bag = async (req, res) => {
  try {
    const obj = req.body;
    const id_current_inventory_bag = req.body.id_current_inventory_bag;
    let resultUpdate = await Current_inventory_bag.update(obj, {
      where: {
        id_current_inventory_bag: id_current_inventory_bag,
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

export const deleteCurrent_inventory_bag = async (req, res) => {
  try {
    console.log(req.body);
    const id_bag_current_inventory_bag = req.body.id;
    let resultDelete = await Current_inventory_bag.destroy({
      where: {
        id_bag_current_inventory_bag,
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
