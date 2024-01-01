import { Measure_oz } from "../db/models/measure_oz.js";
import db from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

//export var suma = (a, b) => a + b;

export const getMeasure_ozs = async (req, res) => {
  // rutas - routes
  const data = await Measure_oz.findAll(); // SELECT * FROM users
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getMeasure_ozQuerySql2 = async (req, res) => {
  // rutas - routes
  const data = await db.sequelize.query("SELECT * FROM measure_oz"); // SELECT * FROM users
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getMeasure_oz = async (req, res) => {
  // rutas - routes
  let resultGetOne = await Measure_oz.findAll({
    where: {
      id_measure_oz: req.body.id,
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

export const createMeasure_oz = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Measure_oz.create({
    id_company_measure_oz: req.body.idcompanymeasureoz,
    id_status_measure_oz: req.body.idstatusmeasureoz,
    name_measure_oz: req.body.namemeasureoz,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};
export const updateMeasure_oz = async (req, res) => {
  const obj = req.body;
  //console.log(req.body.id);
  let resultUpdate = await Measure_oz.update(obj, {
    where: {
      id_measure_oz: req.body.id_measure_oz,
    },
  });
  //console.log(actualizar);
  resultUpdate[0] === 1
    ? res.json({
        message: "Measure_oz Updated successfully",
        resultUpdate: resultUpdate,
      })
    : res.json({
        message: "Measure_oz is not successfully",
        resultUpdate: resultUpdate,
      });
};

export const deleteMeasure_oz = async (req, res) => {
  try {
    console.log(req.body);
    const id_measure_oz = req.body.id;
    let resultDelete = await Measure_oz.destroy({
      where: {
        id_measure_oz,
      },
    });
    resultDelete === 1
      ? res.json({
          message: "Measure_oz  was deleted successfully ",
          resultDelete: resultDelete,
          resultDelete: resultDelete,
        })
      : res.json({
          message: "Measure_oz is not deleted successfully",
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
