import express from "express";

import {
  getLabel_inputs,
  getLabel_input,
  getLabel_inputQuerySql2,
  createLabel_input,
  updateLabel_input,
  deleteLabel_input,
} from "../controladores/control_label_input.js";

const router = express.Router();

// Model label_input
router.get("/label_inputs", getLabel_inputs);
router.get("/label_input", getLabel_input);
router.get("/label_input_query", getLabel_inputQuerySql2);
router.post("/label_input", createLabel_input);
router.put("/label_input", updateLabel_input);
router.delete("/label_input", deleteLabel_input);
// end model label_input

export default router;
