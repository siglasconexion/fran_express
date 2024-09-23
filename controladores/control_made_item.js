import { Made_item } from "../db/models/made_item.js";
import { Move_refill } from "../db/models/move_refill.js";
import { Type_inventory } from "../db/models/type_inventory.js";

import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";
import _ from "lodash";

export const getMade_items = async (req, res) => {
  const data = await Made_item.findAll();
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

export const getMade_item = async (req, res) => {
  let resultGetOne = await Made_item.findAll({
    where: {
      id_made_item: req.body.id,
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

export const createMade_item = async (req, res) => {
  //  console.log("req", req.body);
  //  console.log("req,body.arrayessentialoil", req.body.arrayessentialoil);
  let idusertwo = req.body.idusertwomadeitem;
  let oils = req.body.arrayessentialoil;
  if (idusertwo === "") {
    idusertwo = null;
  }
  let resAllQuerys = [];
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  try {
    const resultNewItem = await Made_item.create(
      {
        id_company_made_item: req.body.idcompanymadeitem,
        id_status_made_item: req.body.idstatusmadeitem,
        id_user_made_item: req.body.idusermadeitem,
        id_user_two_made_item: idusertwo,
        id_user_end_made_item: req.body.iduserendmadeitem,
        id_item_made_item: req.body.iditemmadeitem,
        start_date_made_item: req.body.startdatemadeitem,
        end_date_made_item: req.body.enddatemadeitem,
        sleeves_made_item: req.body.sleevesmadeitem,
        qty_made_item: req.body.qtymadeitem,
        batch_made_item: req.body.batchmadeitem,
        wet_lab_made_item: req.body.wetlabmadeitem,
        labeling_made_item: req.body.labelingmadeitem,
        heat_seal_made_item: req.body.heatsealmadeitem,
        sample_made_item: req.body.samplemadeitem,
        essential_oil_made_item: req.body.essentialoilmadeitem,
        carier_oil_made_item: req.body.carieroilmadeitem,
        ingredient_made_item: req.body.ingredientmadeitem,
        base_oil_made_item: req.body.baseoilmadeitem,
        concentrated_oil_made_item: req.body.concentratedoilmadeitem,
        other_refill_made_item: req.body.otherrefillmadeitem,
        observation_made_item: req.body.observationmadeitem,
      },
      { type: QueryTypes.INSERT, transaction }
    );
    // console.log("oils", oils);
    //console.log("vergacion", resultNewItem);
    let convert = resultNewItem?.toJSON(); // para obtener el id_creado
    //console.log("resultNew", convert);
    //console.log("elemento de resultNew", convert.id_made_item);
    //console.log("resultNew", resultNew);
    //await transaction.rollback(); // Revierte la transacción en caso de error
    respuestas[`respuesta${convert.id_made_item}`] = {};
    //console.log("respuestas", respuestas);
    resAllQuerys.push({ made_item: "creado correctamente" });
    for (const el of oils) {
      // recorro el array (oils) para crear los refill
      const resultNewMoveRefill = await Move_refill.create(
        {
          id_user: req.body.idusermadeitem,
          id_type_recharge: 1,
          id_product: el.idoil,
          id_made_item: convert.id_made_item,
          date: req.body.startdatemadeitem,
          qty_refill: el.qty,
          observation: el.observation,
        },
        { type: QueryTypes.INSERT, transaction }
      );
      resAllQuerys.push({ oil_refill: "creado correctamente" });
    }
    let base = "type_inventory";
    const data = await db.sequelize.query(
      `SELECT id_part, id_type_inventory, qty, name, name_table, name_table_two from item_part INNER JOIN type_inventory on item_part.id_type_inventory = type_inventory.id where item_part.id_item =  ${req.body.iditemmadeitem}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const resultNew2 = await db.sequelize.query(
      ` UPDATE item SET stock_item = stock_item + ${req.body.totalmade} WHERE item.id_item = ${req.body.iditemmadeitem}`,
      {
        //replacements: { `${campoStock}`, stockItem }, // Reemplazos seguros para evitar inyección SQL
        type: QueryTypes.UPDATE, // Tipo de consulta
        transaction, // Asocia la transacción a la consulta, si es necesario
      }
    );
    for (const el of data) {
      if (el.type_inventory !== 1) {
        let cant = req.body.totalmade;
        let nameTable = el.name_table;
        nameTable = nameTable.trim();
        let campoStock = `stock_` + nameTable;
        let campoId = `id_` + nameTable;
        const resultNew2 = await db.sequelize.query(
          ` UPDATE ${nameTable} SET ${campoStock} = ${campoStock} - ${cant} WHERE ${nameTable}.${campoId} = ${el.id_part}`,
          {
            //replacements: { `${campoStock}`, stockItem }, // Reemplazos seguros para evitar inyección SQL
            type: QueryTypes.UPDATE, // Tipo de consulta
            transaction, // Asocia la transacción a la consulta, si es necesario
          }
        );
        /* 
        `UPDATE item SET stock_item = stock_item + :cantidad WHERE id_item = :idItem`;
  
        const result22222 = await db.sequelize.query(
          `INSERT INTO ${el.name_table} (nombre_item, stock_item) VALUES (:nombreItem, :stockItem)`
        );
        console.log(el.name); */
      }
    }
    //console.log("resAllQuerys", resAllQuerys);
    //console.log("transaction", transaction.id);
    //await transaction.rollback(); // Revierte la transacción en caso de error
    await transaction.commit(); // Confirma la transacción
    ///    Object.entries(resultNew).length === 0
    ///      ? res.json({ message: "Register is not created" })
    ///      : res.json({ message: resultNew });
  } catch (error) {
    await transaction.rollback(); // Revierte la transacción en caso de error
    //console.log("error ojo mosca akika ", error.stack);
    console.log("error ojo mosca akika ", error.message);
    // await transaction.rollback(); // Revierte la transacción en caso de error
    //console.log("error", error);
    //    res.status(500).json({
    res.status(400).json({
      message: "Register is not created.....................",
      details: error.message,
      error: error.stack,
      status: "false",
    });
  }
  //  Object.entries(resultNew).length === 0
  //    ? res.json({ message: "Register is not created" })
  //    : res.json({ message: resultNew });
  res.json({ message: resAllQuerys });
};

export const updateMade_item = async (req, res) => {
  try {
    const obj = req.body;
    const id_made_item = req.body.id_made_item;
    let resultUpdate = await Item.update(obj, {
      where: {
        id_made_item: id_made_item,
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

export const deleteMade_item = async (req, res) => {
  try {
    const id_made_item = req.body.id;
    let resultDelete = await Made_item.destroy({
      where: {
        id_made_item,
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
