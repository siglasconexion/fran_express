const { Stock_pakage } = require("../db/models/stock_pakage.js");
const db = require("../db/conn.js");
const { Pakage } = require("../db/models/pakage.js");
const {
  Current_inventory_pakage,
} = require("../db/models/current_inventory_pakage.js");
const { QueryTypes } = require("sequelize");
const _ = require("lodash");

const getStocks_pakage = async (req, res) => {
  const data = await Stock_pakage.findAll();
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

const getStock_pakageQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from stock_pakage"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getStock_pakage = async (req, res) => {
  let resultGetOne = await Stock_pakage.findAll({
    where: {
      id_status_stock_pakage: 1,
    },
  });
  res.json(resultGetOne);
};

const createStock_pakage = async (req, res) => {
  const resultNew = await Stock_pakage.create({
    id_company_stock_pakage: req.body.idcompanystockpakage,
    id_status_stock_pakage: req.body.idstatusstockpakage,
    id_user_stock_pakage: req.body.iduserstockpakage,
    start_date_stock_pakage: req.body.startdatestockpakage,
    end_date_stock_pakage: req.body.enddatestockpakage,
    comment_stock_pakage: req.body.commentstockpakage,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateStock_pakage = async (req, res) => {
  try {
    const obj = req.body;
    const id_stock_pakage = req.body.id_stock_pakage;
    let resultUpdate = await Stock_pakage.update(obj, {
      where: {
        id_stock_pakage: id_stock_pakage,
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

const deleteStock_pakage = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_pakage = req.body.id;
    let resultDelete = await Stock_pakage.destroy({
      where: {
        id_stock_pakage,
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

const getStock_pakage_closed = async (req, res) => {
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
    let id_stock_pakage = variablefinal;
    let obj = {
      closed_stock_pakage: 1,
      end_date_stock_pakage: fechaFormateada,
    };
    const resultUpdate4 = await Stock_pakage.update(obj, {
      where: { id_stock_pakage },
      transaction, // Asocia la transacción a la consulta
    });
    // akika abro el nuevo inventario
    const resultNew = await Stock_pakage.create(
      {
        id_company_stock_pakage: 1,
        id_status_stock_pakage: 1,
        id_user_stock_pakage: 1,
        start_date_stock_pakage: fechaFormateada,
        end_date_stock_pakage: null,
        comment_stock_pakage: "INVENTORY CLOSING",
      },
      { type: QueryTypes.INSERT, transaction }
    );
    let convert = resultNew?.toJSON();
    console.log("resultNew", convert);
    //for (const ele of convert) {
    console.log("elemento de resultNew", convert.id_stock_pakage);
    //}
    //Object.entries(resultNew).length === 0
    //  ? res.json({ message: "Register is not created" })
    //  : res.json({ message: resultNew });
    /// fin  uevo inventario

    data = await db.sequelize.query(
      `SELECT  * from current_inventory_pakage where id_stock_current_inventory_pakage = ${variablefinal} ORDER BY id_pakage_current_inventory_pakage`,
      { type: QueryTypes.SELECT, transaction }
    );
    for (const el of data) {
      let id = 0;
      let idpakage = el.id_pakage_current_inventory_pakage;
      let saldo = el.total_current_inventory_pakage;
      const resultNew2 = await db.sequelize.query(
        ` UPDATE pakage SET stock_pakage = ${saldo} WHERE pakage.id_pakage = ${idpakage}`,
        { type: QueryTypes.UPDATE, transaction }
        // Asocia la transacción a la consulta
      );
      //// aca el nuevo current_inventory_item
      let idstock = convert.id_stock_pakage;
      let total = 0;
      let ini = saldo;
      let pro = 0;
      let oth = 0;
      let dam = 0;
      let def = 0;
      let ret = 0;
      let adj = 0;

      const resultNew3 = await Current_inventory_pakage.findOne({
        where: {
          id_pakage_current_inventory_pakage: idpakage,
          id_stock_current_inventory_pakage: idstock,
        },
      });
      let convertResultNew3 = resultNew3?.toJSON();
      console.log("primera consulta", convertResultNew3);
      if (_.isEmpty(convertResultNew3)) {
        const resultNew4 = await Current_inventory_pakage.create(
          {
            id_stock_current_inventory_pakage: idstock,
            id_pakage_current_inventory_pakage: idpakage,
            total_current_inventory_pakage: total,
            initial: ini,
            production: pro,
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
      respuestas[`respuesta${idpakage}`] = {};
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

module.exports = {
  getStocks_pakage,
  getStock_pakageQuerySql2,
  getStock_pakage,
  createStock_pakage,
  updateStock_pakage,
  deleteStock_pakage,
  getStock_pakage_closed,
};
