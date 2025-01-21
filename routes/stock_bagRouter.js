import express from "express";

import {
  getStocks_bag,
  getStock_bag,
  createStock_bag,
  updateStock_bag,
  deleteStock_bag,
  getStock_bag_closed,
  getStock_bagQuerySql2,
} from "../controladores/control_stock_bag.js";

const router = express.Router();

//router.get("/stoks", getStock_bagQuerySql2);
router.get("/stocks_bag_closed/:variable/:iduser", getStock_bag_closed);
router.get("/stocks_bag", getStocks_bag);
router.get("/stock_bag", getStock_bag);
router.post("/stock_bag", createStock_bag);
router.put("/stock_bag", updateStock_bag);
router.delete("/stock_bag", deleteStock_bag);

export default router;
