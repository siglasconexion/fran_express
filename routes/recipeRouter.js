import express from "express";
import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controladores/control_recipe.js";

const router = express.Router();
router.get("/recipes", getRecipes);
router.get("/recipe", getRecipe);
router.post("/recipe", createRecipe);
router.put("/recipe", updateRecipe);
router.delete("/recipe", deleteRecipe);
export default router;
