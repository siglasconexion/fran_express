import { Stock_detail_item } from "../db/models/stock_detail_item.js";
import { Current_inventory_item } from "../db/models/current_inventory_item.js";
import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import _ from "lodash";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export const getStock_details_item = async (req, res) => {
  const data = await Stock_detail_item.findAll();
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

export const getStock_detail_itemQuerySql2 = async (req, res) => {
  let variablefinal = req.params.variable;
  const data = await db.sequelize.query(
    `SELECT  id_stock_detail_item, id_item_stock_detail_item, id_container_stock_detail_item, id_place_stock_detail_item, id_stock_stock_detail_item, qty_container_stock_detail_item, units_stock_detail_item, total_stock_detail_item, name_item, code_item, name_container, qty_container FROM stock_detail_item INNER join item on stock_detail_item.id_item_stock_detail_item=item.id_item INNER JOIN container on stock_detail_item.id_container_stock_detail_item=id_container where id_stock_stock_detail_item = ${variablefinal} ORDER BY stock_detail_item.id_stock_detail_item`,
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

export const getStock_detail_item = async (req, res) => {
  let resultGetOne = await Stock_detail_item.findAll({
    // select * from Stock_detail_item
    where: {
      id_stock_detail_item: req.body.id,
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

export const createStock_detail_item = async (req, res) => {
  let resAllQuerys = [];
  const transaction = await db.sequelize.transaction(); // Inicia la transaccion
  try {
    const newRegister = await Stock_detail_item.create(
      {
        id_stock_stock_detail_item: req.body.idstockstockdetailitem,
        id_item_stock_detail_item: req.body.iditemstockdetailitem,
        id_place_stock_detail_item: req.body.idplacestockdetailitem,
        id_container_stock_detail_item: req.body.idcontainerstockdetailitem,
        qty_container_stock_detail_item: req.body.qtycontainerstockdetailitem,
        units_stock_detail_item: req.body.unitsstockdetailitem,
        total_stock_detail_item: req.body.totalstockdetailitem,
      },
      { transaction }
    );
    resAllQuerys.push({
      stock_detail_item: "Created successfully",
      newRegister: newRegister,
    });

    const resultNew2 = await Current_inventory_item.findOne({
      where: {
        id_item_current_inventory_item: req.body.iditemstockdetailitem,
        id_stock_current_inventory_item: req.body.idstockstockdetailitem,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_item.create(
        {
          id_stock_current_inventory_item: req.body.idstockstockdetailitem,
          id_item_current_inventory_item: req.body.iditemstockdetailitem,
          initial: 0,
          production: 0,
          purchase: 0,
          other_entries: 0,
          sales: 0,
          send_to_amazon: 0,
          damaged: 0,
          defeated: 0,
          returned: 0,
          adjustment: 0,
          total_current_inventory_item: req.body.totalstockdetailitem,
        },
        { transaction }
      );
      console.log("segunda", resultNew3);

      Object.entries(resultNew3).length === 0
        ? resAllQuerys.push({
            Current_inventory_label: " Record is not created",
          })
        : resAllQuerys.push({
            Current_inventory_label: " Record was created successfully",
          });
    } else {
      let previousTotal = convertResultNew2.total_current_inventory_item;
      let totalNew = parseInt(req.body.totalstockdetailitem) + previousTotal;
      let obj = {
        id_stock_current_inventory_item: req.body.idstockstockdetailitem,
        id_item_current_inventory_item: req.body.iditemstockdetailitem,
        total_current_inventory_item: totalNew,
      };
      const resultUpdate = await Current_inventory_item.update(obj, {
        where: {
          id_item_current_inventory_item: req.body.iditemstockdetailitem,
          id_stock_current_inventory_item: req.body.idstockstockdetailitem,
        },
        transaction,
      });
      if (resultUpdate[0] === 1) {
        resAllQuerys.push({
          Current_inventory_item: " Record was updated successfully",
          resultUpdate: resultUpdate,
        });
      } else {
        resAllQuerys.push({
          Current_inventory_label: " Record was not updated",
          resultUpdate: resultUpdate,
          status: 400,
          error: "An error occurred",
        });
      }
    }
    await transaction.commit(); // Confirma la transacción
  } catch (error) {
    await transaction.rollback(); // Revierte la transacción en caso de error
    console.log("aquir muestra la descripcion de error message", error.message);
    console.log("aquir el error stack", error.stack);
    console.log("aca el error erros", error.errors);
    console.log(
      "aqui va el error de la funcion Create_stock_detail_item",
      error
    );
    return res.status(400).json({
      message: "Records were not updated or created, commit aborted",
      details: error.message,
      error: error.stack,
      status: "false",
      resAllQuerys: resAllQuerys,
    });
  }
  return res.json({ message: resAllQuerys });
};

export const updateStock_detail_item = async (req, res) => {};

export const deleteStock_detail_item = async (req, res) => {
  let resAllQuerys = [];
  const transaction = await db.sequelize.transaction(); // Inicia la transaccion
  try {
    console.log(req.body);
    const id_stock_detail_item = req.body.id;
    const id_stock_stock_detail_item = req.body.idstock;
    const total_stock_detail_item = req.body.total;
    let resultDelete = await Stock_detail_item.destroy({
      where: {
        id_stock_detail_item,
        id_stock_stock_detail_item,
      },
      transaction,
    });
    resAllQuerys.push({ item: " Record was deleted successfully" });

    const resultNew2 = await Current_inventory_item.findOne({
      where: {
        id_item_current_inventory_item: req.body.iditem,
        id_stock_current_inventory_item: req.body.idstock,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    if (!_.isEmpty(convertResultNew2)) {
      let previousTotal = convertResultNew2.total_current_inventory_item;
      let totalNew = previousTotal - parseInt(req.body.total);
      let obj = {
        id_stock_current_inventory_item: req.body.idstock,
        id_item_current_inventory_item: req.body.iditem,
        total_current_inventory_item: totalNew,
      };
      const resultUpdate = await Current_inventory_item.update(obj, {
        where: {
          id_item_current_inventory_item: req.body.iditem,
          id_stock_current_inventory_item: req.body.idstock,
        },
        transaction,
      });
      if (resultUpdate[0] === 1) {
        resAllQuerys.push({
          Current_inventory_item: " Record was updated successfully",
          resultUpdate: resultUpdate,
        });
      } else {
        resAllQuerys.push({
          Current_inventory_item: " Record was not updated",
          resultUpdate: resultUpdate,
          status: 400,
          error: "An error occurred",
        });
      }
    }
    await transaction.commit(); // Confirma la transacción
  } catch (error) {
    await transaction.rollback(); // Revierte la transacción en caso de error
    console.log("aquir muestra la descripcion de error message", error.message);
    console.log("aquir el error stack", error.stack);
    console.log("aca el error erros", error.errors);
    console.log(
      "aqui va el error de la funcion delete_stock_detail_item",
      error
    );
    return res.status(400).json({
      message: "Records were not updated, commit aborted",
      details: error.message,
      error: error.stack,
      status: "false",
      resAllQuerys: resAllQuerys,
    });
    //console.log(err.stack);
  }
  return res.json({ message: resAllQuerys });
};
