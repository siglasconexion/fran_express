const { Stock_detail_label } = require("../db/models/stock_detail_label.js");
const {
  Current_inventory_label,
} = require("../db/models/current_inventory_label.js");
const { Label } = require("../db/models/label.js");

const db = require("../db/conn.js");
const _ = require("lodash");
const { QueryTypes } = require("sequelize");
const getStock_details_label = async (req, res) => {
  const data = await Stock_detail_label.findAll();
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

const getStock_detail_labelQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    "SELECT id_stock_detail_label, id_stock_stock_detail_label , id_label_stock_detail_label, qty_stock_detail_label,  name_label FROM stock_detail_label INNER JOIN label ON id_label_stock_detail_label=id_label ORDER BY id_stock_detail_label ",
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

const getStock_detail_label = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Stock_detail_label.findOne({
    // select * from Stock_detail_label
    where: {
      id_label_stock_detail_label: variable,
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

const createStock_detail_label = async (req, res) => {
  let wsupport = req.body.weightsupportlabel;
  try {
    await Stock_detail_label.create({
      id_stock_stock_detail_label: req.body.idstockstockdetaillabel,
      id_label_stock_detail_label: req.body.idlabelstockdetaillabel,
      qty_stock_detail_label: req.body.qtystockdetaillabel,
    });

    const resultNew2 = await Current_inventory_label.findOne({
      where: {
        id_label_current_inventory_label: req.body.idlabelstockdetaillabel,
        id_stock_current_inventory_label: req.body.idstockstockdetaillabel,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    //console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_label.create({
        id_stock_current_inventory_label: req.body.idstockstockdetaillabel,
        id_label_current_inventory_label: req.body.idlabelstockdetaillabel,
        total_current_inventory_label: req.body.qtystockdetaillabel,
      });
      console.log("segunda", resultNew3);

      Object.entries(resultNew3).length === 0
        ? res.json({ message: "Register is not created" })
        : res.json({ message: resultNew3 });
      return;
    }

    let previousTotal = convertResultNew2.total_current_inventory_label;

    let totalNew =
      parseFloat(req.body.qtystockdetaillabel) + parseFloat(previousTotal);

    let obj = {
      id_stock_current_inventory_label: req.body.idstockstockdetaillabel,
      id_label_current_inventory_label: req.body.idlabelstockdetaillabel,
      total_current_inventory_label: totalNew,
    };
    const resultUpdate = await Current_inventory_label.update(obj, {
      where: {
        id_label_current_inventory_label: req.body.idlabelstockdetaillabel,
        id_stock_current_inventory_label: req.body.idstockstockdetaillabel,
      },
    });
    let obj2 = {
      id_label: req.body.idlabelstockdetaillabel,
      weight_support_label: req.body.weightsupportlabel,
    };
    const resultUpdate2 = await Label.update(obj2, {
      where: {
        id_label: req.body.idlabelstockdetaillabel,
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

const updateStock_detail_label = async (req, res) => {
  //esto no se usa hay que borrarla
  try {
    const obj = req.body;
    const id_stock_detail_label = req.body.id_stock_detail_label;
    let resultUpdate = await Stock_detail_label.update(obj, {
      where: {
        id_stock_detail_label: id_stock_detail_label,
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

const deleteStock_detail_label = async (req, res) => {
  try {
    console.log(req.body);
    const id_stock_detail_label = req.body.id;
    const id_stock_stock_detail_label = req.body.idstock;

    let resultDelete = await Stock_detail_label.destroy({
      where: {
        id_stock_detail_label,
        id_stock_stock_detail_label,
      },
    });

    const resultNew2 = await Current_inventory_label.findOne({
      where: {
        id_label_current_inventory_label: req.body.idlabel,
        id_stock_current_inventory_label: req.body.idstock,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    if (!_.isEmpty(convertResultNew2)) {
      let previousTotal = convertResultNew2.total_current_inventory_label;
      let totalNew = previousTotal - parseFloat(req.body.total);
      if (totalNew <= 0) {
        let resultDelete = await Current_inventory_label.destroy({
          where: {
            id_label_current_inventory_label: req.body.idlabel,
            id_stock_current_inventory_label: req.body.idstock,
          },
        });
        return res.json();
      }
      let obj = {
        id_stock_current_inventory_label: req.body.idstock,
        id_label_current_inventory_label: req.body.idlabel,
        total_current_inventory_label: totalNew,
      };
      const resultUpdate = await Current_inventory_label.update(obj, {
        where: {
          id_label_current_inventory_label: req.body.idlabel,
          id_stock_current_inventory_label: req.body.idstock,
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
  getStock_details_label,
  getStock_detail_labelQuerySql2,
  getStock_detail_label,
  createStock_detail_label,
  updateStock_detail_label,
  deleteStock_detail_label,
};
