import express from "express";

import {
  getBag_inputs,
  getBag_input,
  getBag_inputQuerySql2,
  createBag_input,
  updateBag_input,
  deleteBag_input,
} from "../controladores/control_bag_input.js";

const router = express.Router();

router.get("/bag_inputs", getBag_inputs);
router.get("/bag_input", getBag_input);
router.get("/bag_input_query", getBag_inputQuerySql2);
router.post("/bag_input", createBag_input);
router.put("/bag_input", updateBag_input);
router.delete("/bag_input", deleteBag_input);

export default router;
