const { Measure_oz } = require("../db/models/measure_oz.js");
const db = require("../db/conn.js");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");

const getMeasure_ozs = async (req, res) => {
  const data = await Measure_oz.findAll();
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getMeasure_ozQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT * FROM measure_oz");
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getMeasure_oz = async (req, res) => {
  let resultGetOne = await Measure_oz.findAll({
    where: {
      id_measure_oz: req.body.id,
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

const createMeasure_oz = async (req, res) => {
  const resultNew = await Measure_oz.create({
    id_company_measure_oz: req.body.idcompanymeasureoz,
    id_status_measure_oz: req.body.idstatusmeasureoz,
    name_measure_oz: req.body.namemeasureoz,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateMeasure_oz = async (req, res) => {
  const obj = req.body;
  let resultUpdate = await Measure_oz.update(obj, {
    where: {
      id_measure_oz: req.body.id_measure_oz,
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

const deleteMeasure_oz = async (req, res) => {
  try {
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
  getMeasure_ozs,
  getMeasure_ozQuerySql2,
  getMeasure_oz,
  createMeasure_oz,
  updateMeasure_oz,
  deleteMeasure_oz,
  getDataExcel,
};
