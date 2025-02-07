import { Stock_detail_e_oil } from "../db/models/stock_detail_e_oil.js";
import { Current_inventory_e_oil } from "../db/models/current_inventory_e_oil.js";

import { db } from "../db/conn.js";
import _ from "lodash";
import xlsxj from "xlsx-to-json";
import fs from "fs";
import { QueryTypes } from "sequelize";

export const getStock_details_e_oil = async (req, res) => {
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

export const getStock_detail_e_oilQuerySql2 = async (req, res) => {
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

export const getStock_detail_e_oil = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Stock_detail_e_oil.findOne({
    where: {
      id_e_oil_stock_detail_e_oil: variable,
    },
  });
  let convertResultNew2 = resultGetOne?.toJSON();
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
};

export const createStock_detail_e_oil = async (req, res) => {
  let resAllQuerys = [];
  const transaction = await db.sequelize.transaction(); // Inicia la transaccion
  try {
    const newRegister = await Stock_detail_e_oil.create(
      {
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
        spent_stock_detail_e_oil: req.body.spentstockdetaileoil,
        qty_container_two_stock_detail_e_oil:
          req.body.qtycontainertwostockdetaileoil,
        qty_helper_container_stock_detail_e_oil:
          req.body.qtyhelpercontainerstockdetaileoil,
      },
      { transaction }
    );
    resAllQuerys.push({
      stock_detail_e_oil: "Created successfully",
      newRegister: newRegister,
    });

    const resultNew2 = await Current_inventory_e_oil.findOne({
      where: {
        id_e_oil_current_inventory_e_oil: req.body.ideoilstockdetaileoil,
        id_stock_current_inventory_e_oil: req.body.idstockstockdetaileoil,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_e_oil.create(
        {
          id_stock_current_inventory_e_oil: req.body.idstockstockdetaileoil,
          id_e_oil_current_inventory_e_oil: req.body.ideoilstockdetaileoil,
          initial: 0,
          production: 0,
          purchase: 0,
          other_entries: 0,
          damaged: 0,
          defeated: 0,
          returned: 0,
          adjustment: 0,
          total_current_inventory_e_oil: req.body.totalstockdetaileoil,
        },
        { transaction }
      );
      console.log("segunda", resultNew3);

      Object.entries(resultNew3).length === 0
        ? resAllQuerys.push({
            Current_inventory_e_oil: " Record is not created",
          })
        : resAllQuerys.push({
            Current_inventory_e_oil: " Record was created successfully",
          });
    } else {
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
          id_stock_current_inventory_e_oil: req.body.idstockstockdetaileoil,
        },
        transaction,
      });
      if (resultUpdate[0] === 1) {
        resAllQuerys.push({
          Current_inventory_e_oil: " Record was updated successfully",
          resultUpdate: resultUpdate,
        });
      } else {
        resAllQuerys.push({
          Current_inventory_e_oil: " Record was not updated",
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
      "aqui va el error de la funcion Create_stock_detail_e_oil",
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

export const updateStock_detail_e_oil = async (req, res) => {};

export const deleteStock_detail_e_oil = async (req, res) => {
  let resAllQuerys = [];
  const transaction = await db.sequelize.transaction(); // Inicia la transaccion
  try {
    console.log(req.body);
    const id_stock_detail_e_oil = req.body.id;
    const id_stock_stock_detail_e_oil = req.body.idstock;

    let resultDelete = await Stock_detail_e_oil.destroy({
      where: {
        id_stock_detail_e_oil,
        id_stock_stock_detail_e_oil,
      },
      transaction,
    });
    resAllQuerys.push({ e_oil: " Record was deleted successfully" });

    const resultNew2 = await Current_inventory_e_oil.findOne({
      where: {
        id_e_oil_current_inventory_e_oil: req.body.ideoil,
        id_stock_current_inventory_label: req.body.idstock,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    if (!_.isEmpty(convertResultNew2)) {
      let previousTotal = convertResultNew2.total_current_inventory_e_oil;
      let totalNew = previousTotal - parseFloat(req.body.total);
      let obj = {
        id_stock_current_inventory_e_oil: req.body.idstock,
        id_e_oil_current_inventory_e_oil: req.body.ideoil,
        total_current_inventory_e_oil: totalNew,
      };
      const resultUpdate = await Current_inventory_e_oil.update(obj, {
        where: {
          id_e_oil_current_inventory_e_oil: req.body.ideoil,
          id_stock_current_inventory_e_oil: req.body.idstock,
        },
        transaction,
      });
      if (resultUpdate[0] === 1) {
        resAllQuerys.push({
          Current_inventory_e_oil: " Record was updated successfully",
          resultUpdate: resultUpdate,
        });
      } else {
        resAllQuerys.push({
          Current_inventory_e_oil: " Record was not updated",
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
      "aqui va el error de la funcion delete_stock_detail_e_oil",
      error
    );
    return res.status(400).json({
      message: "Records were not updated, commit aborted",
      details: error.message,
      error: error.stack,
      status: "false",
      resAllQuerys: resAllQuerys,
    });
  }
  return res.json({ message: resAllQuerys });
};
