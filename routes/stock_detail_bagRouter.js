import express from "express";

import {
  getStock_details_bag,
  getStock_detail_bag,
  createStock_detail_bag,
  updateStock_detail_bag,
  deleteStock_detail_bag,
  getStock_detail_bagQuerySql2,
} from "../controladores/control_stock_detail_bag.js";

const router = express.Router();

router.get("/stock_details_bag/:variable", getStock_detail_bagQuerySql2);
//router.get("/stock_details_bag", getStock_details_bag);
router.get("/stock_detail_bag/:variable", getStock_detail_bag);
router.post("/stock_detail_bag", createStock_detail_bag);
router.put("/stock_detail_bag", updateStock_detail_bag);
router.delete("/stock_detail_bag", deleteStock_detail_bag);

export default router;
