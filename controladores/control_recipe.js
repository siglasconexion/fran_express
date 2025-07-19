import { Recipe } from "../db/models/recipe.js";
import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import xlsxj from "xlsx-to-json";
import fs from "fs";
import _ from "lodash";

export const getRecipes = async (req, res) => {
  const data = await db.sequelize.query(
    `SELECT  * from recipe ORDER BY name_recipe`,
    { type: QueryTypes.SELECT }
  ); //
  if (data.length <= 0) {
    res.status(201).json({
      code: 201,
      message: "Results not founds",
      statusText: "nuevo mensaje",
      ok: "false",
    });
    return;
  }
  res.status(200).json(data);
};

export const getRecipe = async (req, res) => {
  let resultGetOne = await Recipe.findAll({
    where: {
      id_recipe: req.body.id,
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

export const createRecipe = async (req, res) => {
  const resultNew = await Recipe.create({
    id_company_recipe: req.body.idcompanyrecipe,
    id_status_recipe: req.body.idstatusrecipe,
    id_family_recipe: req.body.idfamilyrecipe,
    id_container_recipe: req.body.idcontainerrecipe,
    name_recipe: req.body.namerecipe,
    code_recipe: req.body.coderecipe,
    sku_recipe: req.body.skurecipe,
    weight_container_full_recipe: req.body.weightcontainerfullrecipe,
    time_take_make_recipe: req.body.timetakemakerecipe,
    time_life_item_recipe: req.body.timelifeitemrecipe,
    made_laboratory_recipe: req.body.madelaboratoryrecipe,
    observation_recipe: req.body.observationrecipe,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateRecipe = async (req, res) => {
  try {
    const obj = req.body;
    const id_recipe = req.body.id_recipe;
    let resultUpdate = await Recipe.update(obj, {
      where: {
        id_recipe: id_recipe,
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

export const deleteRecipe = async (req, res) => {
  try {
    const id_recipe = req.body.id;
    let resultDelete = await Recipe.destroy({
      where: {
        id_recipe,
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
