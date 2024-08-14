const { Type_recharge } = require("../db/models/type_recharge.js");
const db = require("../db/conn.js");

const getType_recharges = async (req, res) => {
  const data = await Type_recharge.findAll();
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

const getType_rechargeQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from type_recharge"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getType_recharge = async (req, res) => {
  let resultGetOne = await Type_recharge.findAll({
    where: {
      id_type_recharge: req.body.id,
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

const createType_recharge = async (req, res) => {
  const resultNew = await Type_recharge.create({
    desc_type_recharge: req.body.desctyperecharge,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateType_recharge = async (req, res) => {
  try {
    const obj = req.body;
    const id = req.body.id;
    let resultUpdate = await Type_recharge.update(obj, {
      where: {
        id_type_recharge: id,
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

const deleteType_recharge = async (req, res) => {
  try {
    const id_type_recharge = req.body.id;
    let resultDelete = await Type_recharge.destroy({
      where: {
        id_type_recharge,
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
  getType_recharges,
  getType_rechargeQuerySql2,
  getType_recharge,
  createType_recharge,
  updateType_recharge,
  deleteType_recharge,
};
