import { Stock_bag } from  '../db/models/stock_bag.js';
import { QueryTypes } from  'sequelize';
import {db} from '../db/conn.js';
import {
  Current_inventory_bag,
} from '../db/models/current_inventory_bag.js';
import _ from 'lodash';

export const getStocks_bag = async (req, res) => {
  const data = await Stock_bag.findAll();
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

export const getStock_bagQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from stock_bag"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getStock_bag = async (req, res) => {
  let resultGetOne = await Stock_bag.findAll({
    where: {
      id_status_stock_bag: 1,
    },
  });
  res.json(resultGetOne);
};

export const createStock_bag = async (req, res) => {
  const resultNew = await Stock_bag.create({
    id_company_stock_bag: req.body.idcompanystockbag,
    id_status_stock_bag: req.body.idstatusstockbag,
    id_user_stock_bag: req.body.iduserstockbag,
    start_date_stock_bag: req.body.startdatestockbag,
    end_date_stock_bag: req.body.enddatestockbag,
    comment_stock_bag: req.body.commentstockbag,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateStock_bag = async (req, res) => {
  try {
    const obj = req.body;
    const id_stock_bag = req.body.id_stock_bag;
    let resultUpdate = await Stock_bag.update(obj, {
      where: {
        id_stock_bag: id_stock_bag,
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

export const deleteStock_bag = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_bag = req.body.id;
    let resultDelete = await Stock_bag.destroy({
      where: {
        id_stock_bag,
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

export const getStock_bag_closed = async (req, res) => {
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
    let id_stock_bag = variablefinal;
    let obj = {
      closed_stock_bag: 1,
      end_date_stock_bag: fechaFormateada,
    };
    const resultUpdate4 = await Stock_bag.update(obj, {
      where: { id_stock_bag },
      transaction, // Asocia la transacción a la consulta
    });
    // akika abro el nuevo inventario
    const resultNew = await Stock_bag.create(
      {
        id_company_stock_bag: 1,
        id_status_stock_bag: 1,
        id_user_stock_bag: 1,
        start_date_stock_bag: fechaFormateada,
        end_date_stock_bag: null,
        comment_stock_bag: "INVENTORY CLOSING",
      },
      { type: QueryTypes.INSERT, transaction }
    );
    let convert = resultNew?.toJSON();
    console.log("resultNew", convert);
    //for (const ele of convert) {
    console.log("elemento de resultNew", convert.id_stock_bag);
    //}
    //Object.entries(resultNew).length === 0
    //  ? res.json({ message: "Register is not created" })
    //  : res.json({ message: resultNew });
    /// fin  uevo inventario
    data = await db.sequelize.query(
      `SELECT  * from current_inventory_bag where id_stock_current_inventory_bag = ${variablefinal} ORDER BY id_bag_current_inventory_bag`,
      { type: QueryTypes.SELECT, transaction }
    );
    for (const el of data) {
      let id = 0;
      let idbag = el.id_bag_current_inventory_bag;
      let saldo = el.total_current_inventory_bag;
      const resultNew2 = await db.sequelize.query(
        ` UPDATE bag SET stock_bag = ${saldo} WHERE bag.id_bag = ${idbag}`,
        { type: QueryTypes.UPDATE, transaction }
        // Asocia la transacción a la consulta
      );
      //// aca el nuevo current_inventory_item
      let idstock = convert.id_stock_bag;
      let total = 0;
      let ini = saldo;
      let pro = 0;
      let pur = 0;
      let oth = 0;
      let dam = 0;
      let def = 0;
      let ret = 0;
      let adj = 0;

      const resultNew3 = await Current_inventory_bag.findOne({
        where: {
          id_bag_current_inventory_bag: idbag,
          id_stock_current_inventory_bag: idstock,
        },
      });
      let convertResultNew3 = resultNew3?.toJSON();
      console.log("primera consulta", convertResultNew3);
      if (_.isEmpty(convertResultNew3)) {
        const resultNew4 = await Current_inventory_bag.create(
          {
            id_stock_current_inventory_bag: idstock,
            id_bag_current_inventory_bag: idbag,
            total_current_inventory_bag: total,
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
      /// fin current_inventory_bag
      respuestas[`respuesta${idbag}`] = {};
    }

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
