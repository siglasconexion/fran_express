const { Department } = require("../db/models/department.js");
const db = require("../db/conn.js");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");

const getDepartments = async (req, res) => {
  const data = await Department.findAll();
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getDepartmentQuerySql = async (req, res) => {
  const data = await db.sequelize.query("SELECT * FROM department");
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getDepartment = async (req, res) => {
  let resultGetOne = await Department.findAll({
    where: {
      id_department: req.body.id,
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

const createDepartment = async (req, res) => {
  const resultNew = await Department.create({
    id_company_department: req.body.idcompanydepartment,
    id_status_department: req.body.idstatusdepartment,
    department_name: req.body.departmentname,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateDepartment = async (req, res) => {
  const obj = req.body;
  let resultUpdate = await Department.update(obj, {
    where: {
      id_department: req.body.id_department,
    },
  });
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

const deleteDepartment = async (req, res) => {
  try {
    const id_department = req.body.id;
    let resultDelete = await Department.destroy({
      where: {
        id_department,
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
  getDepartments,
  getDepartmentQuerySql,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDataExcel,
};
