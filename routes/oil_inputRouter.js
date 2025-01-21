import express from "express";
import {
  getOil_inputs,
  getOil_input,
  getOil_inputQuerySql2,
  createOil_input,
  updateOil_input,
  deleteOil_input,
} from "../controladores/control_oil_input.js";
const router = express.Router();

router.get("/oil_inputs", getOil_inputs);
router.get("/oil_input", getOil_input);
router.get("/oil_input_query", getOil_inputQuerySql2);
router.post("/oil_input", createOil_input);
router.put("/oil_input", updateOil_input);
router.delete("/oil_input", deleteOil_input);

export default router;
