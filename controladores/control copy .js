import { User } from "../db/models/User.js";
import db from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";

export var suma = (a, b) => a + b;

export const getUsers = async (req, res) => {
  // rutas - routes
  const data = await User.findAll(); // SELECT * FROM users
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

export const getUser = async (req, res) => {
  // rutas - routes
  let unoSolo = await User.findAll({
    where: {
      // id: req.query.idBody // 15
      id: 15,
    },
  });
  if (unoSolo.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  }
  res.json(unoSolo);
};

export const createUser = async (req, res) => {
  console.log("req.body", req.body);
  const createdUser = await User.create({
    name: req.body.name,
    last_name: req.body.last_name,
  });
  res.json({ message: createdUser });
};

export const updateUser = async (req, res) => {
  const obj = req.body;
  console.log(req.body.id);
  await User.update(obj, {
    where: {
      id: req.body.id, // 16
    },
  });
  res.json({ message: "User Update successfully" });
};

export const deleteUser = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.id;
    await User.destroy({
      where: {
        id,
      },
    });
    res.json({ message: "User deleted successfully" });
  } catch (e) {
    console.log(e.stack);
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
