import { Stock_label } from '../db/models/stock_label.js';
import {db} from '../db/conn.js';
import { Label } from '../db/models/label.js';
import {
  Current_inventory_label,
} from '../db/models/current_inventory_label.js';
import { QueryTypes } from 'sequelize';
import _ from 'lodash';

export const getStocks_label = async (req, res) => {
  const data = await Stock_label.findAll();
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

export const getStock_labelQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from stock_label"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getStock_label = async (req, res) => {
  let resultGetOne = await Stock_label.findAll({
    where: {
      id_status_stock_label: 1,
    },
  });
  res.json(resultGetOne);
};

export const createStock_label = async (req, res) => {
  const resultNew = await Stock_label.create({
    id_company_stock_label: req.body.idcompanystocklabel,
    id_status_stock_label: req.body.idstatusstocklabel,
    id_user_stock_label: req.body.iduserstocklabel,
    start_date_stock_label: req.body.startdatestocklabel,
    end_date_stock_label: req.body.enddatestocklabel,
    comment_stock_label: req.body.commentstocklabel,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateStock_label = async (req, res) => {
  try {
    const obj = req.body;
    const id_stock_label = req.body.id_stock_label;
    let resultUpdate = await Stock_label.update(obj, {
      where: {
        id_stock_label: id_stock_label,
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

export const deleteStock_label = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_label = req.body.id;
    let resultDelete = await Stock_label.destroy({
      where: {
        id_stock_label,
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

export const getStock_label_closed = async (req, res) => {
  let fecha = new Date();
  let año = fecha.getFullYear();
  let mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Se agrega 1 porque los meses van de 0 a 11
  let dia = ("0" + fecha.getDate()).slice(-2);
  let fechaFormateada = año + "-" + mes + "-" + dia;
  console.log(fechaFormateada); // Output: "2024-03-04" (para la fecha actual)

  // rutas - routes
  let data = [];
  let variablefinal = req.params.variable;
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  try {
    let id_stock_label = variablefinal;
    let obj = {
      closed_stock_label: 1,
      end_date_stock_label: fechaFormateada,
    };
    const resultUpdate4 = await Stock_label.update(obj, {
      where: { id_stock_label },
      transaction, // Asocia la transacción a la consulta
    });
    // akika abro el nuevo inventario
    const resultNew = await Stock_label.create(
      {
        id_company_stock_label: 1,
        id_status_stock_label: 1,
        id_user_stock_label: 1,
        start_date_stock_label: fechaFormateada,
        end_date_stock_label: null,
        comment_stock_label: "INVENTORY CLOSING",
      },
      { type: QueryTypes.INSERT, transaction }
    );
    let convert = resultNew?.toJSON();
    console.log("resultNew", convert);
    //for (const ele of convert) {
    console.log("elemento de resultNew", convert.id_stock_label);
    //}
    //Object.entries(resultNew).length === 0
    //  ? res.json({ message: "Register is not created" })
    //  : res.json({ message: resultNew });
    /// fin  uevo inventario

    data = await db.sequelize.query(
      `SELECT  * from current_inventory_label where id_stock_current_inventory_label = ${variablefinal} ORDER BY id_label_current_inventory_label`,
      { type: QueryTypes.SELECT, transaction }
    );
    for (const el of data) {
      let id = 0;
      let idlabel = el.id_label_current_inventory_label;
      let saldo = el.total_current_inventory_label;
      const resultNew2 = await db.sequelize.query(
        ` UPDATE label SET stock_label = ${saldo} WHERE label.id_label = ${idlabel}`,
        { type: QueryTypes.UPDATE, transaction }
        // Asocia la transacción a la consulta
      );
      //// aca el nuevo current_inventory_item
      let idstock = convert.id_stock_label;
      let total = 0;
      let ini = saldo;
      let pro = 0;
      let pur = 0;
      let oth = 0;
      let dam = 0;
      let def = 0;
      let ret = 0;
      let adj = 0;

      const resultNew3 = await Current_inventory_label.findOne({
        where: {
          id_label_current_inventory_label: idlabel,
          id_stock_current_inventory_label: idstock,
        },
      });
      let convertResultNew3 = resultNew3?.toJSON();
      console.log("primera consulta", convertResultNew3);
      if (_.isEmpty(convertResultNew3)) {
        const resultNew4 = await Current_inventory_label.create(
          {
            id_stock_current_inventory_label: idstock,
            id_label_current_inventory_label: idlabel,
            total_current_inventory_label: total,
            initial: ini,
            production: pro,
            purchase: pur,
            other_entries: oth,
            damaged: dam,
            defeated: def,
            returned: ret,
            adjustment: adj,
          },
          { transaction }
        );
        //Object.entries(resultNew4).length === 0
        //  ? res.json({ message: "Register is not created" })
        //  : res.json({ message: resultNew3 });
        //return;
      }
      /// fin current_inventory_item
      respuestas[`respuesta${idlabel}`] = {};
    }
    /*   let id_stock_label = variablefinal;
    let obj = {
      closed_stock_label: 1,
      end_date_stock_label: fechaFormateada,
    };
    const resultUpdate4 = await Stock_label.update(obj, {
      where: { id_stock_label },
      transaction, // Asocia la transacción a la consulta
    }); */

    await transaction.commit(); // Confirma la transacción
  } catch (error) {
    await transaction.rollback(); // Revierte la transacción en caso de error
    console.log("error", error);
  }
  res.json({
    message: "Status was deleted successfully",
    resultDelete: "resultDelete",
    respuestas: respuestas,
  });
  //return;
};
