import express from "express";

import {
  getRecipe_parts,
  getRecipe_part,
  createRecipe_part,
  updateRecipe_part,
  deleteRecipe_part,
  getRecipe_partQuerySql2,
} from "../controladores/control_recipe_part.js";

const router = express.Router();

//router.get("/recipe_parts", getRecipe_partQuerySql2);
router.get("/recipe_parts", getRecipe_parts);
router.get("/recipe_part/:variable", getRecipe_part);
router.post("/recipe_part", createRecipe_part);
router.put("/recipe_part", updateRecipe_part);
router.delete("/recipe_part", deleteRecipe_part);

export default router;
