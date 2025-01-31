import { Stock_detail_label } from "../db/models/stock_detail_label.js";
import { Current_inventory_label } from "../db/models/current_inventory_label.js";
import { Label } from "../db/models/label.js";

import { db } from "../db/conn.js";
import _ from "lodash";
import { QueryTypes } from "sequelize";

export const getStock_details_label = async (req, res) => {
  const data = await Stock_detail_label.findAll();
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

export const getStock_detail_labelQuerySql2 = async (req, res) => {
  let variablefinal = req.params.variable;
  const data = await db.sequelize.query(
    `SELECT id_stock_detail_label, id_stock_stock_detail_label , id_label_stock_detail_label, qty_stock_detail_label,  name_label FROM stock_detail_label INNER JOIN label ON id_label_stock_detail_label=id_label  where id_stock_stock_detail_label = ${variablefinal} ORDER BY id_stock_detail_label `,
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

export const getStock_detail_label = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Stock_detail_label.findOne({
    // select * from Stock_detail_label
    where: {
      id_label_stock_detail_label: variable,
    },
  });
  let convertResultNew2 = resultGetOne?.toJSON();
  /*  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  } */
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
  //res.json({ resultGetOne, d: "probando" });
};

export const createStock_detail_label = async (req, res) => {
  let wsupport = req.body.weightsupportlabel;
  let resAllQuerys = [];
  const transaction = await db.sequelize.transaction(); // Inicia la transaccion
  try {
    const newRegister = await Stock_detail_label.create(
      {
        id_stock_stock_detail_label: req.body.idstockstockdetaillabel,
        id_label_stock_detail_label: req.body.idlabelstockdetaillabel,
        qty_stock_detail_label: req.body.qtystockdetaillabel,
      },
      transaction
    );
    resAllQuerys.push({
      stock_detail_label: "creado correctamente",
      newRegister: newRegister,
    });
    //      id_label: req.body.idlabelstockdetaillabel,
    let obj2 = {
      weight_support_label: req.body.weightsupportlabel,
    };
    const resultUpdate2 = await Label.update(
      obj2,
      {
        where: {
          id_label: req.body.idlabelstockdetaillabel,
        },
      },
      transaction
    );
    resAllQuerys.push({ label: " Registro Actualizado correctamente" });

    const resultNew2 = await Current_inventory_label.findOne(
      {
        where: {
          id_label_current_inventory_label: req.body.idlabelstockdetaillabel,
          id_stock_current_inventory_label: req.body.idstockstockdetaillabel,
        },
      }
      //      { type: QueryTypes.SELECT, transaction }
    );
    let convertResultNew2 = resultNew2?.toJSON();
    //console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_label.create(
        {
          id_stock_current_inventory_label: req.body.idstockstockdetaillabel,
          id_label_current_inventory_label: req.body.idlabelstockdetaillabel,
          initial: 0,
          production: 0,
          other_entries: 0,
          damaged: 0,
          defeated: 0,
          returned: 0,
          adjustment: 0,
          total_current_inventory_label: req.body.qtystockdetaillabel,
        },
        transaction
      );
      //console.log("segunda", resultNew3);
      Object.entries(resultNew3).length === 0
        ? resAllQuerys.push({
            Current_inventory_label: " Record is not created",
          })
        : resAllQuerys.push({
            Current_inventory_label: " Record was created successfully",
          });
    } else {
      let previousTotal = convertResultNew2.total_current_inventory_label;
      let totalNew =
        parseFloat(req.body.qtystockdetaillabel) + parseFloat(previousTotal);
      let obj = {
        id_stock_current_inventory_label: req.body.idstockstockdetaillabel,
        id_label_current_inventory_label: req.body.idlabelstockdetaillabel,
        total_current_inventory_label: totalNew,
      };
      const resultUpdate = await Current_inventory_label.update(
        obj,
        {
          where: {
            id_label_current_inventory_label: req.body.idlabelstockdetaillabel,
            id_stock_current_inventory_label: req.body.idstockstockdetaillabel,
          },
        },
        transaction
      );

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
    console.log("aqui va el error de la funcion Create_stock_detail", error);
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

export const updateStock_detail_label = async (req, res) => {
  //esto no se usa hay que borrarla
  try {
    const obj = req.body;
    const id_stock_detail_label = req.body.id_stock_detail_label;
    let resultUpdate = await Stock_detail_label.update(obj, {
      where: {
        id_stock_detail_label: id_stock_detail_label,
      },
    });
    if (resultUpdate[0] === 1) {
      res.status(200).json({
        message: "Status Update successfully",
        resultUpdate: resultUpdate,
      });
    } else {
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

export const deleteStock_detail_label = async (req, res) => {
  let resAllQuerys = [];
  const transaction = await db.sequelize.transaction(); // Inicia la transaccion
  try {
    console.log(req.body);
    const id_stock_detail_label = req.body.id;
    const id_stock_stock_detail_label = req.body.idstock;
    let resultDelete = await Stock_detail_label.destroy({
      where: {
        id_stock_detail_label,
        id_stock_stock_detail_label,
      },
      transaction,
    });
    resAllQuerys.push({ label: " Record was deleted successfully" });
    const resultNew2 = await Current_inventory_label.findOne({
      where: {
        id_label_current_inventory_label: req.body.idlabel,
        id_stock_current_inventory_label: req.body.idstock,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    if (!_.isEmpty(convertResultNew2)) {
      let previousTotal = convertResultNew2.total_current_inventory_label;
      let totalNew = previousTotal - parseFloat(req.body.total);
      let obj = {
        id_stock_current_inventory_label: req.body.idstock,
        id_label_current_inventory_label: req.body.idlabel,
        total_current_inventory_label: totalNew,
      };
      const resultUpdate = await Current_inventory_label.update(obj, {
        where: {
          id_label_current_inventory_label: req.body.idlabel,
          id_stock_current_inventory_label: req.body.idstock,
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
    console.log("aqui va el error de la funcion Create_stock_detail", error);
    return res.status(400).json({
      message: "Records were not updated, commit aborted",
      details: error.message,
      error: error.stack,
      status: "false",
      resAllQuerys: resAllQuerys,
    });
    console.log(err.stack);
    console.log("otro error", err.error);
  }
  return res.json({ message: resAllQuerys });
};
