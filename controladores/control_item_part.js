const { Item_part } = require("../db/models/item_part.js");
const db = require("../db/conn.js");
const _ = require("lodash");

//// ojo quitar de aca las funciones que no se usa y revisar otros archivos para hacer lo mismo

const getItem_parts = async (req, res) => {
  const data = await Item_part.findAll();
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

const getItem_partQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from item_part"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getItem_part = async (req, res) => {
  let variable = req.params.variable;
  console.log("req.body.iditem", req.params);
  let resultGetOne = await Item_part.findAll({
    where: {
      id_item: variable,
    },
  });
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
      // dato: "encontrado",
    });
    return;
  }
  res.json(resultGetOne);
};

const createItem_part = async (req, res) => {
  // ojo colocar akika try cath
  const previosResult = await Item_part.findOne({
    where: {
      id_item: req.body.iditem,
      id_part: req.body.idpart,
      id_type_inventory: req.body.idtypeinventory,
    },
  });
  console.log("previosResult", previosResult);
  let convertPreviosResult = previosResult?.toJSON();
  console.log("primera consulta", convertPreviosResult);
  //    if (_.isEmpty(convertPreviosResult)) {
  if (_.isEmpty(convertPreviosResult)) {
    const resultNew = await Item_part.create({
      id_item: req.body.iditem,
      id_part: req.body.idpart,
      id_type_inventory: req.body.idtypeinventory,
      qty: req.body.qtyitem,
    });
    console.log("req.body.iditem", req.body.iditem);
    console.log("req.body.idpart", req.body.idpart);
    console.log("req.body.idtypeinventory", req.body.idtypeinventory);
    console.log("req.body.qtyitem", req.body.qtyitem);
    let longitud = Object.entries(resultNew).length;
    Object.entries(resultNew).length === 0
      ? res.json({ message: "Register is not created" })
      : res.json({
          message: "Record created successfully",
          data: resultNew,
          longitud: longitud,
        });
    return;
  } else {
    res.json({
      message: "duplicate record, check",
      data: "",
      longitud: "",
    });
    //return;
  }
};

const updateItem_part = async (req, res) => {
  try {
    const obj = req.body;
    const id = req.body.id;
    let resultUpdate = await Item_part.update(obj, {
      where: {
        id: id,
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

const deleteItem_part = async (req, res) => {
  try {
    const id = req.body.iditem;
    let resultDelete = await Item_part.destroy({
      where: {
        id,
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
  getItem_parts,
  getItem_partQuerySql2,
  getItem_part,
  createItem_part,
  updateItem_part,
  deleteItem_part,
};
