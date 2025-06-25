import { Ingredient } from "../db/models/ingredient.js";
///// eye with that import { Current_inventory_ingredient } from "../db/models/current_inventory_ingredient.js";
import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import _ from "lodash";

export const getIngredients = async (req, res) => {
  const data = await Ingredient.findAll();
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

export const getIngredient = async (req, res) => {
  let resultGetOne = await Ingredient.findAll({
    where: {
      id_ingredient: req.body.id,
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

export const createIngredient = async (req, res) => {
  const resultNew = await Ingredient.create({
    id_company_ingredient: req.body.idcompanyingredient,
    id_status_ingredient: req.body.idstatusingredient,
    id_measure_ingredient: req.body.idmeasureingredient,
    id_family_ingredient: req.body.idfamilyingredient,
    id_provider_ingredient: req.body.idprovideringredient,
    id_container_ingredient: req.body.idcontaineringredient,
    code_ingredient: req.body.codeingredient,
    name_ingredient: req.body.nameingredient,
    description_ingredient: req.body.descriptioningredient,
    inci_ingredient: req.body.inciingredient,
    stock_ingredient: req.body.stockingredient,
    sku_ingredient: req.body.skuingredient,
    low_stock_ingredient: req.body.lowstockingredient,
    shelf_life_years_ingredient: req.body.shelflifeyearsingredient,
    shelf_life_months_ingredient: req.body.shelflifemonthsingredient,
    shelf_life_desc_ingredient: req.body.shelflifedescingredient,
    observation_ingredient: req.body.observationingredient,
    weight_container_ingredient: req.body.weightcontaineringredient,
    gross_weight_ingredient: req.body.grossweightingredient,
    net_weight_ingredient: req.body.netweightingredient,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateIngredient = async (req, res) => {
  try {
    const obj = req.body;
    const id_ingredient = req.body.id_ingredient;
    let resultUpdate = await Ingredient.update(obj, {
      where: {
        id_ingredient: id_ingredient,
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

export const deleteIngredient = async (req, res) => {
  try {
    const id_ingredient = req.body.id;
    let resultDelete = await Ingredient.destroy({
      where: {
        id_ingredient,
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
