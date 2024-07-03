const { Type_inventory } = require("../db/models/type_inventory.js");
const db = require("../db/conn.js");

const getType_inventorys = async (req, res) => {
  const data = await Type_inventory.findAll();
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

const getType_inventoryQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from type_inventory"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getType_inventory = async (req, res) => {
  let resultGetOne = await Type_inventory.findAll({
    where: {
      id: req.body.id,
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

const createType_inventory = async (req, res) => {
  const resultNew = await Type_inventory.create({
    name: req.body.name,
    name_table: req.body.nametable,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateType_inventory = async (req, res) => {
  try {
    const obj = req.body;
    const id = req.body.id;
    let resultUpdate = await Type_inventory.update(obj, {
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

const deleteType_inventory = async (req, res) => {
  try {
    const id = req.body.id;
    let resultDelete = await Type_inventory.destroy({
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
  getType_inventorys,
  getType_inventoryQuerySql2,
  getType_inventory,
  createType_inventory,
  updateType_inventory,
  deleteType_inventory,
};
