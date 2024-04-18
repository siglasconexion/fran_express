const { Stock_label } = require("../db/models/stock_label.js");
const { QueryTypes } = require("sequelize");
const db = require("../db/conn.js");

const getStocks_label = async (req, res) => {
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

const getStock_labelQuerySql2 = async (req, res) => {
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

const getStock_label = async (req, res) => {
  let resultGetOne = await Stock_label.findAll({
    where: {
      id_status_stock_label: 1,
    },
  });
  res.json(resultGetOne);
};

const createStock_label = async (req, res) => {
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

const updateStock_label = async (req, res) => {
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

const deleteStock_label = async (req, res) => {
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

const getStock_label_closed = async (req, res) => {
  // ojo corregir este cierre para el cierre
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
  //console.log("HEY CA LA VARIABLE", variablefinal);
  //console.log("variable sola del objeto params", variablefinal);
  const transaction = await db.sequelize.transaction(); // Inicia la transacción
  try {
    data = await db.sequelize.query(
      `SELECT  * from stock_detail_e_oil where id_stock_stock_detail_e_oil = ${variablefinal} ORDER BY id_e_oil_stock_detail_e_oil`,
      { type: QueryTypes.SELECT, transaction }
    ); //
    //console.log("data", data);
    //respuestas.respuesta1 = "exito manin";

    const register = [];
    for (const el of data) {
      let rest = 0;
      let id = 0;
      let id_oil_input = 0;
      let iditem = el.id_e_oil_stock_detail_e_oil;
      let spent = parseFloat(el.spent_stock_detail_e_oil);
      let spent0 = parseFloat(el.spent_stock_detail_e_oil);
      const resultNew2 = await db.sequelize.query(
        ` UPDATE essential_oil SET stock_essential_oil_one = stock_essential_oil_one - ${spent} WHERE essential_oil.id_essential_oil = ${iditem}`,
        { type: QueryTypes.UPDATE, transaction }
        // Asocia la transacción a la consulta
      );
      console.log("resultNew2", resultNew2);
      let resultNew3 = await db.sequelize.query(
        ` SELECT * FROM oil_input WHERE id_essential_oil_oil_input = ${iditem} ORDER BY date_received_oil_input`,
        { type: QueryTypes.SELECT, transaction }
        // Asocia la transacción a la consulta
      );
      // esto aca es para probar la primera vez que hiciera bien la actualizacion  en los dos casos luego quitar definitivamente
      /*            spent0: spent0,
            spent: spent,
            iditem: iditem,
            rest: rest,
            stock: el2.stock_oil_input,
            ********************************** caso 2 que es la mayoria 
            spent0: spent0,
            spent: spent,
            iditem: iditem,
            rest: rest,
            stock: el2.stock_oil_input,
            comentario: "aca lo hizo al primero",
             */
      respuestas[`respuesta${iditem}`] = {};
      //********************* codigo chatgpt
      /* for (const el2 of resultNew3) {
        const id_oil_input = el2.id_oil_input;
        let rest = parseFloat(el2.stock_oil_input) - spent;

        const obj = {
          stock_oil_input: rest,
          in_use_oil_input: spent > 0 ? 1 : 0,
          finish_oil_input: spent > 0 ? 0 : 1,
          date_end_oil_input: null,
        };

        await Oil_input.update(obj, {
          where: { id_oil_input },
          transaction, // Asocia la transacción a la actualización
        });
      }
    }
       */
      //*********************

      for (const el2 of resultNew3) {
        id = el2.id_oil_input;
        id_oil_input = el2.id_oil_input;
        for (let i = 0; spent > 0; i++) {
          // este for esta demas resestructurar codigo despues
          id = el2.id_oil_input;
          if (spent > parseFloat(el2.stock_oil_input)) {
            rest = 0;
            spent = spent - parseFloat(el2.stock_oil_input);
            let obj = {
              stock_oil_input: rest,
              in_use_oil_input: 0,
              finish_oil_input: 1,
              date_end_oil_input: fechaFormateada,
            };
            // para que funcione la actualizacion de abajo hay que activar esto
            /*           register.push({
            id_oil_input: el2.id_oil_input,
            stock_oil_input: rest,
            in_use_oil_input: 0,
            finish_oil_input: 1,
            date_end_oil_input: null,
          });
                */
            const resultUpdate = await Oil_input.update(obj, {
              where: { id_oil_input },
              transaction, // Asocia la transacción a la consulta
            });
            console.log("resultUpdate", resultUpdate);
            respuestas[`respuesta${iditem}`].actualizacionExitosa = true; // Almacenar la respuesta de la actualización
            break;
          } else {
            rest = parseFloat(el2.stock_oil_input) - spent;
            spent = 0;
            let obj = {
              stock_oil_input: rest,
              in_use_oil_input: 1,
              finish_oil_input: 0,
              date_end_oil_input: fechaFormateada,
            };
            // para que funcione la actualizacion de abajo hay que activar esto
            /*          register.push({
            id_oil_input: el2.id_oil_input,
            stock_oil_input: rest,
            in_use_oil_input: 1,
            finish_oil_input: 0,
            date_end_oil_input: null,
          }); */
            const resultUpdate = await Oil_input.update(obj, {
              where: { id_oil_input },
              transaction, // Asocia la transacción a la consulta
            });
            console.log("resultUpdate", resultUpdate);
            respuestas[`respuesta${iditem}`].actualizacionExitosa = true; // Almacenar la respuesta de la actualización
          }
        }
      }
    }
    let id_stock_e_oil = variablefinal;
    let obj = {
      closed_stock_e_oil: 1,
      end_date_stock_e_oil: fechaFormateada,
    };
    const resultUpdate4 = await Stock_e_oil.update(obj, {
      where: { id_stock_e_oil_ },
      transaction, // Asocia la transacción a la consulta
    });

    // aca esta yino la actualizacion del objetos con todos los datos y actualizando uno a uno
    /*   for (const el2 of register) {
    let id_oil_input = el2.id_oil_input;

    let obj = {
      stock_oil_input: el2.stock_oil_input,
      in_use_oil_input: el2.in_use_oil_input,
      finish_oil_input: 0,
      date_end_oil_input: null,
    };
    try {
      const resultUpdate = await Oil_input.update(obj, {
        where: { id_oil_input },
      });
      console.log("resultUpdate", resultUpdate);
    } catch (err) {
      console.log(err.stack);
    }
  } */
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
  getStocks_label,
  getStock_labelQuerySql2,
  getStock_label,
  createStock_label,
  updateStock_label,
  deleteStock_label,
  getStock_label_closed,
};
