const { Type_user } = require("../db/models/type_user.js");
const db = require("../db/conn.js");
const jwt = require("jsonwebtoken");

const getType_users = async (req, res) => {
  const data = await Type_user.findAll();
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

const getType_userQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from type_user"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getType_user = async (req, res) => {
  let resultGetOne = await Type_user.findAll({
    where: {
      id_type_user: req.body.id,
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

const createType_user = async (req, res) => {
  const resultNew = await Type_user.create({
    id_company_type_user: req.body.idcompanytypeuser,
    id_status_type_user: req.body.idstatustypeuser,
    description_type_user: req.body.descriptiontypeuser,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateType_user = async (req, res) => {
  try {
    const obj = req.body;
    const id_type_user = req.body.id_type_user;
    let resultUpdate = await User.update(obj, {
      where: {
        id_type_user: id_type_user,
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

const deleteType_user = async (req, res) => {
  try {
    console.log(req.body);
    const id_type_user = req.body.id;
    let resultDelete = await Type_user.destroy({
      where: {
        id_type_user,
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
  getType_users,
  getType_userQuerySql2,
  getType_user,
  createType_user,
  updateType_user,
  deleteType_user,
};
