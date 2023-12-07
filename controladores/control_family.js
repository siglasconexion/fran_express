import { Family } from "../db/models/Family.js";
import db from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

//export var suma = (a, b) => a + b;

export const getFamilys = async (req, res) => {
  // rutas - routes
  const data = await Family.findAll(); // SELECT * FROM users
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getUserQuerySql = async (req, res) => {
  // rutas - routes
  const data = await db.sequelize.query("SELECT * FROM users"); // SELECT * FROM users
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getFamily = async (req, res) => {
  // rutas - routes
  let resultGetOne = await Family.findAll({
    where: {
      id_family: req.body.id,
      //id_family: 10,
    },
  });
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found Data empty",
    });
    return;
  }
  res.json(resultGetOne);
};

export const createFamily = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Family.create({
    id_company_family: req.body.idcompanyfamily,
    id_status_family: req.body.idstatusfamily,
    name_family: req.body.namefamily,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};
export const updateFamily = async (req, res) => {
  const obj = req.body;
  //console.log(req.body.id);
  let resultUpdate = await Family.update(obj, {
    where: {
      id_family: req.body.id_family,
    },
  });
  //console.log(actualizar);
  resultUpdate[0] === 1
    ? res.json({
        message: "Family Updated successfully",
        resultUpdate: resultUpdate,
      })
    : res.json({
        message: "Family is not successfully",
        resultUpdate: resultUpdate,
      });
};

export const deleteFamily = async (req, res) => {
  try {
    console.log(req.body);
    const id_family = req.body.id;
    let resultDelete = await Family.destroy({
      where: {
        id_family,
      },
    });
    resultDelete === 1
      ? res.json({
          message: "Family  was deleted successfully ",
          resultDelete: resultDelete,
          resultDelete: resultDelete,
        })
      : res.json({
          message: "Family is not deleted successfully",
          resultDelete: resultDelete,
        });
  } catch (err) {
    console.log(err.stack);
  }
};

export const getDataExcel = async (req, res) => {
  try {
    xlsxj(
      {
        input: "excel_data.xlsx",
        output: "json_convertivo.json",
      },
      function (err, result) {
        if (err) {
          console.error(err);
        } else {
          res.json({ result });
        }
      }
    );
    console.log("Going to open file!");
    fs.writeFileSync(
      "input.txt",
      "Hola fran este es mi primer archivo",
      function (err, fd) {
        if (err) {
          return console.error(err);
        }
        console.log("File opened successfully!");
      }
    );
  } catch (e) {
    console.log(e.stack);
  }
};
