import express from "express";

import {
  getStocks_pakage,
  getStock_pakage,
  createStock_pakage,
  updateStock_pakage,
  deleteStock_pakage,
  getStock_pakage_closed,
  getStock_pakageQuerySql2,
} from "../controladores/control_stock_pakage.js";

const router = express.Router();

//router.get("/stoks", getStock_pakageQuerySql2);
router.get("/stocks_pakage_closed/:variable/:iduser", getStock_pakage_closed);
router.get("/stocks_pakage", getStocks_pakage);
router.get("/stock_pakage", getStock_pakage);
router.post("/stock_pakage", createStock_pakage);
router.put("/stock_pakage", updateStock_pakage);
router.delete("/stock_pakage", deleteStock_pakage);

export default router;
