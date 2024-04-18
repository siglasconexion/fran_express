const { Stock_detail_item } = require("../db/models/stock_detail_item.js");
const {
  Current_inventory_item,
} = require("../db/models/current_inventory_item.js");

const db = require("../db/conn.js");
const _ = require("lodash");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");

const getStock_details_item = async (req, res) => {
  const data = await Stock_detail_item.findAll();
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

const getStock_detail_itemQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    "SELECT  id_stock_detail_item, id_item_stock_detail_item, id_container_stock_detail_item, id_place_stock_detail_item, id_stock_stock_detail_item, qty_container_stock_detail_item, units_stock_detail_item, total_stock_detail_item, name_item, code_item, name_container, qty_container FROM `stock_detail_item` INNER join item on stock_detail_item.id_item_stock_detail_item=item.id_item INNER JOIN container on stock_detail_item.id_container_stock_detail_item=id_container ORDER BY stock_detail_item.id_stock_detail_item "
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

const getStock_detail_item = async (req, res) => {
  let resultGetOne = await Stock_detail_item.findAll({
    // select * from Stock_detail_item
    where: {
      id_stock_detail_item: req.body.id,
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

const createStock_detail_item = async (req, res) => {
  try {
    await Stock_detail_item.create({
      id_stock_stock_detail_item: req.body.idstockstockdetailitem,
      id_item_stock_detail_item: req.body.iditemstockdetailitem,
      id_place_stock_detail_item: req.body.idplacestockdetailitem,
      id_container_stock_detail_item: req.body.idcontainerstockdetailitem,
      qty_container_stock_detail_item: req.body.qtycontainerstockdetailitem,
      units_stock_detail_item: req.body.unitsstockdetailitem,
      total_stock_detail_item: req.body.totalstockdetailitem,
    });

    const resultNew2 = await Current_inventory_item.findOne({
      where: {
        id_item_current_inventory_item: req.body.iditemstockdetailitem,
        id_stock_current_inventory_item: req.body.idstockstockdetailitem,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_item.create({
        id_stock_current_inventory_item: req.body.idstockstockdetailitem,
        id_item_current_inventory_item: req.body.iditemstockdetailitem,
        total_current_inventory_item: req.body.totalstockdetailitem,
      });
      console.log("segunda", resultNew3);

      Object.entries(resultNew3).length === 0
        ? res.json({ message: "Register is not created" })
        : res.json({ message: resultNew3 });
      return;
    }

    let previousTotal = convertResultNew2.total_current_inventory_item;
    let totalNew = parseInt(req.body.totalstockdetailitem) + previousTotal;

    let obj = {
      id_stock_current_inventory_item: req.body.idstockstockdetailitem,
      id_item_current_inventory_item: req.body.iditemstockdetailitem,
      total_current_inventory_item: totalNew,
    };
    const resultUpdate = await Current_inventory_item.update(obj, {
      where: {
        id_item_current_inventory_item: req.body.iditemstockdetailitem,
        id_stock_current_inventory_item: req.body.idstockstockdetailitem,
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

const updateStock_detail_item = async (req, res) => {
  try {
    const obj = req.body;
    const id_stock_detail_item = req.body.id_stock_detail_item;
    let resultUpdate = await Stock_detail_item.update(obj, {
      where: {
        id_stock_detail_item: id_stock_detail_item,
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

const deleteStock_detail_item = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_detail_item = req.body.id;
    const id_stock_stock_detail_item = req.body.idstock;
    const total_stock_detail_item = req.body.total;
    let resultDelete = await Stock_detail_item.destroy({
      where: {
        id_stock_detail_item,
        id_stock_stock_detail_item,
      },
    });

    const resultNew2 = await Current_inventory_item.findOne({
      where: {
        id_item_current_inventory_item: req.body.iditem,
        id_stock_current_inventory_item: req.body.idstock,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    if (!_.isEmpty(convertResultNew2)) {
      let previousTotal = convertResultNew2.total_current_inventory_item;
      let totalNew = previousTotal - parseInt(req.body.total);
      if (totalNew <= 0) {
        let resultDelete = await Current_inventory_item.destroy({
          where: {
            id_item_current_inventory_item: req.body.iditem,
            id_stock_current_inventory_item: req.body.idstock,
          },
        });
        return res.json();
      }
      let obj = {
        id_stock_current_inventory_item: req.body.idstock,
        id_item_current_inventory_item: req.body.iditem,
        total_current_inventory_item: totalNew,
      };
      const resultUpdate = await Current_inventory_item.update(obj, {
        where: {
          id_item_current_inventory_item: req.body.iditem,
          id_stock_current_inventory_item: req.body.idstock,
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
  getStock_details_item,
  getStock_detail_itemQuerySql2,
  getStock_detail_item,
  createStock_detail_item,
  updateStock_detail_item,
  deleteStock_detail_item,
};
