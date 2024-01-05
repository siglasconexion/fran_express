const { Stock_detail, Current_inventory } = require("../db/models/stock_detail.js");
const db = require("../db/conn.js");
const _ = require("lodash");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");

const getStock_details = async (req, res) => {
  const data = await Stock_detail.findAll();
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

const getStock_detailQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    "SELECT  id_stock_detail, id_item_stock_detail, id_container_stock_detail, id_place_stock_detail, id_stock_stock_detail, qty_container_stock_detail, units_stock_detail, total_stock_detail, name_item, code_item, name_container, qty_container FROM `stock_detail` INNER join item on stock_detail.id_item_stock_detail=item.id_item INNER JOIN container on stock_detail.id_container_stock_detail=id_container ORDER BY stock_detail.id_stock_detail "
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

const getStock_detail = async (req, res) => {
  let resultGetOne = await Stock_detail.findAll({
    where: {
      id_stock_detail: req.body.id,
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

const createStock_detail = async (req, res) => {
  try {
    await Stock_detail.create({
      id_stock_stock_detail: req.body.idstockstockdetail,
      id_item_stock_detail: req.body.iditemstockdetail,
      id_place_stock_detail: req.body.idplacestockdetail,
      id_container_stock_detail: req.body.idcontainerstockdetail,
      qty_container_stock_detail: req.body.qtycontainerstockdetail,
      units_stock_detail: req.body.unitsstockdetail,
      total_stock_detail: req.body.totalstockdetail,
    });

    const resultNew2 = await Current_inventory.findOne({
      where: {
        id_item_current_inventory: req.body.iditemstockdetail,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory.create({
        id_stock_current_inventory: req.body.idstockstockdetail,
        id_item_current_inventory: req.body.iditemstockdetail,
        total_current_inventory: req.body.totalstockdetail,
      });

      Object.entries(resultNew3).length === 0
        ? res.json({ message: "Register is not created" })
        : res.json({ message: resultNew3 });
      return;
    }

    let previousTotal = convertResultNew2.total_current_inventory;
    let totalNew = parseInt(req.body.totalstockdetail) + previousTotal;

    let obj = {
      id_stock_current_inventory: req.body.idstockstockdetail,
      id_item_current_inventory: req.body.iditemstockdetail,
      total_current_inventory: totalNew,
    };
    const resultUpdate = await Current_inventory.update(obj, {
      where: {
        id_item_current_inventory: req.body.iditemstockdetail,
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
  } catch (error) {
    console.log("aquir muestra la descripcion de error message", error.message);
    console.log("aquir el error stack", error.stack);
    console.log("aca el error erros", error.errors);
    console.log("aqui va el error de la funcion Create_stock_detail", error);
  }
};

const updateStock_detail = async (req, res) => {
  try {
    const obj = req.body;
    const id_stock_detail = req.body.id_stock_detail;
    let resultUpdate = await Stock_detail.update(obj, {
      where: {
        id_stock_detail: id_stock_detail,
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

const deleteStock_detail = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_detail = req.body.id;
    const id_stock_stock_detail = req.body.idstock;
    const total_stock_detail = req.body.total;
    let resultDelete = await Stock_detail.destroy({
      where: {
        id_stock_detail,
        id_stock_stock_detail,
      },
    });

    const resultNew2 = await Current_inventory.findOne({
      where: {
        id_item_current_inventory: req.body.iditem,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    if (!_.isEmpty(convertResultNew2)) {
      let previousTotal = convertResultNew2.total_current_inventory;
      let totalNew = previousTotal - parseInt(req.body.total);
      if (totalNew <= 0) {
        let resultDelete = await Current_inventory.destroy({
          where: {
            id_item_current_inventory: req.body.iditem,
            id_stock_current_inventory: req.body.idstock,
          },
        });
        return res.json();
      }
      let obj = {
        id_stock_current_inventory: req.body.idstock,
        id_item_current_inventory: req.body.iditem,
        total_current_inventory: totalNew,
      };
      const resultUpdate = await Current_inventory.update(obj, {
        where: {
          id_item_current_inventory: req.body.iditem,
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
    }
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = {
  getStock_details,
  getStock_detailQuerySql2,
  getStock_detail,
  createStock_detail,
  updateStock_detail,
  deleteStock_detail,
};
