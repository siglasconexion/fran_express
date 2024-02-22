const { Container } = require("../db/models/container.js");
const db = require("../db/conn.js");
const xlsxj = require("xlsx-to-json");
const fs = require("fs");

const getContainers = async (req, res) => {
  const data = await Container.findAll();
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getContainer = async (req, res) => {
  let resultGetOne = await Container.findAll({
    where: {
      id_container: req.body.id,
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

const createContainer = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Container.create({
    id_status_container: req.body.idstatuscontainer,
    id_company_container: req.body.idcompanycontainer,
    id_family_container: req.body.idfamilycontainer,
    id_measure_container: req.body.idmeasurecontainer,
    id_department_container: req.body.iddepartmentcontainer,
    name_container: req.body.namecontainer,
    size_container: req.body.sizecontainer,
    qty_container: req.body.qtycontainer,
    container_tare: req.body.containertare,
    container_tare_lbs: req.body.containertarelbs,
    is_helper_container: req.body.helpercontainer,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateContainer = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const obj = req.body;
    const id_container = req.body.id_container;
    let resultUpdate = await Container.update(obj, {
      where: {
        id_container: id_container,
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
    //console.log("aca solo el error", err);
  }
};

const deleteContainer = async (req, res) => {
  try {
    console.log(req.body);
    const id_container = req.body.id;
    let resultDelete = await Container.destroy({
      where: {
        id_container,
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

module.exports = {
  getContainers,
  getContainer,
  createContainer,
  updateContainer,
  deleteContainer,
};
