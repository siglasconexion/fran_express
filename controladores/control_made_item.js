import { Made_item } from "../db/models/made_item.js";
import { Move_refill } from "../db/models/move_refill.js";
import { Move_inventory } from "../db/models/move_inventory.js";
import { Stock_label } from "../db/models/stock_label.js";
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

export const getMade_items_Stock = async (req, res) => {
  console.log("req.params", req.params);
  let iditem = req.params.iditem;
  let idstock = req.params.idstock;
  const resultGetOne = await db.sequelize.query(
    `SELECT id_made_item, start_date_made_item as date, total_units_made_item as total, name_user, name_key_user, name_item from made_item INNER JOIN user on made_item.id_user_made_item = user.id_user INNER JOIN item on made_item.id_item_made_item = item.id_item WHERE made_item.id_item_made_item =  ${iditem} AND made_item.id_stock_made_item = ${idstock} `,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  }
  res.json(resultGetOne);
};

export const getMade_Item_Report = async (req, res) => {
  let idstock = req.params.idstock;
  const resultGetOne = await db.sequelize.query(
    `SELECT id_made_item, start_date_made_item as date, total_units_made_item as total, id_user_made_item, id_user_two_made_item, sleeves_made_item, qty_made_item, batch_made_item, id_stock_made_item, id_item_made_item, code_item, name_item from made_item INNER JOIN item on made_item.id_item_made_item = item.id_item WHERE made_item.id_stock_made_item = ${idstock} `,
    {
      type: QueryTypes.SELECT,
    }
  );
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
    // leer la tabla stock_item para buscar el id del stock activo y actualizar la tabla current inventory
    let idStockItem = 0;
    const data2 = await db.sequelize.query(
      `SELECT * from stock_item where closed_stock_item IS NULL`,
      {
        type: QueryTypes.SELECT,
      }
    );
    for (const el of data2) {
      idStockItem = el.id_stock_item;
    }
    // fin tabla stock_item
    let cant = req.body.totalmade;
    // incluir registros en la tabla made_item
    const resultNewItem = await Made_item.create(
      {
        id_company_made_item: req.body.idcompanymadeitem,
        id_status_made_item: req.body.idstatusmadeitem,
        id_user_made_item: req.body.idusermadeitem,
        id_user_two_made_item: idusertwo,
        id_user_end_made_item: req.body.iduserendmadeitem,
        id_item_made_item: req.body.iditemmadeitem,
        id_stock_made_item: idStockItem,
        start_date_made_item: req.body.startdatemadeitem,
        end_date_made_item: req.body.enddatemadeitem,
        sleeves_made_item: req.body.sleevesmadeitem,
        qty_made_item: req.body.qtymadeitem,
        total_units_made_item: req.body.totalmade,
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
    // fin tabla made_item
    let convert = resultNewItem?.toJSON(); // para obtener el id_creado
    //console.log("elemento de resultNew", convert.id_made_item);
    respuestas[`respuesta${convert.id_made_item}`] = {};
    resAllQuerys.push({ made_item: "creado correctamente" });
    // recorrer el array oil e incluir registros en la tabla move_refill
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
    // fin tabla move_refill
    // actualizar el stock en la tabla item del producto producido
    const resultNew2 = await db.sequelize.query(
      ` UPDATE item SET stock_item = stock_item + ${req.body.totalmade} WHERE item.id_item = ${req.body.iditemmadeitem}`,
      {
        type: QueryTypes.UPDATE, // Tipo de consulta
        transaction, // Asocia la transacción a la consulta, si es necesario
      }
    );
    // fin actualizacion tabla item
    // actulizar la tabla current_inventory_item
    const resultNew4 = await db.sequelize.query(
      ` UPDATE current_inventory_item SET production = production + ${cant} WHERE id_stock_current_inventory_item = ${idStockItem} AND id_item_current_inventory_item  = ${req.body.iditemmadeitem}`,
      {
        //replacements: { `${campoStock}`, stockItem }, // Reemplazos seguros para evitar inyección SQL
        type: QueryTypes.UPDATE, // Tipo de consulta
        transaction, // Asocia la transacción a la consulta, si es necesario
      }
    );
    // fin tabla current_inventory_item
    // generar datos desde la tabla item_part
    const data = await db.sequelize.query(
      `SELECT id_part, id_type_inventory, qty, name, name_table, name_table_two from item_part INNER JOIN type_inventory on item_part.id_type_inventory = type_inventory.id where item_part.id_item =  ${req.body.iditemmadeitem}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    // recorrer el array generado
    //let cant = 0;
    for (const el of data) {
      cant = req.body.totalmade * el.qty; // aca se multiplica por el valor de item_part
      let nameTable = el.name_table;
      nameTable = nameTable.trim();
      let campoStock = `stock_` + nameTable;
      let campoId = `id_` + nameTable;
      let nameTablaStock = `stock_` + nameTable;
      let closedStock = `closed_stock_` + nameTable;
      let idstock = `id_stock_` + nameTable;
      let idStockGlobal = 0;
      // extraer el idStockGlobal de la tabla stock_???? deacuerdo a las variables
      const stockData = await db.sequelize.query(
        `SELECT *, ${idstock} as idstockglobal from ${nameTablaStock} where ${closedStock} IS NULL`,
        {
          type: QueryTypes.SELECT,
        }
      );
      for (const el of stockData) {
        idStockGlobal = el.idstockglobal;
      }
      // fin de la tabla stock_?????
      // actualizar la tabla "pakage,bag,item,label"
      const resultNew2 = await db.sequelize.query(
        ` UPDATE ${nameTable} SET ${campoStock} = ${campoStock} - ${cant} WHERE ${nameTable}.${campoId} = ${el.id_part}`,
        {
          //replacements: { `${campoStock}`, stockItem }, // Reemplazos seguros para evitar inyección SQL
          type: QueryTypes.UPDATE, // Tipo de consulta
          transaction, // Asocia la transacción a la consulta, si es necesario
        }
      );
      // fin actualizar la tabla "pakage,bag,item,label"
      let nameTableTwo = `current_inventory_` + nameTable;
      nameTableTwo = nameTableTwo.trim();
      let idStockCI = `id_stock_current_Inventory_` + nameTable;
      let idNameTableCI = `id_` + nameTable + `_current_inventory_` + nameTable;
      let totalCI = `total_current_inventory_` + nameTable;
      // actualizar la tabla current_inventary_???
      let fieldUpdate = "";
      let idSection = 0;
      let cantCI = cant;
      if (nameTable == "item") {
        cantCI = cantCI - cantCI * 2;
        fieldUpdate = "other_entries";
        idSection = 3;
      } else {
        idSection = 1;
        fieldUpdate = "production";
      }
      const resultNew3 = await db.sequelize.query(
        ` UPDATE ${nameTableTwo} SET ${fieldUpdate} = ${fieldUpdate} + ${cantCI} WHERE ${idStockCI} = ${idStockGlobal} AND ${idNameTableCI} = ${el.id_part}`,
        {
          //replacements: { `${campoStock}`, stockItem }, // Reemplazos seguros para evitar inyección SQL
          type: QueryTypes.UPDATE, // Tipo de consulta
          transaction, // Asocia la transacción a la consulta, si es necesario
        }
      );
      // fin current_inventory_???
      // incluir registros en la tabla  move_inventory
      const resultNewMoveInventory = await Move_inventory.create(
        {
          id_type_move: 0,
          id_type_inventory: el.id_type_inventory,
          id_section: idSection,
          id_part: el.id_part,
          id_stock: idStockGlobal,
          id_process: convert.id_made_item,
          qty: cantCI,
          date: req.body.startdatemadeitem,
        },
        { type: QueryTypes.INSERT, transaction }
      );
    }
    // fin recorrido array data generado de item_part

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
    let resultUpdate = await Made_item.update(obj, {
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
  let cant = 0;
  let idMadeItem = req.body.idMadeItem;
  let idItemMadeItem = req.body.idItemMadeItem;
  let idStockMadeItem = req.body.idStockMadeItem;
  let cantMadeItem = req.body.cantMadeItem;
  let resAllQuerys = [];
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  try {
    // eliminar registro en la tabla made_item
    const resultDeleteMadeItem = await Made_item.destroy({
      where: {
        id_made_item: idMadeItem,
      },
      type: QueryTypes.DELETE,
      transaction,
    });
    // fin tabla made_item
    resAllQuerys.push({ made_item: "Eliminado correctamente" });
    // eliminar registros en la tabla move_refill
    const resultDeleteMoveRefill = await Move_refill.destroy({
      where: {
        id_made_item: idMadeItem,
      },
      type: QueryTypes.DELETE,
      transaction,
    });
    // fin tabla move_refill
    resAllQuerys.push({ move_refil: "Eliminado(s) correctamente" });
    // actualizar el stock en la tabla item del producto producido
    const resultNew2 = await db.sequelize.query(
      ` UPDATE item SET stock_item = stock_item - ${cantMadeItem} WHERE item.id_item = ${idItemMadeItem}`,
      {
        type: QueryTypes.UPDATE, // Tipo de consulta
        transaction, // Asocia la transacción a la consulta, si es necesario
      }
    );
    resAllQuerys.push({ item: "Acualizado correctamente" });
    // fin actualizacion tabla item

    // actulizar la tabla current_inventory_item
    const resultNew4 = await db.sequelize.query(
      ` UPDATE current_inventory_item SET production = production - ${cantMadeItem} WHERE id_stock_current_inventory_item = ${idStockMadeItem} AND id_item_current_inventory_item  = ${idItemMadeItem}`,
      {
        //replacements: { `${campoStock}`, stockItem }, // Reemplazos seguros para evitar inyección SQL
        type: QueryTypes.UPDATE, // Tipo de consulta
        transaction, // Asocia la transacción a la consulta, si es necesario
      }
    );
    resAllQuerys.push({ current_inventory_item: "Acualizado correctamente" });
    // fin tabla current_inventory_item

    // generar datos desde la tabla item_part
    const data = await db.sequelize.query(
      `SELECT id_type_inventory, id_section, id_part, id_stock, id_process, qty, name_table, name_table_two from move_inventory INNER JOIN type_inventory on move_inventory.id_type_inventory = type_inventory.id where move_inventory.id_process =  ${idMadeItem}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    // recorrer el array generado
    //let cant = 0;
    //console.log("verificar esto akika please", data);
    for (const el of data) {
      cant = cantMadeItem;
      let nameTable = el.name_table;
      nameTable = nameTable.trim();
      let campoStock = `stock_` + nameTable;
      let campoId = `id_` + nameTable;
      let nameTablaStock = `stock_` + nameTable;
      let closedStock = `closed_stock_` + nameTable;
      let idstock = `id_stock_` + nameTable;
      // actualizar la tabla "pakage,bag,item,label"
      const resultNew2 = await db.sequelize.query(
        ` UPDATE ${nameTable} SET ${campoStock} = ${campoStock} + ${cant} WHERE ${nameTable}.${campoId} = ${el.id_part}`,
        {
          type: QueryTypes.UPDATE, // Tipo de consulta
          transaction, // Asocia la transacción a la consulta, si es necesario
        }
      );
      resAllQuerys.push({
        pakagebagitemlabel: "Acualizado correctamente" + nameTable,
      });
      // fin actualizar la tabla "pakage,bag,item,label"
      let nameTableTwo = `current_inventory_` + nameTable;
      nameTableTwo = nameTableTwo.trim();
      let idStockCI = `id_stock_current_Inventory_` + nameTable;
      let idNameTableCI = `id_` + nameTable + `_current_inventory_` + nameTable;
      let totalCI = `total_current_inventory_` + nameTable;
      // actualizar la tabla current_inventary_???
      let fieldUpdate = "";
      let idSection = 0;
      let cantCI = cant;
      if (nameTable == "item") {
        cantCI = cantCI - cantCI * 2;
        fieldUpdate = "other_entries";
        idSection = 3;
      } else {
        idSection = 1;
        fieldUpdate = "production";
      }
      const resultNew3 = await db.sequelize.query(
        ` UPDATE ${nameTableTwo} SET ${fieldUpdate} = ${fieldUpdate} - ${cantCI} WHERE ${idStockCI} = ${el.id_stock} AND ${idNameTableCI} = ${el.id_part}`,
        {
          type: QueryTypes.UPDATE, // Tipo de consulta
          transaction, // Asocia la transacción a la consulta, si es necesario
        }
      );
      resAllQuerys.push({
        current_inventory_: "Acualizado correctamente" + nameTableTwo,
      });
      // fin current_inventory_???
    }
    // eliminar registros en la tabla move_inventory
    const resultDeleteMoveInventory = await Move_inventory.destroy({
      where: {
        id_process: idMadeItem,
      },
      type: QueryTypes.DELETE,
      transaction,
    });
    // fin tabla move_inventory
    resAllQuerys.push({
      Move_inventory: "Eliminado correctamente",
    });
    //await transaction.rollback(); // Revierte la transacción en caso de error
    await transaction.commit(); // Confirma la transacción
  } catch (error) {
    await transaction.rollback(); // Revierte la transacción en caso de error
    console.log("error ojo mosca akika ", error.message);
    // await transaction.rollback(); // Revierte la transacción en caso de error
    res.status(400).json({
      message: "Register is not created.....................",
      details: error.message,
      error: error.stack,
      status: "false",
    });
  }
  res.json({ message: resAllQuerys });
};
