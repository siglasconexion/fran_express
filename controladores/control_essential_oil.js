import { Essential_oil } from "../db/models/essential_oil.js";
import { db } from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export const getEssential_oils = async (req, res) => {
  const data = await Essential_oil.findAll();
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

export const getEssential_oil = async (req, res) => {
  let resultGetOne = await Essential_oil.findAll({
    where: {
      id_essential_oil: req.body.id,
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

export const createEssential_oil = async (req, res) => {
  console.log("aca el reg", req.body);
  const resultNew = await Essential_oil.create({
    id_company_essential_oil: req.body.idcompanyessentialoil,
    id_status_essential_oil: req.body.idstatusessentialoil,
    id_container_essential_oil_one: req.body.idcontaineressentialoilone,
    id_container_essential_oil_two: req.body.idcontaineressentialoiltwo,
    id_helper_container_essential_oil: idhelpercontaineressentialoil,
    id_measure_essential_oil: req.body.idmeasureessentialoil,
    id_family_essential_oil: req.body.idfamilyessentialoil,
    code_essential_oil: req.body.codeessentialoil,
    code_two_essential_oil: req.body.codetwoessentialoil,
    name_essential_oil: req.body.nameessentialoil,
    sku_pakage: req.body.skupakage,
    //stock_essential_oil_one: req.body.stockessentialoilone,
    //stock_essential_oil_two: req.body.stockessentialoiltwo,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateEssential_oil = async (req, res) => {
  try {
    const obj = req.body;
    const id_essential_oil = req.body.id_essential_oil;
    let resultUpdate = await Essential_oil.update(obj, {
      where: {
        id_essential_oil: id_essential_oil,
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

export const deleteEssential_oil = async (req, res) => {
  try {
    const id_essential_oil = req.body.id;
    let resultDelete = await Essential_oil.destroy({
      where: {
        id_essential_oil,
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
