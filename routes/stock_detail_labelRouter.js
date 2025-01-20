import express from "express";

import {
  getStock_details_label,
  getStock_detail_label,
  createStock_detail_label,
  updateStock_detail_label,
  deleteStock_detail_label,
  getStock_detail_labelQuerySql2,
} from "../controladores/control_stock_detail_label.js";

const router = express.Router();

router.get("/stock_details_label/:variable", getStock_detail_labelQuerySql2);
//router.get("/stock_details_label", getStock_details_label);
router.get("/stock_detail_label/:variable", getStock_detail_label);
router.post("/stock_detail_label", createStock_detail_label);
router.put("/stock_detail_label", updateStock_detail_label);
router.delete("/stock_detail_label", deleteStock_detail_label);

export default router;
