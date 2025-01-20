import express from "express";

import {
  getStocks_label,
  getStock_label,
  createStock_label,
  updateStock_label,
  deleteStock_label,
  getStock_label_closed,
  getStock_labelQuerySql2,
} from "../controladores/control_stock_label.js";

const router = express.Router();

//router.get("/stoks", getStock_labelQuerySql2);
router.get("/stocks_label_closed/:variable/:iduser", getStock_label_closed);
router.get("/stocks_label", getStocks_label);
router.get("/stock_label", getStock_label);
router.post("/stock_label", createStock_label);
router.put("/stock_label", updateStock_label);
router.delete("/stock_label", deleteStock_label);
export default router;
