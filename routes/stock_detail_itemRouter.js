import express from "express";

import {
  getStock_details_item,
  getStock_detail_item,
  createStock_detail_item,
  updateStock_detail_item,
  deleteStock_detail_item,
  getStock_detail_itemQuerySql2,
} from "../controladores/control_stock_detail_item.js";

const router = express.Router();

router.get("/stock_details_item/:variable", getStock_detail_itemQuerySql2);
//router.get("/stock_details_item", getStock_details_item);
router.get("/stock_detail_item", getStock_detail_item);
router.post("/stock_detail_item", createStock_detail_item);
router.put("/stock_detail_item", updateStock_detail_item);
router.delete("/stock_detail_item", deleteStock_detail_item);

export default router;
