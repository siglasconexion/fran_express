import express from "express";

import {
  getRecipe_tools,
  getRecipe_tool,
  createRecipe_tool,
  updateRecipe_tool,
  deleteRecipe_tool,
  getRecipe_toolQuerySql2,
} from "../controladores/control_recipe_tool.js";

const router = express.Router();

//router.get("/recipe_tools", getRecipe_toolQuerySql2);
router.get("/recipe_tools", getRecipe_tools);
router.get("/recipe_tool/:variable", getRecipe_tool);
router.post("/recipe_tool", createRecipe_tool);
router.put("/recipe_tool", updateRecipe_tool);
router.delete("/recipe_tool", deleteRecipe_tool);

export default router;
