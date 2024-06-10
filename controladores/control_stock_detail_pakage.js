const { Stock_detail_pakage } = require("../db/models/stock_detail_pakage.js");
const {
  Current_inventory_pakage,
} = require("../db/models/current_inventory_pakage.js");
const { Pakage } = require("../db/models/pakage.js");

const db = require("../db/conn.js");
const _ = require("lodash");
const { QueryTypes } = require("sequelize");
const getStock_details_pakage = async (req, res) => {
  const data = await Stock_detail_pakage.findAll();
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

const getStock_detail_pakageQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    "SELECT id_stock_detail_pakage, id_stock_stock_detail_pakage , id_pakage_stock_detail_pakage, qty_stock_detail_pakage,  name_pakage FROM stock_detail_pakage INNER JOIN pakage ON id_pakage_stock_detail_pakage=id_pakage ORDER BY id_stock_detail_pakage ",
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

const getStock_detail_pakage = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Stock_detail_pakage.findOne({
    where: {
      id_pakage_stock_detail_pakage: variable,
      //id_stock_current_inventory_pakage: req.body.idstockstockdetailpakage,
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

const createStock_detail_pakage = async (req, res) => {
  try {
    await Stock_detail_pakage.create({
      id_stock_stock_detail_pakage: req.body.idstockstockdetailpakage,
      id_pakage_stock_detail_pakage: req.body.idpakagestockdetailpakage,
      qty_stock_detail_pakage: req.body.qtystockdetailpakage,
    });
    let obj2 = {
      id_pakage: req.body.idpakagestockdetailpakage,
      weight_box_pakage: req.body.weightboxpakage,
      weight_pakage: req.body.weightpakage,
    };
    const resultUpdate2 = await Pakage.update(obj2, {
      where: {
        id_pakage: req.body.idpakagestockdetailpakage,
      },
    });
    const resultNew2 = await Current_inventory_pakage.findOne({
      where: {
        id_pakage_current_inventory_pakage: req.body.idpakagestockdetailpakage,
        id_stock_current_inventory_pakage: req.body.idstockstockdetailpakage,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    //console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_pakage.create({
        id_stock_current_inventory_pakage: req.body.idstockstockdetailpakage,
        id_pakage_current_inventory_pakage: req.body.idpakagestockdetailpakage,
        total_current_inventory_pakage: req.body.qtystockdetailpakage,
      });
      console.log("segunda", resultNew3);

      Object.entries(resultNew3).length === 0
        ? res.json({ message: "Register is not created" })
        : res.json({ message: resultNew3 });
      return;
    }

    let previousTotal = convertResultNew2.total_current_inventory_pakage;

    let totalNew =
      parseFloat(req.body.qtystockdetailpakage) + parseFloat(previousTotal);

    let obj = {
      id_stock_current_inventory_pakage: req.body.idstockstockdetailpakage,
      id_pakage_current_inventory_pakage: req.body.idpakagestockdetailpakage,
      total_current_inventory_pakage: totalNew,
    };
    const resultUpdate = await Current_inventory_pakage.update(obj, {
      where: {
        id_pakage_current_inventory_pakage: req.body.idpakagestockdetailpakage,
        id_stock_current_inventory_pakage: req.body.idstockstockdetailpakage,
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

const updateStock_detail_pakage = async (req, res) => {
  //esto no se usa hay que borrarla
  try {
    const obj = req.body;
    const id_stock_detail_pakage = req.body.id_stock_detail_pakage;
    let resultUpdate = await Stock_detail_pakage.update(obj, {
      where: {
        id_stock_detail_pakage: id_stock_detail_pakage,
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

const deleteStock_detail_pakage = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_detail_pakage = req.body.id;
    const id_stock_stock_detail_pakage = req.body.idstock;

    let resultDelete = await Stock_detail_pakage.destroy({
      where: {
        id_stock_detail_pakage,
        id_stock_stock_detail_pakage,
      },
    });

    const resultNew2 = await Current_inventory_pakage.findOne({
      where: {
        id_pakage_current_inventory_pakage: req.body.idpakage,
        id_stock_current_inventory_pakage: req.body.idstock,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    if (!_.isEmpty(convertResultNew2)) {
      let previousTotal = convertResultNew2.total_current_inventory_pakage;
      let totalNew = previousTotal - parseFloat(req.body.total);
      if (totalNew <= 0) {
        let resultDelete = await Current_inventory_pakage.destroy({
          where: {
            id_pakage_current_inventory_pakage: req.body.idpakage,
            id_stock_current_inventory_pakage: req.body.idstock,
          },
        });
        return res.json();
      }
      let obj = {
        id_stock_current_inventory_pakage: req.body.idstock,
        id_pakage_current_inventory_pakage: req.body.idpakage,
        total_current_inventory_pakage: totalNew,
      };
      const resultUpdate = await Current_inventory_pakage.update(obj, {
        where: {
          id_pakage_current_inventory_pakage: req.body.idpakage,
          id_stock_current_inventory_pakage: req.body.idstock,
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
    console.log("otro error", err.error);
  }
};

module.exports = {
  getStock_details_pakage,
  getStock_detail_pakageQuerySql2,
  getStock_detail_pakage,
  createStock_detail_pakage,
  updateStock_detail_pakage,
  deleteStock_detail_pakage,
};
