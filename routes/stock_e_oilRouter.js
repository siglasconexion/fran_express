import express from "express";

import {
  getStocks_e_oil,
  getStock_e_oil,
  createStock_e_oil,
  updateStock_e_oil,
  deleteStock_e_oil,
  getStock_e_oil_closed,
  getStock_e_oilQuerySql2,
} from "../controladores/control_stock_e_oil.js";

const router = express.Router();

//router.get("/stoks", getStock_e_oilQuerySql2);
router.get("/stocks_e_oil_closed/:variable", getStock_e_oil_closed);
router.get("/stocks_e_oil", getStocks_e_oil);
router.get("/stock_e_oil", getStock_e_oil);
router.post("/stock_e_oil", createStock_e_oil);
router.put("/stock_e_oil", updateStock_e_oil);
router.delete("/stock_e_oil", deleteStock_e_oil);

export default router;
