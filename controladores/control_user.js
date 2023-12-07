import { User } from "../db/models/user.js";
import db from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export const getUsers = async (req, res) => {
  const data = await User.findAll();
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

export const getUserQuerySql2 = async (req, res) => {
  // rutas - routes
  const data = await db.sequelize.query("SELECT  * from user"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getUser = async (req, res) => {
  let resultGetOne = await User.findAll({
    where: {
      id_user: req.body.id,
    },
  });
  console.log("aca no veo nada", resultGetOne);
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  }
  res.json(resultGetOne);
};

export const createUser = async (req, res) => {
  const resultNew = await Stock.create({
    id_company_user: req.body.idcompanyuser,
    id_type_user: req.body.idtypeuser,
    id_status_user: req.body.idstatususer,
    name_user: req.body.nameuser,
    name_key_user: req.body.namekeyuser,
    email_user: req.body.emailuser,
    password_user: req.body.password,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};
export const updateUser = async (req, res) => {
  try {
    const obj = req.body;
    const id_user = req.body.id_user;
    let resultUpdate = await User.update(obj, {
      where: {
        id_user: id_user,
      },
    });
    //res.json({ message: "User Update successfully" });
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

export const deleteUser = async (req, res) => {
  try {
    console.log(req.body);
    const id_user = req.body.id;
    let resultDelete = await User.destroy({
      where: {
        id_user,
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
