import { Statu } from "../db/models/statu.js";
import db from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export const getStatus = async (req, res) => {
  const data = await Statu.findAll();
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getStatu = async (req, res) => {
  let resultGetOne = await Statu.findAll({
    where: {
      id_status: req.body.id,
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

export const createStatu = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Statu.create({
    id_company_status: req.body.idcompanystatus,
    description_status: req.body.descriptionstatus,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};
export const updateStatu = async (req, res) => {
  try {
    const obj = req.body;
    const id_status = req.body.id_status;
    let resultUpdate = await Statu.update(obj, {
      where: {
        id_status: id_status,
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

export const deleteStatu = async (req, res) => {
  try {
    console.log(req.body);
    const id_status = req.body.id;
    let resultDelete = await Statu.destroy({
      where: {
        id_status,
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
