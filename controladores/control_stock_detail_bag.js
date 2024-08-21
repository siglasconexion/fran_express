const { Stock_detail_bag } = require("../db/models/stock_detail_bag.js");
const {
  Current_inventory_bag,
} = require("../db/models/current_inventory_bag.js");
const { Bag } = require("../db/models/bag.js");
const db = require("../db/conn.js");
const _ = require("lodash");
const { QueryTypes } = require("sequelize");

const getStock_details_bag = async (req, res) => {
  const data = await Stock_detail_bag.findAll();
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

const getStock_detail_bagQuerySql2 = async (req, res) => {
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

const getStock_detail_bag = async (req, res) => {
  let variable = req.params.variable;
  let resultGetOne = await Stock_detail_bag.findOne({
    where: {
      id_bag_stock_detail_bag: variable,
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

const createStock_detail_bag = async (req, res) => {
  try {
    await Stock_detail_bag.create({
      id_stock_stock_detail_bag: req.body.idstockstockdetailbag,
      id_bag_stock_detail_bag: req.body.idbagstockdetailbag,
      qty_stock_detail_bag: req.body.qtystockdetailbag,
    });
    let obj2 = {
      id_bag: req.body.idbagstockdetailbag,
      weight_box_bag: req.body.weightboxbag,
    };
    const resultUpdate2 = await Bag.update(obj2, {
      where: {
        id_bag: req.body.idbagstockdetailbag,
      },
    });
    const resultNew2 = await Current_inventory_bag.findOne({
      where: {
        id_bag_current_inventory_bag: req.body.idbagstockdetailbag,
        id_stock_current_inventory_bag: req.body.idstockstockdetailbag,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    //console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_bag.create({
        id_stock_current_inventory_bag: req.body.idstockstockdetailbag,
        id_bag_current_inventory_bag: req.body.idbagstockdetailbag,
        total_current_inventory_bag: req.body.qtystockdetailbag,
      });
      //console.log("segunda", resultNew3);

      Object.entries(resultNew3).length === 0
        ? res.json({ message: "Register is not created" })
        : res.json({ message: resultNew3 });
      return;
    }

    let previousTotal = convertResultNew2.total_current_inventory_bag;

    let totalNew =
      parseFloat(req.body.qtystockdetailbag) + parseFloat(previousTotal);

    let obj = {
      id_stock_current_inventory_bag: req.body.idstockstockdetailbag,
      id_bag_current_inventory_bag: req.body.idbagstockdetailbag,
      total_current_inventory_bag: totalNew,
    };
    const resultUpdate = await Current_inventory_bag.update(obj, {
      where: {
        id_bag_current_inventory_bag: req.body.idbagstockdetailbag,
        id_stock_current_inventory_bag: req.body.idstockstockdetailbag,
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

const updateStock_detail_bag = async (req, res) => {
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

const deleteStock_detail_bag = async (req, res) => {
  try {
    console.log(req.body);
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
      if (totalNew <= 0) {
        /*        let resultDelete = await Current_inventory_bag.destroy({
          where: {
            id_bag_current_inventory_bag: req.body.idbag,
            id_stock_current_inventory_bag: req.body.idstock,
          },
        }); */
        return res.json();
      }
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
  getStock_details_bag,
  getStock_detail_bagQuerySql2,
  getStock_detail_bag,
  createStock_detail_bag,
  updateStock_detail_bag,
  deleteStock_detail_bag,
};
