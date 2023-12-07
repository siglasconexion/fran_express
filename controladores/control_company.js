import { Company } from "../db/models/company.js";
import db from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export const getCompanys = async (req, res) => {
  const data = await Company.findAll();
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getCompany = async (req, res) => {
  let resultGetOne = await Company.findAll({
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

export const createCompany = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Company.create({
    id_status_company: req.body.idstatuscompany,
    code_company: req.body.codecompany,
    name_company: req.body.namecompany,
    address_company: req.body.addresscompany,
    city_company: req.body.citycompany,
    unit_company: req.body.unitcompany,
    postal_code_company: req.body.postalcodecompany,
    phone_number_company: req.body.phonenumbercompany,
    email_company: req.body.emailcompany,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};
export const updateCompany = async (req, res) => {
  try {
    const obj = req.body;
    const id_company = req.body.id_company;
    let resultUpdate = await Company.update(obj, {
      where: {
        id_company: id_company,
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

export const deleteCompany = async (req, res) => {
  try {
    console.log(req.body);
    const id_company = req.body.id;
    let resultDelete = await Company.destroy({
      where: {
        id_company,
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
