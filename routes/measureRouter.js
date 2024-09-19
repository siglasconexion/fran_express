import express from "express";
import {
  getMeasures,
  createMeasure,
  updateMeasure,
  deleteMeasure,
  getMeasureQuerySql2,
} from "../controladores/control_measure.js";

const router = express.Router();

///router.get("/measure_ozs", getMeasure_ozQuerySql2);
//;
router.get("/measures", getMeasures);
router.post("/measure", createMeasure);
router.put("/measure", updateMeasure);
router.delete("/measure", deleteMeasure);

export default router;
