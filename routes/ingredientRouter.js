import express from "express";

import {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../controladores/control_ingredient.js";

const router = express.Router();

router.get("/ingredients", getIngredients);
router.get("/ingredient", getIngredient);
router.post("/ingredient", createIngredient);
router.put("/ingredient", updateIngredient);
router.delete("/ingredient", deleteIngredient);

export default router;
