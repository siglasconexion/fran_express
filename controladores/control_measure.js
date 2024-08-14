const { Measure } = require("../db/models/measure.js");
const db = require("../db/conn.js");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");

const getMeasures = async (req, res) => {
  const data = await Measure.findAll();
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getMeasureQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT * FROM measure");
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getMeasure = async (req, res) => {
  let resultGetOne = await Measure.findAll({
    where: {
      id_measure: req.body.id,
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

const createMeasure = async (req, res) => {
  const resultNew = await Measure.create({
    id_company_measure: req.body.idcompanymeasure,
    id_status_measure: req.body.idstatusmeasure,
    id_department_measure: req.body.iddepartmentmeasure,
    name_measure: req.body.namemeasure,
    mililitros: req.body.mililitros,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateMeasure = async (req, res) => {
  const obj = req.body;
  let resultUpdate = await Measure.update(obj, {
    where: {
      id_measure: req.body.id_measure,
    },
  });
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

const deleteMeasure = async (req, res) => {
  try {
    const id_measure = req.body.id;
    let resultDelete = await Measure.destroy({
      where: {
        id_measure,
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

const getDataExcel = async (req, res) => {
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

module.exports = {
  getMeasures,
  getMeasureQuerySql2,
  getMeasure,
  createMeasure,
  updateMeasure,
  deleteMeasure,
  getDataExcel,
};
