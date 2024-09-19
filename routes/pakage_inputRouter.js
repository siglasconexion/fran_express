import express from "express";

import {
  getPakage_inputs,
  getPakage_input,
  getPakage_inputQuerySql2,
  createPakage_input,
  updatePakage_input,
  deletePakage_input,
} from "../controladores/control_pakage_input.js";

const router = express.Router();

router.get("/pakage_inputs", getPakage_inputs);
router.get("/pakage_input", getPakage_input);
router.get("/pakage_input_query", getPakage_inputQuerySql2);
router.post("/pakage_input", createPakage_input);
router.put("/pakage_input", updatePakage_input);
router.delete("/pakage_input", deletePakage_input);

export default router;
