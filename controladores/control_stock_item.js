const { Stock_item } = require("../db/models/stock_item.js");
const db = require("../db/conn.js");

const getStocks_item = async (req, res) => {
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

const getStock_itemQuerySql2 = async (req, res) => {
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

const getStock_item = async (req, res) => {
  let resultGetOne = await Stock_item.findAll({
    where: {
      id_status_stock_item: 1,
    },
  });
  res.json(resultGetOne);
};

const createStock_item = async (req, res) => {
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

const updateStock_item = async (req, res) => {
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

const deleteStock_item = async (req, res) => {
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

module.exports = {
  getStocks_item,
  getStock_itemQuerySql2,
  getStock_item,
  createStock_item,
  updateStock_item,
  deleteStock_item,
};
