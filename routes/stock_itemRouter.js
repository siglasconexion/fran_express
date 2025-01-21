import express from "express";
import {
  getStocks_item,
  getStock_item,
  createStock_item,
  updateStock_item,
  deleteStock_item,
  getStock_itemQuerySql2,
  getStock_item_closed,
} from "../controladores/control_stock_item.js";

const router = express.Router();

//router.get("/stoks", getStock_itemQuerySql2);
router.get("/stocks_item_closed/:variable/:iduser", getStock_item_closed);
router.get("/stocks_item", getStocks_item);
router.get("/stock_item", getStock_item);
router.post("/stock_item", createStock_item);
router.put("/stock_item", updateStock_item);
router.delete("/stock_item", deleteStock_item);

export default router;
