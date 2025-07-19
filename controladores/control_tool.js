import { Tool } from "../db/models/tool.js";
import { db } from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";
import { QueryTypes } from "sequelize";

export const getTools = async (req, res) => {
  const data = await db.sequelize.query(
    "SELECT * FROM tool ORDER BY tool_name",
    { type: QueryTypes.SELECT }
  );
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getToolQuerySql = async (req, res) => {
  const data = await db.sequelize.query("SELECT * FROM tool");
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getTool = async (req, res) => {
  let resultGetOne = await Tool.findAll({
    where: {
      id_tool: req.body.id,
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

export const createTool = async (req, res) => {
  const resultNew = await Tool.create({
    id_company_tool: req.body.idcompanytool,
    id_status_tool: req.body.idstatustool,
    tool_name: req.body.toolname,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateTool = async (req, res) => {
  const obj = req.body;
  let resultUpdate = await Tool.update(obj, {
    where: {
      id_tool: req.body.id_tool,
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

export const deleteTool = async (req, res) => {
  try {
    const id_tool = req.body.id;
    let resultDelete = await Tool.destroy({
      where: {
        id_tool,
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
