import { Stock_detail_pakage } from "../db/models/stock_detail_pakage.js";
import { Current_inventory_pakage } from "../db/models/current_inventory_pakage.js";
import { Pakage } from "../db/models/pakage.js";

import { db } from "../db/conn.js";
import _ from "lodash";
import { QueryTypes } from "sequelize";

export const getStock_details_pakage = async (req, res) => {
  const data = await Stock_detail_pakage.findAll();
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

export const getStock_detail_pakageQuerySql2 = async (req, res) => {
  let variablefinal = req.params.variable;
  const data = await db.sequelize.query(
    `SELECT id_stock_detail_pakage, id_stock_stock_detail_pakage , id_pakage_stock_detail_pakage, qty_stock_detail_pakage,  name_pakage FROM stock_detail_pakage INNER JOIN pakage ON id_pakage_stock_detail_pakage=id_pakage where id_stock_stock_detail_pakage = ${variablefinal} ORDER BY id_stock_detail_pakage  `,
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

export const getStock_detail_pakage = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Stock_detail_pakage.findOne({
    where: {
      id_pakage_stock_detail_pakage: variable,
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

export const createStock_detail_pakage = async (req, res) => {
  let resAllQuerys = [];
  const transaction = await db.sequelize.transaction(); // Inicia la transaccion
  try {
    const newRegister = await Stock_detail_pakage.create(
      {
        id_stock_stock_detail_pakage: req.body.idstockstockdetailpakage,
        id_pakage_stock_detail_pakage: req.body.idpakagestockdetailpakage,
        qty_stock_detail_pakage: req.body.qtystockdetailpakage,
      },
      { transaction }
    );
    resAllQuerys.push({
      stock_detail_pakage: "Created successfully",
      newRegister: newRegister,
    });

    //      id_pakage: req.body.idpakagestockdetailpakage,
    let obj2 = {
      weight_box_pakage: req.body.weightboxpakage,
      weight_pakage: req.body.weightpakage,
    };
    const resultUpdate2 = await Pakage.update(obj2, {
      where: {
        id_pakage: req.body.idpakagestockdetailpakage,
      },
      transaction,
    });
    resAllQuerys.push({ pakage: " Record updated successfully" });

    const resultNew2 = await Current_inventory_pakage.findOne({
      where: {
        id_pakage_current_inventory_pakage: req.body.idpakagestockdetailpakage,
        id_stock_current_inventory_pakage: req.body.idstockstockdetailpakage,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      console.log("entre a crear uno nuevo porque ");
      const resultNew3 = await Current_inventory_pakage.create(
        {
          id_stock_current_inventory_pakage: req.body.idstockstockdetailpakage,
          id_pakage_current_inventory_pakage:
            req.body.idpakagestockdetailpakage,
          initial: 0,
          production: 0,
          purchase: 0,
          other_entries: 0,
          damaged: 0,
          defeated: 0,
          returned: 0,
          adjustment: 0,
          total_current_inventory_pakage: req.body.qtystockdetailpakage,
        },
        { transaction }
      );
      console.log("segunda", resultNew3);

      Object.entries(resultNew3).length === 0
        ? resAllQuerys.push({
            Current_inventory_pakage: " Record is not created",
          })
        : resAllQuerys.push({
            Current_inventory_pakage: " Record was created successfully",
          });
    } else {
      let previousTotal = convertResultNew2.total_current_inventory_pakage;
      let totalNew =
        parseFloat(req.body.qtystockdetailpakage) + parseFloat(previousTotal);
      let obj = {
        id_stock_current_inventory_pakage: req.body.idstockstockdetailpakage,
        id_pakage_current_inventory_pakage: req.body.idpakagestockdetailpakage,
        total_current_inventory_pakage: totalNew,
      };
      const resultUpdate = await Current_inventory_pakage.update(obj, {
        where: {
          id_pakage_current_inventory_pakage:
            req.body.idpakagestockdetailpakage,
          id_stock_current_inventory_pakage: req.body.idstockstockdetailpakage,
        },
        transaction,
      });
      if (resultUpdate[0] === 1) {
        resAllQuerys.push({
          Current_inventory_label: " Record was updated successfully",
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
      "aqui va el error de la funcion Create_stock_detail_pakage",
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

export const updateStock_detail_pakage = async (req, res) => {
  //esto no se usa hay que borrarla
};

export const deleteStock_detail_pakage = async (req, res) => {
  let resAllQuerys = [];
  const transaction = await db.sequelize.transaction(); // Inicia la transaccion
  try {
    console.log(req.body);
    const id_stock_detail_pakage = req.body.id;
    const id_stock_stock_detail_pakage = req.body.idstock;

    let resultDelete = await Stock_detail_pakage.destroy({
      where: {
        id_stock_detail_pakage,
        id_stock_stock_detail_pakage,
      },
      transaction,
    });
    resAllQuerys.push({ pakage: " Record was deleted successfully" });

    const resultNew2 = await Current_inventory_pakage.findOne({
      where: {
        id_pakage_current_inventory_pakage: req.body.idpakage,
        id_stock_current_inventory_pakage: req.body.idstock,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    if (!_.isEmpty(convertResultNew2)) {
      let previousTotal = convertResultNew2.total_current_inventory_pakage;
      let totalNew = previousTotal - parseFloat(req.body.total);
      let obj = {
        id_stock_current_inventory_pakage: req.body.idstock,
        id_pakage_current_inventory_pakage: req.body.idpakage,
        total_current_inventory_pakage: totalNew,
      };
      const resultUpdate = await Current_inventory_pakage.update(obj, {
        where: {
          id_pakage_current_inventory_pakage: req.body.idpakage,
          id_stock_current_inventory_pakage: req.body.idstock,
        },
        transaction,
      });
      if (resultUpdate[0] === 1) {
        resAllQuerys.push({
          Current_inventory_pakage: " Record was updated successfully",
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
  } catch (err) {
    await transaction.rollback(); // Revierte la transacción en caso de error
    console.log("aquir muestra la descripcion de error message", error.message);
    console.log("aquir el error stack", error.stack);
    console.log("aca el error erros", error.errors);
    console.log(
      "aqui va el error de la funcion delete_stock_detail_pakage",
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
