import { Recipe_tool } from "../db/models/recipe_tool.js";
import { db } from "../db/conn.js";
import _ from "lodash";
import { QueryTypes } from "sequelize";

//// ojo quitar de aca las funciones que no se usa y revisar otros archivos para hacer lo mismo

export const getRecipe_tools = async (req, res) => {
  const data = await Recipe_tool.findAll();
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

export const getRecipe_toolQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query(
    `SELECT  id_recipe_part, id_status_recipe_part, id_recipe_recipe_part, id_type_inventory_recipe_part, id_measure_recipe_part, id_part_recipe_part, quantity_recipe_part, name_measure FROM recipe_part INNER JOIN measure ON recipe_part.id_measure_recipe_part=measure.id_measure where id_recipe_recipe_part = ${variablefinal}`,
    { type: QueryTypes.SELECT }
  ); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getRecipe_tool = async (req, res) => {
  let variable = req.params.variable;
  console.log("req.body.idrecipe", req.params);
  const resultGetOne = await db.sequelize.query(
    `SELECT  id_recipe_tool, id_recipe_recipe_tool, id_tool_recipe_tool, quantity_recipe_tool, tool_name FROM recipe_tool INNER JOIN tool ON recipe_tool.id_tool_recipe_tool=tool.id_tool where id_recipe_recipe_tool = ${variable} `,
    { type: QueryTypes.SELECT }
  ); //
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
      // dato: "encontrado",
    });
    return;
  }
  res.json(resultGetOne);
};

export const createRecipe_tool = async (req, res) => {
  // ojo colocar akika try cath
  const previosResult = await Recipe_tool.findOne({
    where: {
      id_recipe_recipe_tool: req.body.idreciperecipetool,
      id_tool_recipe_tool: req.body.idtoolrecipetool,
    },
  });
  console.log("previosResult", previosResult);
  let convertPreviosResult = previosResult?.toJSON();
  console.log("primera consulta", convertPreviosResult);
  //    if (_.isEmpty(convertPreviosResult)) {
  if (_.isEmpty(convertPreviosResult)) {
    const resultNew = await Recipe_tool.create({
      id_recipe_recipe_tool: req.body.idreciperecipetool,
      id_tool_recipe_tool: req.body.idtoolrecipetool,
      quantity_recipe_tool: req.body.quantityrecipetool,
    });
    let longitud = Object.entries(resultNew).length;
    console.log("resultNew", resultNew);
    Object.entries(resultNew).length === 0
      ? res.json({ message: "Register is not created" })
      : res.json({
          message: "Record created successfully",
          data: resultNew,
          longitud: longitud,
        });
    return;
  } else {
    res.json({
      message: "duplicate record, check",
      data: "",
      longitud: "",
    });
    //return;
  }
};

export const updateRecipe_tool = async (req, res) => {
  try {
    const obj = req.body;
    const id = req.body.id;
    let resultUpdate = await Recipe_tool.update(obj, {
      where: {
        id: id,
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

export const deleteRecipe_tool = async (req, res) => {
  try {
    const id_recipe_tool = req.body.idrecipe;
    let resultDelete = await Recipe_tool.destroy({
      where: {
        id_recipe_tool,
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
