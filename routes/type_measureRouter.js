import express from "express";

import {
  getType_measures,
  getType_measure,
  createType_measure,
  updateType_measure,
  deleteType_measure,
  getType_measureQuerySql2,
} from "../controladores/control_type_measure.js";

const router = express.Router();

//router.get("/type_measures", getType_measureQuerySql2);
router.get("/type_measures", getType_measures);
router.get("/type_measure", getType_measure);
router.post("/type_measure", createType_measure);
router.put("/type_measure", updateType_measure);
router.delete("/type_measure", deleteType_measure);

export default router;
