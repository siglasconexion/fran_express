import { Stock_detail_bag } from "../db/models/stock_detail_bag.js";
import { Current_inventory_bag } from "../db/models/current_inventory_bag.js";
import { Bag } from "../db/models/bag.js";
import { db } from "../db/conn.js";
import _ from "lodash";
import { QueryTypes } from "sequelize";

export const getStock_details_bag = async (req, res) => {
  const data = await Stock_detail_bag.findAll();
  if (data.length <= 0) {
    res.status(201).json({
      code: 201,
      message: "Results not found",
      statusText: "new message",
      ok: "false",
    });
    return;
  }
  res.status(200).json(data);
};

export const getStock_detail_bagQuerySql2 = async (req, res) => {
  let variablefinal = req.params.variable;
  const data = await db.sequelize.query(
    `SELECT id_stock_detail_bag, id_stock_stock_detail_bag , id_bag_stock_detail_bag, qty_stock_detail_bag,  name_bag FROM stock_detail_bag INNER JOIN bag ON id_bag_stock_detail_bag=id_bag where id_stock_stock_detail_bag = ${variablefinal}  ORDER BY id_stock_detail_bag `,
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

export const getStock_detail_bag = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Stock_detail_bag.findOne({
    where: {
      id_bag_stock_detail_bag: variable,
    },
  });
  let convertResultNew2 = resultGetOne?.toJSON();
  console.log("ver aqui", convertResultNew2);
  if (_.isEmpty(convertResultNew2)) {
    res.status(201).json({
      code: 201,
      message: "Results not found",
      statusText: "new message",
      ok: "false",
    });
    return;
  }
  res.json(resultGetOne);
};

export const createStock_detail_bag = async (req, res) => {
  let resAllQuerys = [];
  const transaction = await db.sequelize.transaction(); // Inicia la transaccion
  try {
    const newRegister = await Stock_detail_bag.create(
      {
        id_stock_stock_detail_bag: req.body.idstockstockdetailbag,
        id_bag_stock_detail_bag: req.body.idbagstockdetailbag,
        qty_stock_detail_bag: req.body.qtystockdetailbag,
      },
      transaction
    );
    resAllQuerys.push({
      stock_detail_bag: "Created successfully",
      newRegister: newRegister,
    });
    //      id_bag: req.body.idbagstockdetailbag,
    let obj2 = {
      weight_box_bag: req.body.weightboxbag,
    };
    const resultUpdate2 = await Bag.update(
      obj2,
      {
        where: {
          id_bag: req.body.idbagstockdetailbag,
        },
      },
      transaction
    );
    resAllQuerys.push({ bag: " Record Update successfully" });
    const resultNew2 = await Current_inventory_bag.findOne({
      where: {
        id_bag_current_inventory_bag: req.body.idbagstockdetailbag,
        id_stock_current_inventory_bag: req.body.idstockstockdetailbag,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    //console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_bag.create(
        {
          id_stock_current_inventory_bag: req.body.idstockstockdetailbag,
          id_bag_current_inventory_bag: req.body.idbagstockdetailbag,
          initial: 0,
          production: 0,
          purchase: 0,
          other_entries: 0,
          damaged: 0,
          defeated: 0,
          returned: 0,
          adjustment: 0,
          total_current_inventory_bag: req.body.qtystockdetailbag,
        },
        transaction
      );
      //console.log("segunda", resultNew3);
      Object.entries(resultNew3).length === 0
        ? resAllQuerys.push({
            Current_inventory_bag: " Record is not created",
          })
        : resAllQuerys.push({
            Current_inventory_bag: " Record was created successfully",
          });
    } else {
      let previousTotal = convertResultNew2.total_current_inventory_bag;

      let totalNew =
        parseFloat(req.body.qtystockdetailbag) + parseFloat(previousTotal);

      let obj = {
        id_stock_current_inventory_bag: req.body.idstockstockdetailbag,
        id_bag_current_inventory_bag: req.body.idbagstockdetailbag,
        total_current_inventory_bag: totalNew,
      };
      const resultUpdate = await Current_inventory_bag.update(
        obj,
        {
          where: {
            id_bag_current_inventory_bag: req.body.idbagstockdetailbag,
            id_stock_current_inventory_bag: req.body.idstockstockdetailbag,
          },
        },
        transaction
      );
      if (resultUpdate[0] === 1) {
        resAllQuerys.push({
          Current_inventory_bag: " Record was updated successfully",
          resultUpdate: resultUpdate,
        });
      } else {
        resAllQuerys.push({
          Current_inventory_bag: " Record was not updated",
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
      "aqui va el error de la funcion Create_stock_detail_bag",
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

//// ojo voy por akika ..................................................................................................................................................................
export const updateStock_detail_bag = async (req, res) => {
  //esto no se usa hay que borrarla
  try {
    const obj = req.body;
    const id_stock_detail_bag = req.body.id_stock_detail_bag;
    let resultUpdate = await Stock_detail_bag.update(obj, {
      where: {
        id_stock_detail_bag: id_stock_detail_bag,
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

export const deleteStock_detail_bag = async (req, res) => {
  try {
    // console.log(req.body);
    const id_stock_detail_bag = req.body.id;
    const id_stock_stock_detail_bag = req.body.idstock;

    let resultDelete = await Stock_detail_bag.destroy({
      where: {
        id_stock_detail_bag,
        id_stock_stock_detail_bag,
      },
    });
    const resultNew2 = await Current_inventory_bag.findOne({
      where: {
        id_bag_current_inventory_bag: req.body.idbag,
        id_stock_current_inventory_bag: req.body.idstock,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    if (!_.isEmpty(convertResultNew2)) {
      let previousTotal = convertResultNew2.total_current_inventory_bag;
      let totalNew = previousTotal - parseFloat(req.body.total);
      //if (totalNew <= 0) {
      /*        let resultDelete = await Current_inventory_bag.destroy({
            where: {
              id_bag_current_inventory_bag: req.body.idbag,
              id_stock_current_inventory_bag: req.body.idstock,
            },
          }); */
      //return res.status(200).json({
      //  message: "Status Update successfully en ceraapio",
      //});
      //                 return res.json();
      //}
      let obj = {
        id_stock_current_inventory_bag: req.body.idstock,
        id_bag_current_inventory_bag: req.body.idbag,
        total_current_inventory_bag: totalNew,
      };
      const resultUpdate = await Current_inventory_bag.update(obj, {
        where: {
          id_bag_current_inventory_bag: req.body.idbag,
          id_stock_current_inventory_bag: req.body.idstock,
        },
      });
      if (resultUpdate[0] === 1) {
        res.status(200).json({
          message: "Status Update successfully.........",
          resultUpdate: resultUpdate,
        });
      } else {
        res.status(400).json({
          error: "valor demasiado grande",
          message: "Status not successfully",
          resultUpdate: resultUpdate,
        });
      }
    }
  } catch (err) {
    console.log(err.stack);
    console.log("otro error", err.error);
  }
};
