import { Other_move_item } from "../db/models/other_move_item.js";

import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import _ from "lodash";

export const getOther_move_items = async (req, res) => {
  const data = await Other_move_item.findAll();
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

export const getOther_move_item = async (req, res) => {
  let resultGetOne = await Other_move_item.findAll({
    where: {
      id_other_move_item: req.body.id,
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

export const getOther_move_items_stock = async (req, res) => {
  console.log("req.params", req.params);
  let iditem = req.params.iditem;
  let idstock = req.params.idstock;
  let idtypemove = req.params.idtypemove;
  if (idtypemove != "0") {
    const resultGetOne = await db.sequelize.query(
      `SELECT id_other_move_item, date, quantity as total, comment, name_user, name_key_user, name_item, name_move_inventory from other_move_item INNER JOIN user on other_move_item.id_user = user.id_user INNER JOIN item on other_move_item.id_item = item.id_item  INNER JOIN type_move_inventory on other_move_item.id_type_move_inventory = type_move_inventory.id_type_move_inventory WHERE other_move_item.id_item =  ${iditem} AND other_move_item.id_stock = ${idstock} AND other_move_item.id_type_move_inventory = ${idtypemove}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log("othermoveinventory", resultGetOne);
    if (resultGetOne.length <= 0) {
      res.json({
        message: "Results not found",
      });
      return;
    }
    res.json(resultGetOne);
  } else {
    const resultGetOne = await db.sequelize.query(
      `SELECT id_other_move_item, date, quantity as total, comment, name_user, name_key_user, name_item, name_move_inventory from other_move_item INNER JOIN user on other_move_item.id_user = user.id_user INNER JOIN item on other_move_item.id_item = item.id_item  INNER JOIN type_move_inventory on other_move_item.id_type_move_inventory = type_move_inventory.id_type_move_inventory WHERE other_move_item.id_item =  ${iditem} AND other_move_item.id_stock = ${idstock}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log("othermoveinventory", resultGetOne);
    if (resultGetOne.length <= 0) {
      res.json({
        message: "Results not found",
      });
      return;
    }
    res.json(resultGetOne);
  }
};

export const getOther_move_item_report = async (req, res) => {
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

export const createOther_move_item = async (req, res) => {
  let iditem = req.body.iditem,
    idtypemoveinventory = req.body.idtypemoveinventory,
    iduser = req.body.iduser,
    idstock = req.body.idstock,
    date = req.body.date,
    quantity = req.body.quantity,
    comment = req.body.comment,
    nametypemoveinventory = req.body.nametypemoveinventory;
  let resAllQuerys = [];
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  try {
    // incluir registros en la tabla other_move_item
    const resultNewItem = await Other_move_item.create(
      {
        id_item: iditem,
        id_type_move_inventory: idtypemoveinventory,
        id_user: iduser,
        id_stock: idstock,
        date: date,
        quantity: quantity,
        comment: comment,
      },
      { type: QueryTypes.INSERT, transaction }
    );
    // fin tabla other_move_item
    //    respuestas[`respuesta${convert.id_made_item}`] = {};
    resAllQuerys.push({ other_move_item: "creado correctamente" });
    // actualizar el stock en la tabla item del producto producido
    const resultNew2 = await db.sequelize.query(
      ` UPDATE item SET stock_item = stock_item + ${quantity} WHERE item.id_item = ${iditem}`,
      {
        type: QueryTypes.UPDATE, // Tipo de consulta
        transaction, // Asocia la transacción a la consulta, si es necesario
      }
    );
    // fin actualizacion tabla item
    resAllQuerys.push({ item: "actualizado correctamente" });
    // actulizar la tabla current_inventory_item
    const resultNew4 = await db.sequelize.query(
      ` UPDATE current_inventory_item SET ${nametypemoveinventory} = ${nametypemoveinventory} + ${quantity} WHERE id_stock_current_inventory_item = ${idstock} AND id_item_current_inventory_item  = ${iditem}`,
      {
        type: QueryTypes.UPDATE, // Tipo de consulta
        transaction, // Asocia la transacción a la consulta, si es necesario
      }
    );
    // fin tabla current_inventory_item

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
  res.json({ message: resAllQuerys });
};

export const updateOther_move_item = async (req, res) => {
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

export const deleteOther_move_item = async (req, res) => {
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
        fieldUpdate = "adjustment";
        idSection = 9;
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
