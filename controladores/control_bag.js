import { Bag } from '../db/models/bag.js';
import { Item } from '../db/models/item.js';
import {db} from '../db/conn.js';
import xlsxj from 'xlsx-to-json';
import fs from 'fs';

export const getBags = async (req, res) => {
  const data = await Bag.findAll();
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

export const getBag = async (req, res) => {
  let resultGetOne = await Bag.findAll({
    where: {
      id_bag: req.body.id,
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

export const createBag = async (req, res) => {
  const resultNew = await Bag.create({
    id_company_bag: req.body.idcompanybag,
    id_status_bag: req.body.idstatusbag,
    id_measure_bag: req.body.idmeasurebag,
    id_family_bag: req.body.idfamilybag,
    code_bag: req.body.codebag,
    code_two_bag: req.body.codetwobag,
    name_bag: req.body.namebag,
    name_complement_bag: req.body.namecomplementbag,
    stock_bag: req.body.stockbag,
    sku_short_bag: req.body.skushortbag,
    sku_large_bag: req.body.skulargebag,
    low_stock_bag: req.body.lowstockbag,
    qty_bag: req.body.qtybag,
    weight_bag: req.body.weightbag,
    weight_box_bag: req.body.weightboxbag,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateBag = async (req, res) => {
  try {
    const obj = req.body;
    const id_bag = req.body.id_bag;
    let resultUpdate = await Bag.update(obj, {
      where: {
        id_bag: id_bag,
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

export const deleteBag = async (req, res) => {
  try {
    const id_bag = req.body.id;
    let resultDelete = await Bag.destroy({
      where: {
        id_bag,
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
