import { Stock_item } from '../db/models/stock_item.js';
import {db} from '../db/conn.js';
import { Item } from '../db/models/item.js';
import {
  Current_inventory_item,
} from '../db/models/current_inventory_item.js';
import { QueryTypes } from 'sequelize';
import _ from 'lodash';

export const getStocks_item = async (req, res) => {
  const data = await Stock_item.findAll();
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

export const getStock_itemQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from stock_item"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getStock_item = async (req, res) => {
  let resultGetOne = await Stock_item.findAll({
    where: {
      id_status_stock_item: 1,
    },
  });
  res.json(resultGetOne);
};

export const createStock_item = async (req, res) => {
  const resultNew = await Stock_item.create({
    id_company_stock_item: req.body.idcompanystockitem,
    id_status_stock_item: req.body.idstatusstockitem,
    id_user_stock_item: req.body.iduserstockitem,
    start_date_stock_item: req.body.startdatestockitem,
    end_date_stock_item: req.body.enddatestockitem,
    comment_stock_item: req.body.commentstockitem,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateStock_item = async (req, res) => {
  try {
    const obj = req.body;
    const id_stock_item = req.body.id_stock_item;
    let resultUpdate = await Stock_item.update(obj, {
      where: {
        id_stock_item: id_stock_item,
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

export const deleteStock_item = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_item = req.body.id;
    let resultDelete = await Stock_item.destroy({
      where: {
        id_stock_item,
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

export const getStock_item_closed = async (req, res) => {
  let fecha = new Date();
  let año = fecha.getFullYear();
  let mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Se agrega 1 porque los meses van de 0 a 11
  let dia = ("0" + fecha.getDate()).slice(-2);
  let fechaFormateada = año + "-" + mes + "-" + dia;
  console.log(fechaFormateada); // Output: "2024-03-04" (para la fecha actual)

  // rutas - routes
  let data = [];
  let variablefinal = req.params.variable;
  const { variablefinal2, iduser } = req.params;
  console.log("req.params", req.params);
  console.log(
    "prueba de variables variablefinal2",
    variablefinal2,
    "iduser",
    iduser
  );
  // Puedes usar id, status y userId aquí
  //res.json({ id, status, userId }); ejemplo de respuesta analizar luego recibo linea 120
  const respuestas = {};
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  try {
    let id_stock_item = variablefinal;
    let obj = {
      closed_stock_item: 1,
      end_date_stock_item: fechaFormateada,
    };
    const resultUpdate4 = await Stock_item.update(obj, {
      where: { id_stock_item },
      transaction, // Asocia la transacción a la consulta
    });
    // akika abro el nuevo inventario
    const resultNew = await Stock_item.create(
      {
        id_company_stock_item: 1,
        id_status_stock_item: 1,
        id_user_stock_item: 1,
        start_date_stock_item: fechaFormateada,
        end_date_stock_item: null,
        comment_stock_item: "INVENTORY CLOSING",
      },
      { type: QueryTypes.INSERT, transaction }
    );
    let convert = resultNew?.toJSON();
    console.log("resultNew", convert);
    //for (const ele of convert) {
    console.log("elemento de resultNew", convert.id_stock_item);
    //}
    //Object.entries(resultNew).length === 0
    //  ? res.json({ message: "Register is not created" })
    //  : res.json({ message: resultNew });
    /// fin  uevo inventario
    data = await db.sequelize.query(
      `SELECT  * from current_inventory_item where id_stock_current_inventory_item = ${variablefinal} ORDER BY id_item_current_inventory_item`,
      { type: QueryTypes.SELECT, transaction }
    );
    for (const el of data) {
      let id = 0;
      let iditem = el.id_item_current_inventory_item;
      let saldo = el.total_current_inventory_item;
      // akika colocar total en 0 pero antes pasar su valor a initial en current_inventory_item
      const resultNew2 = await db.sequelize.query(
        ` UPDATE item SET stock_item = ${saldo} WHERE item.id_item = ${iditem}`,
        { type: QueryTypes.UPDATE, transaction }
        // Asocia la transacción a la consulta
      );
      //// aca el nuevo current_inventory_item
      let idstock = convert.id_stock_item;
      let total = 0;
      let ini = saldo;
      let pro = 0;
      let pur = 0;
      let oth = 0;
      let sal = 0;
      let sen = 0;
      let dam = 0;
      let def = 0;
      let ret = 0;
      let adj = 0;

      const resultNew3 = await Current_inventory_item.findOne({
        where: {
          id_item_current_inventory_item: iditem,
          id_stock_current_inventory_item: idstock,
        },
      });
      let convertResultNew3 = resultNew3?.toJSON();
      console.log("primera consulta", convertResultNew3);
      if (_.isEmpty(convertResultNew3)) {
        const resultNew4 = await Current_inventory_item.create(
          {
            id_stock_current_inventory_item: idstock,
            id_item_current_inventory_item: iditem,
            total_current_inventory_item: total,
            initial: ini,
            production: pro,
            purchase: pur,
            other_entries: oth,
            sales: sal,
            send_to_amazon: sen,
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
      respuestas[`respuesta${iditem}`] = {};
    }
    await transaction.commit(); // Confirma la transacción
    //await transaction.rollback(); // Revierte la transacción en caso de error
  } catch (error) {
    console.log("error ojo mosca akika ", error.stack);
    await transaction.rollback(); // Revierte la transacción en caso de error
    //console.log("error", error);
  }
  res.json({
    message: "Status was deleted successfully",
    resultDelete: "resultDelete",
    respuestas: respuestas,
  });
  //return;
};
